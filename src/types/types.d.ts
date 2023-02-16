import { Client } from 'discord.js';
import { ICommand } from '../modules/command/models/command.model';

declare module 'discord.js' {
    interface Client {
        commands: Map<string, ICommand>
    }
}