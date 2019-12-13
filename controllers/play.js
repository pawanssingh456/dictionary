const inquirer = require('inquirer');

const ExampleController = require('./example');
const DefinitionService = require('../services/definition');
const SynonymAndAntonymService = require('../services/synonym-and-antonym');
const RandomUtil = require('../utils/random');
const ShuffleUtil = require('../utils/shuffle');

let definitions,
  synonyms = [],
  antonyms = [];

exports.game = async word => {
  try {
    const allDefinitions = await DefinitionService.getDefinition(word);
    const synonymsAndAntonyms = await SynonymAndAntonymService.getSynonymAndAntonym(
      word
    );

    definitions = allDefinitions.data;

    if (synonymsAndAntonyms.data.length > 1) {
      antonyms = synonymsAndAntonyms.data[0].words;
      synonyms = synonymsAndAntonyms.data[1].words;
    } else {
      synonyms = synonymsAndAntonyms.data[0].words;
    }
    index = Math.max(definitions.length, synonyms.length, antonyms.length);

    showDefintion();
    showSynonym();
    showAntonym();

    await getAnswer(word, synonyms);
    process.exit();
  } catch (error) {
    console.info(error.response.data.error);
  }
};

function showDefintion() {
  const random = RandomUtil.random(definitions.length);
  if (definitions.length && random <= definitions.length) {
    console.info('Definition:- ', definitions[random].text);
  }
}

function showSynonym() {
  const random = RandomUtil.random(synonyms.length);
  if (synonyms.length && random <= synonyms.length) {
    console.info('Synonym:- ', synonyms[random]);
  }
}

function showAntonym() {
  const random = RandomUtil.random(antonyms.length);
  if (antonyms.length && random <= antonyms.length) {
    console.info('Antonym:- ', antonyms[random]);
  }
}

async function getAnswer(word, synonyms) {
  const questions = [
    {
      type: 'input',
      name: 'word',
      message: 'Guess the word :-'
    }
  ];

  await inquirer.prompt(questions).then(async answers => {
    if (answers.word === word || synonyms.includes(answers.word)) {
      console.info('Correct Answer');
    } else {
      await showOptions(word, synonyms);
    }
  });
}

async function fullDictionary(word) {
  console.info('Definitions:-');
  for (const definition of definitions) {
    console.info(definition.text, '\n');
  }
  console.info('Synonyms:-');
  for (const word of synonyms) {
    console.info(word);
  }
  console.info('\n', 'Antonyms:-');
  for (const word of antonyms) {
    console.info(word);
  }
  console.info('\n');
  await ExampleController.examples(word);
}

async function showOptions(word, synonyms) {
  const questions = [
    {
      type: 'rawlist',
      name: 'options',
      message: 'Wrong Answer! Choose 1,2 or 3.',
      choices: ['Try Again', 'Hint', 'Quit']
    }
  ];

  await inquirer.prompt(questions).then(async answers => {
    if (answers.options == 'Try Again') {
      await getAnswer(word, synonyms);
    } else if (answers.options == 'Hint') {
      const random = RandomUtil.random(4);
      if (random == 0) {
        const shuffledWord = ShuffleUtil.shuffle(word);
        console.info('Jumbled Word:- ', shuffledWord);
      } else if (random == 1) {
        showDefintion();
      } else if (random == 2) {
        showAntonym();
      } else if (random == 3) {
        showSynonym();
      }
      await getAnswer(word, synonyms);
    } else if (answers.options == 'Quit') {
      await fullDictionary(word);
    }
  });
}
