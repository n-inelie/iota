import { Token } from "./dotenv-config";

import { Client, Events, GatewayIntentBits } from "discord.js";
import { registerCommands } from "./commands";

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

client.on(Events.InteractionCreate, interaction => {
    if(!interaction.isChatInputCommand()) return;   

    const command = interaction.commandName;
    if(command == 'echo') {
        interaction.reply("echo triggered");
    }
});
