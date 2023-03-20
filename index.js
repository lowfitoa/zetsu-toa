const { Client, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.on("ready", () => {
  console.log("Bot is online!");
});

client.login(process.env.BOT_TOKEN);
