const { Client } = require('@line/bot-sdk');

const client = new Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

module.exports = async function (req, res) {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error('Error handling events:', err);
      res.status(500).end();
    });
};

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const userMessage = event.message.text;

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `You said: ${userMessage}`,
  });
}
