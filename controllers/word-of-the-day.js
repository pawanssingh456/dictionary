const WordOfTheDayService = require('../services/word-of-the-day');

exports.wordOfTheDay = async () => {
  try {
    const wordOfTheDay = await WordOfTheDayService.getWordOfTheDay();

    return wordOfTheDay.data.word;
  } catch (error) {
    console.info('Error getting word of the day. Try again later.');
    process.exit();
  }
};
