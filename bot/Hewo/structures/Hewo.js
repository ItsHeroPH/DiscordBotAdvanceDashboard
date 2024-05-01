const { Client, GatewayIntentBits, Collection, Partials } = require("discord.js")
const Logger = require("./utility/Logger")
const Util = require("./utility/Util")

module.exports = class Hewo extends Client {
    constructor(config) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildEmojisAndStickers
            ],
            partials: [
                Partials.User,
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction
            ]
        })
        this.commands = new Collection
        this.aliases = new Collection
        this.logger = new Logger("Logs")
        this.validateConfig(config)
        this.config = config
        this.util = new Util(this)
    }
    
    async validateConfig(config) {
        if(!config.token) this.logger.error("CLIENT", "Token is invalid \nYou must provide a valid token in the config file!")
        if(!config.prefix) this.logger.error("CLIENT", "Prefix is invalid \nYou must provide a valid prefix in the config file!")
        if(!config.database) this.logger.error("CLIENT", "Database is invalid \nYou must provide a valid database url in the config file!")
    }

    async start() {
        await this.util.loadEvents()
        await this.util.loadCommands()
        await this.util.connectToDatabase(this.config.database)
        this.login(this.config.token)
    }
}