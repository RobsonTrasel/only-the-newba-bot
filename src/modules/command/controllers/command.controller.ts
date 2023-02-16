
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { ICommand } from '../models/command.model';
import { Client, Message } from 'discord.js';

export class CommandController {
    private _client: Client

    constructor(client: Client) {
        this._client = client
    }

    async registerCommands(): Promise<void> {
        const modulesDir = resolve(__dirname, '../../')
        const moduleFolders = readdirSync(modulesDir, {withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)
        
        for(const moduleFolder of moduleFolders) {
            try {
                const { default: module } = await import(`../${moduleFolder}`)
                if (module.commands) {
                    for (const command of module.commands) {
                      this._client.commands.set(command.name, command);
                      console.log(`Registered command ${command.name} from module ${moduleFolder}`);
                    }
                }
            } catch(err) {
                console.error(`Failed to register commands from module ${moduleFolder}: ${err}`)
            }
        }
    }

    async handleCommand(message: Message): Promise<void> {
        const prefix = '!'
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName || !this._client.commands.has(commandName)) {
            return;
        }

        const command = this._client.commands.get(commandName);

        try {
            await command?.execute(args, message);
        } catch (err) {
            console.error(`Error executing command ${commandName}: ${err}`);
            await message.reply('An error occurred while executing the command.');
        }
    }
}