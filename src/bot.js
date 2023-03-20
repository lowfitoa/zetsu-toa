const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", () => {
  console.log(`${client.user.tag}에 로그인하였습니다!`);
});
client.on("message", (msg) => {
  if (msg.content === "핑") {
    msg.reply("퐁!");
  }
});
client.login("토큰");
