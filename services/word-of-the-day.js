require('dotenv').config();

const axios = require('axios');

const host = process.env.HOST_API;
const key = process.env.API_KEY;

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
};

exports.getWordOfTheDay = async () => {
  const url = `${host}/words/randomWord`;

  const wordOfTheDay = await axios.request({
    method: 'GET',
    url: url,
    headers: headers,
    params: {
      api_key: key
    }
  });

  return wordOfTheDay;
};
