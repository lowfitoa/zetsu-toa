import { Client, GatewayIntentBits } from "discord.js";

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

  if (content === "help") {
    msg.reply(`"zs ping" => reply pong`);
  }

  if (content === "ping") {
    msg.reply("pong");
  }
});

client.on("ready", async () => {
  console.log("Bot is online!");
});

client.login(DISCORD_TOKEN);
