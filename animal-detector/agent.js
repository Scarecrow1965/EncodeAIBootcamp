import axios from 'axios';
// const axios = require('axios');

async function fetchAnimalInfo(animalName) {
  if (animalName === 'unknown') {
    return {
      title: 'Unknown Animal',
      description: 'No additional information available.',
      dangerous: false ,
      relatedAnimals: [],
  };
}

  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        titles: animalName,
        prop: 'extracts|links',
        exintro: true,
        explaintext: true,
        pllimit: 10, // Limit to 10 releated links
      },
    });

    const pages = response.data.query.pages;
    const page = Object.values(pages)[0];

    if (page && page.extract) {
      const description = page.extract.toLowerCase();
      const isDangerous = /dangerous|venomous|aggressive|deadly|carnivore/.test(description);

      // Extract related animals from links
      const relatedAnimals = page.links
        ? page.links.map(link => link.title).slice(0, 10)
        : [];
      
      return {
        title: page.title,
        description: page.extract,
        dangerous: isDangerous,
        relatedAnimals,
      };
    } else {
      return {
        title: animalName,
        description: 'No information found.',
        dangerous: false,
      relatedAnimals: [],
      };
    }
  } catch (error) {
    console.error('Error fetching Wikipedia info:', error);
    throw error;
  }
}

module.exports = fetchAnimalInfo;
