require('dotenv').config();

const axios = require('axios');

const host = process.env.HOST_API || 'https://fourtytwowords.herokuapp.com';
const key =
  process.env.API_KEY ||
  'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164';

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
};

exports.getDefinition = async word => {
  const url = `${host}/word/${word}/definitions`;

  const definition = await axios.request({
    method: 'GET',
    url: url,
    headers: headers,
    params: {
      api_key: key
    }
  });

  return definition;
};
