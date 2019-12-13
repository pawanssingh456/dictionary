const SynonymAndAntonymService = require('../services/synonym-and-antonym');

exports.synonym = async word => {
  try {
    const synonym = await SynonymAndAntonymService.getSynonymAndAntonym(word);
    let words;
    if (synonym.data.length > 1) {
      words = synonym.data[1].words;
    } else {
      words = synonym.data[0].words;
    }

    console.info('Synonyms:-');
    for (const word of words) {
      console.info(word);
    }
    console.info('\n');
  } catch (error) {
    console.info(error.response.data.error);
  }
};
