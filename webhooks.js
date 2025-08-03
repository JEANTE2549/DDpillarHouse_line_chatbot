const fs = require('fs');
const path = require('path');
const line = require('@line/bot-sdk');
const { createClient } = require('@supabase/supabase-js');

const richMenuIds = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'richmenu-ids.json'))
);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = (config) => {
  const client = new line.Client(config);}