const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { Command } = require("../../Hewo");
const Guild = require("../../schemas/settings/Guild");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "remove-xp",
            description: "Remove xp to a user",
            arguments: [
                {
                    name: "[user] [amount]",
                    description: "Remove xp to a user"
                }
            ],
            category: "leveling"
        })
    }
    async run(message, args) {
        const config = await Guild.findOne({ guildId: message.guild.id }) || new Guild({ guildId: message.guild.id }).save()
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!message.member.permissions.has(PermissionFlagsBits.ManageGuild | PermissionFlagsBits.ManageGuild)) return message.reply({ embeds: [
            new EmbedBuilder()
            .setColor(this.client.config.colors.error)
            .setTitle(`${this.client.config.emojis.error} - ERROR`)
            .setDescription("You don't have enough permission")
        ]})

        if(user && !user.bot) {
            if(!args[1] || isNaN(args[1])) {
                const embed = new EmbedBuilder()
                .setColor(this.client.config.colors.error)
                .setTitle(`${this.client.config.emojis.error} - ERROR`)
                .setDescription("Invalid amount\n\nPlease provide a valid number")

                message.reply({ embeds: [embed]})
            } else {
                let xp = parseInt(args[1])
                this.client.emit("levelRemoveXP", message, user, xp)
                
                const embed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle("Remove Xp")
                .setDescription(`You remove ${xp} xp to ${user.user}`)
                .setTimestamp(Date.now())

                message.reply({ embeds: [embed]})

            }
        } else {
            const embed = new EmbedBuilder()
			.setColor(this.client.config.colors.error)
            .setTitle(`${this.client.config.emojis.error} - ERROR`)
            .setDescription(user?.bot ? "You can't give xp to a bot" : "User invalid\n\nPlease provide a valid user")

            message.reply({ embeds: [embed]})
        }
    }
}