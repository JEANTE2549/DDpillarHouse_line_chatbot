require('dotenv').config();
const express = require('express');
const { middleware } = require('@line/bot-sdk');
const webhookHandler = require('./webhook');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

app.post('/webhook', middleware(config), webhookHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LINE bot is running on port ${PORT}`);
});
