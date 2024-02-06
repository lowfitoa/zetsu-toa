import { Message } from "discord.js";
const TIMEOUT_DURATION = 1000;
export const rollDice = (msg: Message<boolean>) => {
  if (!msg.content.slice(3).startsWith("dice")) {
    return;
  }

  if (msg.content.slice(8).length === 0) {
    msg
      .reply("Rolling dice...")
      .then((_msg) => {
        setTimeout(() => {
          msg.channel.send(getRandom({ min: 1, max: 6 }));
          _msg.delete();
        }, TIMEOUT_DURATION);
      })
      .catch(console.error);

    return;
  }

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
    .then((_msg) => {
      setTimeout(() => {
        msg.channel.send(getRandom({ min, max }));
        _msg.delete();
      }, TIMEOUT_DURATION);
    })
    .catch(console.error);
};

interface getRandomProps {
  min?: number;
  max?: number;
}

const getRandom = ({ min = 0, max = 6 }: getRandomProps) => {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
};
