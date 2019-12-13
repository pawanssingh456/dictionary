const SynonymAndAntonymService = require('../services/synonym-and-antonym');

exports.antonym = async word => {
  try {
    const antonym = await SynonymAndAntonymService.getSynonymAndAntonym(word);

    if (antonym.data.length > 1) {
      const words = antonym.data[0].words;
      console.info('Antonyms:-');
      for (const word of words) {
        console.info(word);
      }
      console.info('\n');
    } else {
      console.info('No antonym found', '\n');
    }
  } catch (error) {
    console.info(error.response.data.error);
  }
};
