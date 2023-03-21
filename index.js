const { Client, GatewayIntentBits } = require("discord.js");

const axios = require("axios");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const getAgents = async () => {
  const url = "https://valorant-api.com/v1/agents";
  try {
    const data = axios.get(url).then(async (data) => await data.data.data);
    return data;
  } catch (err) {
    console.error(err, "agent err");
  }
};

client.on("messageCreate", async (msg) => {
  if (msg.content === "ping") {
    msg.reply("pong");
  }

  if (msg.content === "agents") {
    const agents = await getAgents();
    await msg.reply(`${agents.map((agent) => agent.displayName).join(", ")}`);
  }
});

client.on("ready", async () => {
  console.log("Bot is online!");
});

client.login(process.env.BOT_TOKEN);
