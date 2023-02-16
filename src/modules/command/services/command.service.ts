import { CommandController } from '../controllers/command.controller';
import { client } from '../../../app';

export const commandController = new CommandController(client)

export const registerCommands = async () => {
    await commandController.registerCommands()
}