import { Token } from "./dotenv-config";

import { Client, Events, GatewayIntentBits } from "discord.js";
import { registerCommands } from "./commands";
import { repoBriefDescription } from "./github";

const client = new Client({
    intents:
        [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
        ]
});

client.login(Token);

client.once(Events.ClientReady, async readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    await registerCommands();
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.commandName;
    if (command == 'echo') {
        const message = interaction.options.getString('message');
        if (message) {
            await interaction.reply(message);
        } else {
            await interaction.reply('No message provided');
        }
    }

    if (command == 'briefrepo') {
        const repoAddr = interaction.options.getString('repoaddr');

        if (repoAddr) {
            const repo_info = repoAddr.split('/');
            const brief_info = await repoBriefDescription(repo_info[0], repo_info[1]);
            await interaction.reply(brief_info["repo_name"]);
        } else {
            await interaction.reply('No repo address provided');
        }
    }
});
