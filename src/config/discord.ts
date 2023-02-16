import { Client, GatewayIntentBits } from 'discord.js';
import { Logger } from "../shared/infra/logger/logger";

const logger = Logger.getInstance()

export class Discord {
    private readonly _client: Client

    constructor(token: string) {
        this._client = new Client({
            intents: [
                GatewayIntentBits.Guilds
            ]
        })

        this._client.on('ready', () => {
            logger.info('[BOT] Bot is ready!');
        });
      
        this._client.on('messageCreate', (message) => {
            if (message.author.bot) return;
      
            logger.info(`[Message] Received message: ${message.content}`);
        });
      
        this._client.login(token).then(() => {
            logger.info('[BOT]Logged in!');
        });
    }

    public getClient(): Client {
        return this._client;
    }
}