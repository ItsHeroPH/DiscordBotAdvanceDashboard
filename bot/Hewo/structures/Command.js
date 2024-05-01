module.exports = class Command {
	constructor(client, option = {}) {
		this.client = client
		this.name = option.name || null
		this.aliases = option.aliases || null
		this.description = option.description || null
		this.arguments = option.arguments || null
		this.category = option.category || null
		this.plugin = option.plugin || "global"
		this.default = option.default || false
	}
	async run(message, args) {
		this.client.logger.error("COMMAND", `The run method has not been implemented in ${this.name}`);
	}
}