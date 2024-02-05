import { Message } from "discord.js";

export const rollDice = (msg: Message<boolean>) => {
  if (!msg.content.slice(3).startsWith("dice")) {
    return;
  }

  if (msg.content.slice(8).length === 0) {
    msg
      .reply(getRandom({ min: 1, max: 6 }))
      .catch(console.error)
      .finally(() => {
        console.log("done!");
      });
    return;
  }

  console.log(msg.content.slice(8));
  const options = msg.content.slice(8).split(" ");
  const min = parseInt(options[0]);
  const max = parseInt(options[1]);

  if (isNaN(min) || isNaN(max)) {
    msg.reply("Please enter a valid number");
    return;
  } else if (min > max) {
    msg.reply("Min cannot be greater than max");
    return;
  }

  msg
    .reply("Rolling dice...")
    .then((msg) => {
      setTimeout(() => {
        msg.edit(getRandom({ min, max }));
      }, 1000);
    })
    .catch(console.error)
    .finally(() => {
      console.log("done!");
    });
};

interface getRandomProps {
  min?: number;
  max?: number;
}

const getRandom = ({ min = 0, max = 6 }: getRandomProps) => {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
