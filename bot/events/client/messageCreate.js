const { Event } = require("../../Hewo");
const Guild = require("../../schemas/settings/Guild");

module.exports = class extends Event {
	async run(message) {
        const config = await Guild.findOne({ guildId: message.guild.id }) || new Guild({ guildId: message.guild.id }).save()

		if(message.author.bot || message.channel.type == 1) return;
		if(!message.content.startsWith(config.prefix)) return;
		
		let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  	    let cmd = args.shift().toLowerCase();

		const command = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd));

		if(command) {
			if(command.default) {
                this.client.logger.info("COMMAND EXECUTED", `User: ${message.author.tag} (${message.author.id}) | Server: ${message.guild.name} (${message.guild.id}) | Command: ${command.name}`)
			    command.run(message, args)
            } else {
				if(config.enablePlugin.includes(command.category) && !config.disabledCommands.includes(command.name)) {
					this.client.logger.info("COMMAND EXECUTED", `User: ${message.author.tag} (${message.author.id}) | Server: ${message.guild.name} (${message.guild.id}) | Command: ${command.name}`)
					command.run(message, args)
				}
            }
		}
	}
}