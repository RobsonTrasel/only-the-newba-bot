import { Discord } from "./config/discord";
import { config } from "dotenv";

config()

const token = process.env.DISCORD_TOKEN

if(!token) {
    console.error('[BOT] Error on token for bot')
    process.exit(1)
}

const discord = Discord.getInstance(token)
const client = discord.getClient()