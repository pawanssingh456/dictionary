const ExampleService = require('../services/example');

exports.examples = async word => {
  try {
    const examples = await ExampleService.getExamples(word);
    console.info('Examples:-');
    for (const example of examples.data.examples) {
      console.info(example.text, '\n');
    }
  } catch (error) {
    console.info(error.response.data.error);
  }
};
