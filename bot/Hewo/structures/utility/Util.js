const fs = require("fs").promises;
const path = require("path");
const Event = require("../Event");
const Command = require("../Command");
const mongoose = require("mongoose");

module.exports = class Util {
    constructor(client) {
        this.client = client
    }

    isClass(input) {
        return typeof input === "function" &&
        typeof input.prototype === "object" &&
        input.toString().substring(0, 5) === "class";    
    }

    get directory() {
        return  `${path.dirname(require.main.filename)}${path.sep}`
    }

    async *loadFiles(dir) {
        const files = await fs.readdir(dir)
        for (const file of files) {
            const pathToFile = path.join(dir, file)
            const isDirectory = (await fs.stat(pathToFile)).isDirectory()
            if (isDirectory) {
                yield* this.loadFiles(pathToFile)
            } else {
                yield pathToFile
            }
        }
    }
    async loadEvents() {
		const eventFiles = this.loadFiles(`${this.directory}events`)
		for await(const eventFile of eventFiles) {
			delete require.cache[eventFile];
			const { name } = path.parse(eventFile);
			const File = require(eventFile);
            if (!this.isClass(File)) this.client.logger.error("UTIL", `Event ${name} doesn't export a class!`)
			const event = new File(this.client, name);
			if (!(event instanceof Event)) this.client.logger.error("UTIL", `Event ${name} doesn't belong in Events`)
			this.client.logger.info("UTIL", `Event ${name} is loaded`)
			event.emitter[event.type](name, (...args) => event.run(...args));
		}
	}
    async loadCommands() {
		const commandFiles = this.loadFiles(`${this.directory}commands`)
		for await (const commandFile of commandFiles) {
			delete require.cache[commandFile]
			const { name } = path.parse(commandFile)
			const File = require(commandFile);
      if (!this.isClass(File)) this.client.logger.error("UTIL", `Command ${name} doesn't export a class!`)
			const command = new File(this.client)
			if(!(command instanceof Command)) this.client.logger.error("UTIL", `Command ${name} doesn't belong in Commands`)
			this.client.logger.info("UTIL", `Command ${name} is loaded!`)
			this.client.commands.set(command.name, command)
			if(command.aliases) command.aliases.forEach((a) => this.client.aliases.set(a, command.name))
		}
	}
    async connectToDatabase(url) {
		const dbOptions = {
			keepAlive: true,
	        useNewUrlParser: true,
	        useUnifiedTopology: true,
		};
		mongoose.Promise = global.Promise;
		mongoose.connect(url, dbOptions)
		.catch(err => {
			this.client.logger.error("DATABASE", `Error: ${err.message}`)
		});
		mongoose.connection.on('connected', () => {
			this.client.logger.info("DATABASE", "Connected To The MongoDB")
		});
		mongoose.connection.on('err', err => {
            this.client.logger.error("DATABASE", `Mongoose connection error: ${err.stack}`)
        });
        mongoose.connection.on('disconnected', () => {
            this.client.logger.error("DATABASE", `Mongoose connection lost`)
        });
	}
}