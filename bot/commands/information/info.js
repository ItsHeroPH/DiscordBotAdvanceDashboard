
const { EmbedBuilder } = require("discord.js");
const { Command, ChannelTypes } = require("../../Hewo");
const Guild = require("../../schemas/settings/Guild");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "info",
			description: "Get some information",
			arguments: [
				{
					name: "ping",
					description: "Get the bot's ping"
				},
				{
					name: "uptime",
					description: "Get the bot's uptime"
				},
				{
					name: "server",
					description: "Get the server's information"
				},
				{
					name: "avatar [avatar]",
					description: "Get the user's avatar"
				},
				{
					name: "user [user]",
					description: "Get the user's information"
				},
				{
					name: "channel [channel]",
					description: "Get the channel's information"
				},
				{
					name: "role [role]",
					description: "Get the role's information"
				}
			],
			category: "information",
			default: true
		})
	}
	async run(message, args) {
		const config = await Guild.findOne({ guildId: message.guild.id }) || new Guild({ guildId: message.guild.id }).save()

		const subcommand = args[0].toLocaleLowerCase();
		if(subcommand == "ping") {
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setTitle(`${this.client.user.username}'s Ping`)
			.setDescription(`**Ping: **\`${this.client.ws.ping}ms\``)
			message.reply({ embeds: [embed]})
		} else if(subcommand == "uptime") {
			let days = Math.floor(this.client.uptime / 86400000);
            let hours = Math.floor(this.client.uptime / 3600000) % 24;
            let minutes = Math.floor(this.client.uptime / 60000) % 60;
            let seconds = Math.floor(this.client.uptime / 1000) % 60;
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setTitle(`${this.client.user.username}'s Uptime`)
			.setDescription(`**Uptime: **\`${days}d ${hours}h ${minutes}m ${seconds}s\``)
			message.reply({ embeds: [embed]})
		} else if(subcommand == "server") {
			const guild = message.guild
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setTitle(`${guild.name}'s info`)
			.addFields(
				{ name: "Name:", value: `${guild.name}`, inline: true },
				{ name: "Id:", value: `${guild.id}`, inline: true },
				{ name: "Icon:", value: `[${guild.name}'s Icon](${guild.iconURL()})`, inline: true },
				{ name: "MemberCount:", value: `${guild.memberCount}`, inline: false }
			)
			message.reply({ embeds: [embed]})
		} else if(subcommand == "avatar") {
			const user = message.mentions.members.first()
			if(!user) return message.reply({ embeds: [
				new EmbedBuilder()
				.setColor(this.client.config.colors.error)
				.setTitle(`${this.client.config.emojis.error} - ERROR`)
				.setDescription("Invalid query!\n\nPlease provide a valid query")
			] })
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setTitle(`${user.user.username}'s avatar`)
			.setURL(user.displayAvatarURL())
			.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
			message.reply({ embeds: [embed]})
		} else if(subcommand == "user") {
			const user = message.mentions.members.first()
			if(!user) return message.reply({ embeds: [
				new EmbedBuilder()
				.setColor(this.client.config.colors.error)
				.setTitle(`${this.client.config.emojis.error} - ERROR`)
				.setDescription("Invalid query!\n\nPlease provide a valid query")
			] })
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setTitle(`${user.user.username}'s info`)
			.addFields(
				{ name: "Usertag:", value: `${user.user.tag}`, inline: true },
				{ name: "UserId:", value: `${user.id}`, inline: true },
				{ name: "AvatarURL:", value: `**[Avatar](${user.displayAvatarURL()})**`, inline: true },
				{ name: "Created At:", value: `${user.user.createdAt}`, inline: false },
			)
			.setThumbnail(user.displayAvatarURL({ dynamic: true }))
			message.reply({ embeds: [embed]})
		} else if(subcommand == "channel") {
			const channel = message.mentions.channels.first()
			if(!channel) return message.reply({ embeds: [
				new EmbedBuilder()
				.setColor(this.client.config.colors.error)
				.setTitle(`${this.client.config.emojis.error} - ERROR`)
				.setDescription("Invalid query!\n\nPlease provide a valid query")
			] })
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setTitle(`${channel.name}'s info`)
			.addFields(
				{ name: "Name:", value: `${channel.name}`, inline: true },
				{ name: "Id:", value: `${channel.id}`, inline: true },
				{ name: "Type:", value: `${ChannelTypes.serialize(channel.type)}`, inline: true },
				{ name: "Parent:", value: `${channel.parent.name}`, inline: true },
				{ name: "NSFW:", value: `${channel.nsfw}`, inline: true }
			)
			message.reply({ embeds: [embed] })
		} else if(subcommand == "role") {
			const role = message.mentions.roles.first()
			if(!role) return message.reply({ embeds: [
				new EmbedBuilder()
				.setColor(this.client.config.colors.error)
				.setTitle(`${this.client.config.emojis.error} - ERROR`)
				.setDescription("Invalid query!\n\nPlease provide a valid query")
			] })
			const embed = new EmbedBuilder()
            .setColor(role.hexColor)
            .setTitle(`${role.name}'s role info`)
            .addFields(
                { name: "Name:", value: `${role.name}`, inline: true },
                { name: "Id:", value: `${role.id}`, inline: true },
                { name: "Color:", value: `${role.hexColor}`, inline: true },
                { name: "Created At:", value: `${role.createdAt}`, inline: false },
                { name: "Permissions:", value: `${role.permissions.toArray().join("\n")}`, inline: false }
            )
            message.reply({ embeds: [embed] })
		}
	} 
}