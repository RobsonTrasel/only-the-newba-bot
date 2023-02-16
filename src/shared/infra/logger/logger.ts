import winston from "winston";

export class Logger {
    private static _instance: Logger
    private _logger: winston.Logger

    private constructor() {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(info => {
                    return `[${info.timestamp}] [${info.level.toUpperCase()}] - ${info.message}`
                }),
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'app.log'
                })
            ]
        })
    }

    static getInstance(): Logger {
        if(!Logger._instance) {
            Logger._instance = new Logger()
        }

        return Logger._instance
    }

    info(message: string): void {
        this._logger.info(message);
    }
    
    error(message: string, error: Error): void {
        this._logger.error(message, { error });
    }
}