import { Client, GatewayIntentBits } from "discord.js";

import { rollDice } from "./funcs/rollDice";

const DISCORD_TOKEN = process.env["DISCORD_TOKEN"];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith("zs") || msg.author.bot) {
    return;
  }
  const content = msg.content.slice(3);
  console.log(content);
  console.log(msg.author.username);
  console.log(new Date());
  // TODO toa add json parse

  if (content === "help") {
    // TODO add more commands
    msg.reply(`"zs ping" => reply pong`);
  }

  if (content === "ping") {
    msg.reply("pong");
  }

  rollDice(msg);
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.login(DISCORD_TOKEN);
