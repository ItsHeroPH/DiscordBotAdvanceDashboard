module.exports = class Event {
    constructor(client, name, options = {}) {
		this.client = client
		this.name = name
		this.partials = ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'GUILD_MESSAGE_REACTIONS'],
        this.type = options.once ? 'once' : 'on';
        this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
	}
	async run(message, args) {
        this.client.logger.error("EVENT", `The run method has not been implemented in ${this.name}`)
    }
}