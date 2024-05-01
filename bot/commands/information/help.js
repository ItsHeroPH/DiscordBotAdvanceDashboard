const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { Command } = require("../../Hewo");
const Guild = require("../../schemas/settings/Guild");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			name: "help",
			aliases: ["h"],
			description: "Get some help",
			arguments: [
				{
					name: "",
					description: "Get some help"
				},
				{
					name: "(command name | command aliases)",
					description: "Get information about to the command"
				},
				{
					name: "(command category)",
					description: "Get information about to the category of command"
				}
			],
			category: "information",
			default: true
		})
	}
	async run(message, args) {
        const config = await Guild.findOne({ guildId: message.guild.id }) || new Guild({ guildId: message.guild.id }).save()

		const Argument = args[0] || ""
		const argument = Argument.toLocaleLowerCase()
		const categories = readdirSync("./commands/")
		const command = this.client.commands.get(argument) || this.client.commands.get(this.client.aliases.get(argument))
		if(!(argument == "") && categories.includes(argument)) {
			const commands = this.client.commands.filter(x => x.category === argument)
			const cmds = []
			commands.map(cmd => {
				if(cmd.arguments) {
					cmd.arguments.forEach(arg => {
						cmds.push(`\`${config.prefix}${cmd.name} ${arg.name}\`\n${arg.description}`)
					})
				} else {
					cmds.push(`\`${config.prefix}${cmd.name}\`\n${cmd.description}`)
				}
			})
			if(cmds.length > 10) {
				var page = 0
				let row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
					.setCustomId("prev")
					.setLabel("Prev")
					.setEmoji("◀")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
					new ButtonBuilder()
					.setCustomId("next")
					.setLabel("Next")
					.setEmoji("▶")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(false)
				)
				let embed = new EmbedBuilder()
				.setColor(config.embedColor)
				.setTitle(`Viewing ${this.client.config.emojis.categories[argument]}${argument.slice(0, 1).toLocaleUpperCase() + argument.slice(1)} Category`)
				.setDescription(`Find information on the command provided.\nMandatory arguments \`[]\`, optional arguments \`()\`.\n\n${cmds.slice(page * 10,(page + 1) * 10).join("\n\n")}`)
				.setFooter({ text: `page ${page + 1}/${Math.floor(cmds.length/10) < cmds.length/10 ? Math.floor(cmds.length/10) + 1 : Math.floor(cmds.length/10)}` })
				const msg = await message.channel.send({ embeds: [embed], components: [row]})

				const filter = i => i.user.id == message.author.id;
				const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 })

				collector.on("collect", async i => {
					if (i.customId == "next") {
						if(Math.floor(cmds.length/10) > (page + 1)) {
							page = page + 1
							row = new ActionRowBuilder().addComponents(
								new ButtonBuilder()
								.setCustomId("prev")
								.setLabel("Prev")
								.setEmoji("◀")
								.setStyle(ButtonStyle.Primary)
								.setDisabled(false),
								new ButtonBuilder()
								.setCustomId("next")
								.setLabel("Next")
								.setEmoji("▶")
								.setStyle(ButtonStyle.Primary)
								.setDisabled(false)
							)
							embed = new EmbedBuilder()
							.setColor(config.embedColor)
							.setTitle(`Viewing ${this.client.config.emojis.categories[argument]}${argument.slice(0, 1).toLocaleUpperCase() + argument.slice(1)} Category`)
							.setDescription(`Find information on the command provided.\nMandatory arguments \`[]\`, optional arguments \`()\`.\n\n${cmds.slice(page * 10,(page + 1) * 10).join("\n\n")}`)
							.setFooter({ text: `page ${page + 1}/${Math.floor(cmds.length/10) < cmds.length/10 ? Math.floor(cmds.length/10) + 1 : Math.floor(cmds.length/10)}` })
							i.update({ embeds: [embed], components: [row]})
						} else if(Math.floor(cmds.length/10) == (page + 1)) {
							page = page + 1
							row = new ActionRowBuilder().addComponents(
								new ButtonBuilder()
								.setCustomId("prev")
								.setLabel("Prev")
								.setEmoji("◀")
								.setStyle(ButtonStyle.Primary)
								.setDisabled(false),
								new ButtonBuilder()
								.setCustomId("next")
								.setLabel("Next")
								.setEmoji("▶")
								.setStyle(ButtonStyle.Primary)
								.setDisabled(true)
							)
							embed = new EmbedBuilder()
							.setColor(config.embedColor)
							.setTitle(`Viewing ${this.client.config.emojis.categories[argument]}${argument.slice(0, 1).toLocaleUpperCase() + argument.slice(1)} Category`)
							.setDescription(`Find information on the command provided.\nMandatory arguments \`[]\`, optional arguments \`()\`.\n\n${cmds.slice(page * 10,(page + 1) * 10).join("\n\n")}`)
							.setFooter({ text: `page ${page + 1}/${Math.floor(cmds.length/10) < cmds.length/10 ? Math.floor(cmds.length/10) + 1 : Math.floor(cmds.length/10)}` })
							i.update({ embeds: [embed], components: [row] })
						}
					} else if(i.customId == "prev") {
						if(page > 0) {
							page = page - 1
							row = new ActionRowBuilder().addComponents(
								new ButtonBuilder()
								.setCustomId("prev")
								.setLabel("Prev")
								.setEmoji("◀")
								.setStyle(ButtonStyle.Primary)
								.setDisabled(page == 0 ? true : false),
								new ButtonBuilder()
								.setCustomId("next")
								.setLabel("Next")
								.setEmoji("▶")
								.setStyle(ButtonStyle.Primary)
								.setDisabled(false)
							)
							embed = new EmbedBuilder()
							.setColor(config.embedColor)
							.setTitle(`Viewing ${this.client.config.emojis.categories[argument]}${argument.slice(0, 1).toLocaleUpperCase() + argument.slice(1)} Category`)
							.setDescription(`Find information on the command provided.\nMandatory arguments \`[]\`, optional arguments \`()\`.\n\n${cmds.slice(page * 10,(page + 1) *10).join("\n\n")}`)
							.setFooter({ text: `page ${page + 1}/${Math.floor(cmds.length/10) < cmds.length/10 ? Math.floor(cmds.length/10) + 1 : Math.floor(cmds.length/10)}` })
							i.update({ embeds: [embed], components: [row] })
						}
					}
				})
				collector.on("end", async (c, r) => {
					if(r == "time") {
						row = new ActionRowBuilder().addComponents(
							new ButtonBuilder()
							.setCustomId("prev")
							.setLabel("Prev")
							.setEmoji("◀")
							.setStyle(ButtonStyle.Primary)
							.setDisabled(true),
							new ButtonBuilder()
							.setCustomId("next")
							.setLabel("Next")
							.setEmoji("▶")
							.setStyle(ButtonStyle.Primary)
							.setDisabled(true)
						)
						embed = new EmbedBuilder()
						.setColor(config.embedColor)
						.setTitle(`Viewing ${this.client.config.emojis.categories[argument]}${argument.slice(0, 1).toLocaleUpperCase() + argument.slice(1)} Category`)
						.setDescription(`Find information on the command provided.\nMandatory arguments \`[]\`, optional arguments \`()\`.\n\n${cmds.slice(page * 10,(page + 1) * 10).join("\n\n")}`)
						.setFooter({ text: `page ${page + 1}/${Math.floor(cmds.length/10) < cmds.length/10 ? Math.floor(cmds.length/10) + 1 : Math.floor(cmds.length/10)}` })
						msg.edit({ embeds: [embed], components: [row]})
					}
				})
			} else {
				const row = new ActionRowBuilder().addComponents(
					new ButtonBuilder()
					.setCustomId("prev")
					.setLabel("Prev")
					.setEmoji("◀")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true),
					new ButtonBuilder()
					.setCustomId("next")
					.setLabel("Next")
					.setEmoji("▶")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(true)
				)
				const embed = new EmbedBuilder()
				.setColor(config.embedColor)
				.setTitle(`Viewing ${this.client.config.emojis.categories[argument]}${argument.slice(0, 1).toLocaleUpperCase() + argument.slice(1)} Category`)
				.setDescription(`Find information on the command provided.\nMandatory arguments \`[]\`, optional arguments \`()\`.\n\n${cmds.join("\n\n")}`)
				.setFooter({ text: `page 1/1` })
				message.channel.send({ embeds: [embed], components: [row] })
			}
		} else if(!(argument == "") && command) {
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setAuthor({ name: `Help for command ${command.name.slice(0, 1).toLocaleUpperCase() + command.name.slice(1)}`, iconURL:`${this.client.user.displayAvatarURL()}` })
			.addFields(
				{ name: "Name:", value: `\`${command.name}\``, inline: true },
				{ name: "Description:", value: `\`${command.description}\``, inline: true },
				{ name: "Category:", value: `\`${command.category}\``, inline: true },
				{ name: "Aliases", value: `\`\`\`${command.aliases ? command.aliases.map(a => `${a}`).join(`\n`) : " "}\`\`\``, inline: false },
				{ name: "Usage:", value: `\`\`\`${command.arguments ? command.arguments.map(a => `${config.prefix}${command.name} ${a.name}`).join(`\n`) : `${config.prefix}${command.name}`}${command.aliases ? command.aliases.map(a => `${command.arguments ? command.arguments.map(arg => `\n${config.prefix}${a} ${arg.name}`).join("") : `\n${config.prefix}${a}`}` ).join("") : ""}\`\`\``, inline: false }
			)
			message.channel.send({ embeds: [embed] })
		} else {
			const embed = new EmbedBuilder()
			.setColor(config.embedColor)
			.setAuthor({ name: `Help`, iconURL:`${this.client.user.displayAvatarURL()}` })
			.setThumbnail(this.client.user.displayAvatarURL())
			const cats = []
			categories.forEach(dir => {
				if(dir == "information" || config.enablePlugin.includes(dir)) {
					cats.push({ name:`${this.client.config.emojis.categories[dir]}${dir.slice(0, 1).toLocaleUpperCase() + dir.slice(1)}`, value: `\`${config.prefix}help ${dir}\``, inline: true })
				}
			})
			embed.addFields(cats)
			message.channel.send({ embeds: [embed] })
		}
	}
}