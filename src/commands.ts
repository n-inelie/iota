import { Token, Client_ID, Guild_ID } from "./dotenv-config";

import { ApplicationCommandOptionType, REST, Routes } from "discord.js";

const commands = [
    {
        name: 'echo',
        description: 'Echoes the text following the echo command',
        options: [{
            name: 'message',
            description: 'The message which is to be echoed',
            type: ApplicationCommandOptionType.String,
            required: true,
        }],
    },
    {
        name: 'briefrepo',
        description: 'Gets a brief description of the given github repo',
        options: [{
            name: 'repoaddr',
            description: 'format: {owner}/{repo}',
            type: ApplicationCommandOptionType.String,
            required: true,
        }],
    }
];

if (!Token) {
    process.exit(1);
}

const rest = new REST().setToken(Token);
const registerCommands = async () => {
    try {
        if (!Client_ID || !Guild_ID) {
            process.exit(1);
        }
        await rest.put(
            Routes.applicationGuildCommands(Client_ID, Guild_ID),
            { body: commands }
        );
        console.log("Slash commands were registered successfully");
    } catch (error) {
        console.error(`(ERROR): ${error}`);
        process.exit(1);
    }
};

export { registerCommands };
