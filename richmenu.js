require('dotenv').config();
const fs = require('fs');
const line = require('@line/bot-sdk');

const client = new line.Client({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const uploadMenus = async () => {
  const results = {};
  for (const [key, menu] of Object.entries(richMenus)) {
    const richMenuId = await client.createRichMenu(menu);
    const imagePath = `richmenu-image/${key}.png`; 
    const stream = fs.createReadStream(imagePath);
    await client.setRichMenuImage(richMenuId, stream, 'image/png');
    results[key] = richMenuId;
    console.log(`${key} menu created:`, richMenuId);
  }

  fs.writeFileSync('richmenu-ids.json', JSON.stringify(results, null, 2));
  
  await client.setDefaultRichMenu(results.main);
  console.log("Main menu set as default.");
};

uploadMenus().catch(console.error);