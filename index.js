require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const webhookHandler = require('./webhook');
const app = express();
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

app.use('/api', cors({
  origin: '*'
}));
app.use('/api', express.json());
app.post('/webhook', line.middleware(config), webhookHandler(config));

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const richMenuIds = require('./richmenu-ids.json');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`LINE bot is running on port ${port}`);
});