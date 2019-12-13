const DefinitionService = require('../services/definition');

exports.definition = async word => {
  try {
    const definitions = await DefinitionService.getDefinition(word);
    console.info('Definitions:-');
    for (const definition of definitions.data) {
      console.info(definition.text, '\n');
    }
  } catch (error) {
    console.info(error.response.data.error);
    process.exit();
  }
};
