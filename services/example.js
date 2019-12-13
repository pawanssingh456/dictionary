require('dotenv').config();

const axios = require('axios');

const host = process.env.HOST_API;
const key = process.env.API_KEY;

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
};

exports.getExamples = async word => {
  const url = `${host}/word/${word}/examples`;

  const examples = await axios.request({
    method: 'GET',
    url: url,
    headers: headers,
    params: {
      api_key: key
    }
  });

  return examples;
};
