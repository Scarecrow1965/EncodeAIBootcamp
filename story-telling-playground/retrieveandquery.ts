// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  IndexDict,
  OpenAI,
  RetrieverQueryEngine,
  TextNode,
  VectorStoreIndex,
  serviceContextFromDefaults,
} from "llamaindex";
import type { NextApiRequest, NextApiResponse } from "next";

type Input = {
  query: string;
  topK?: number;
  nodesWithEmbedding: {
    text: string;
    embedding: number[];
  }[];
  temperature: number;
  topP: number;
};

type Output = {
  error?: string;
  payload?: {
    response: string;
  };
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500mb', // Adjust the size limit as needed
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Output>,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { query, topK, nodesWithEmbedding, temperature, topP }: Input = req.body;
    console.log("Received request body:", req.body);

    const embeddingResults = nodesWithEmbedding.map((config) => {
      return new TextNode({ text: config.text, embedding: config.embedding });
    });
    console.log("Embedding results:", embeddingResults);

    const indexDict = new IndexDict();
    for (const node of embeddingResults) {
      indexDict.addNode(node);
    }
    console.log("Index dictionary:", indexDict);

    const serviceContext = serviceContextFromDefaults({
      llm: new OpenAI({
        model: "gpt-4",
        temperature: temperature,
        topP: topP,
      }),
    });

    const index = await VectorStoreIndex.init({
      indexStruct: indexDict,
      serviceContext,
    });

    console.log("Index initialized:", index);

    await index.vectorStore.add(embeddingResults);
    if (!index.vectorStore.storesText) {
      await index.docStore.addDocuments(embeddingResults, true);
    }
    await index.indexStore?.addIndexStruct(indexDict);
    index.indexStruct = indexDict;
    console.log("Index populated with embeddings");

    const retriever = index.asRetriever();
    retriever.similarityTopK = topK ?? 2;

    const queryEngine = new RetrieverQueryEngine(retriever);
    
    const result = await queryEngine.query(query);
    console.log("Query result:", result);

    res.status(200).json({ payload: { response: result.response } });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).json({ error: "Invalid request body" });
  }
}
