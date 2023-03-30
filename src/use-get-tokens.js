export const useGetTokens = async () => {
  const DISCORD_TOKEN = process.env["DISCORD_TOKEN"];
  const RIOT_KEY = process.env["RIOT_KEY"];

  return { DISCORD_TOKEN, RIOT_KEY };
};
