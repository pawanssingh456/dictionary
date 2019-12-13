#!/usr/bin/env node
const program = require('commander');

const definitions = require('./controllers/definition').definition;
const synonyms = require('./controllers/synonym').synonym;
const antonyms = require('./controllers/antonym').antonym;
const examples = require('./controllers/example').examples;
const wordOfTheDay = require('./controllers/word-of-the-day').wordOfTheDay;
const playGame = require('./controllers/play').game;

program.version('1.0.0', '-v, --version', 'Command Line Dictionary Tool');

function definition(word) {
  return definitions(word);
}

function synonym(word) {
  return synonyms(word);
}

function antonym(word) {
  return antonyms(word);
}

function example(word) {
  return examples(word);
}

async function fullDict(word) {
  await definition(word);
  await synonym(word);
  await antonym(word);
  await example(word);
}

async function todaysWord() {
  const word = await wordOfTheDay();
  console.info('Word Of The Day:-');
  console.info(word, '\n');
  fullDict(word);
}

async function play() {
  const word = await wordOfTheDay();
  await playGame(word);
}

program.option('d, defn <word>', 'Get definitions of a word', definition);
program.option('s, syn <word>', 'Get synonyms of a word', synonym);
program.option('a, ant <word>', 'Get antonyms of a word', antonym);
program.option('e, ex <word>', 'Get examples of a word', example);
program.option('p, play', 'Play the game', play);

program.parse(process.argv);

if (process.argv.length == 2) {
  todaysWord();
} else if (process.argv.length == 3 && process.argv[2] != 'play') {
  const word = program.args[0];
  fullDict(word);
}
