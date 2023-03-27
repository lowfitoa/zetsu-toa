const { Client, GatewayIntentBits } = require("discord.js");
// const Valorant = require("valorant.js");

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
  if (!msg.content.startsWith("zs") || msg.author.bot) {
    return;
  }
  const content = msg.content.slice(3);

  if (content === "help") {
    msg.reply(`"zs ping" => reply pong\n"zs agents" => get all agents from valorant`);
  }

  if (content === "ping") {
    msg.reply("pong");
  }

  if (content === "agents") {
    const agents = await getAgents();
    await msg.reply(`${agents.map((agent) => agent.displayName).join(", ")}`);
  }

  // if (content === "toa") {
  //   (async () => {
  //     try {
  //       const client = await new Valorant.RiotApiClient({
  //         username: process.env.TOA_ID,
  //         password: process.env.TOA_PASSWORD,
  //         region: Valorant.Region.KR,
  //         debug: true,
  //       });

  //       const data = await client.login();
  //       console.log(data);

  //       // const balance = await client.storeApi.getStoreOffers(client.user.Subject);
  //       // console.log(balance);
  //     } catch (err) {
  //       console.error(err);
  //       // console.log("errr");
  //     }
  //   })();
  // }
});

client.on("ready", async () => {
  console.log("Bot is online!");
});

client.login(process.env.BOT_TOKEN);
