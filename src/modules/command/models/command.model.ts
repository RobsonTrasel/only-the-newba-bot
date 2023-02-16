import { Message } from "discord.js"

export interface ICommand {
    name: string
    description: string
    execute: (args: string[], message: Message) => Promise<void>
}