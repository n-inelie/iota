require("dotenv").config();
const Token = process.env.DISCORD_TOKEN;
const Client_ID = process.env.CLIENT_ID;
const Guild_ID = process.env.GUILD_ID;
const Github_Token = process.env.GITHUB_TOKEN;

if (!Token || !Client_ID || !Guild_ID || !Github_Token) {
    console.error("Failed to get env variables");
    process.exit(1);
}

export { Token, Client_ID, Guild_ID, Github_Token };
