import { Client, GatewayIntentBits } from 'discord.js';
import { Logger } from "../shared/infra/logger/logger";

const logger = Logger.getInstance()

export class Discord {
    private readonly _client: Client
    private static _instance: Discord

    constructor(token: string) {
        this._client = new Client({
            intents: [
                GatewayIntentBits.Guilds
            ]
        })
        this._client.on('ready', () => {
            logger.info('Bot is ready!');
        });
      
        this._client.on('messageCreate', (message) => {
            if (message.author.bot) return;
            logger.info(`Received message: ${message.content}`);
        });
      
        this._client.login(token).then(() => {
            logger.info('Logged in!');
        });
    }

    getClient(): Client {
        return this._client;
    }

    static getInstance(token: string): Discord {
        if(!Discord._instance) {
            Discord._instance = new Discord(token)
        }

        return Discord._instance
    }

}