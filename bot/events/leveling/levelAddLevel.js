const { EmbedBuilder } = require("discord.js");
const { Event } = require("../../Hewo");
const Leveling = require("../../schemas/settings/Leveling");
const UserLeveling = require("../../schemas/users/UserLeveling");

module.exports = class extends Event {
    async run(message, user, newLevel, hasMessage) {
        const config = await Leveling.findOne({ guildId: message.guild.id }) || new Leveling({ guildId: message.guild.id }).save().then(() => {})
        const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: user.id }) || new UserLeveling({ guildId: message.guild.id, userId: user.id }).save().then(() => {})
        for(const reward of config.rewards.rewards.sort((a, b) => parseInt(b.level) - parseInt(a.level))) {
            if(parseInt(reward.level) <= newLevel) {
                this.client.emit("levelReward", message, user, config.rewards, reward)
                break;
            }
        }
        if(!(config.anouncement.type == 1) && hasMessage) {
            const levelMessage = await config.anouncement.message.replace(/{user}/g, user.user)
            .replace(/{user.name}/g, user.user.username)
            .replace(/{user.id}/g, user.user.id)
            .replace(/{xp}/g, User.xp)
            .replace(/{level}/g, newLevel)
            .replace(/{xp.requirement}/g, (16 * ((newLevel + 1)^2)))

            const URL = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g

            const embed = new EmbedBuilder()
            if(config.anouncement.embed.author.name.length !== 0) {
                embed.setAuthor({
                    name: config.anouncement.embed.author.name.replace(/{user}/g, user.user)
                    .replace(/{user.name}/g, user.user.username)
                    .replace(/{user.id}/g, user.user.id)
                    .replace(/{xp}/g, User.xp)
                    .replace(/{level}/g, newLevel)
                    .replace(/{xp.requirement}/g, (16 * ((newLevel + 1)^2))),
                    iconURL: URL.test(config.anouncement.embed.author.icon.replace(/{user.avatar}/g, user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png")) ? config.anouncement.embed.author.icon.replace(/{user.avatar}/g, user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png") : null,
                    url: URL.test(config.anouncement.embed.author.url) ? config.anouncement.embed.author.url : null
                })
            }
            
            embed.setColor(config.anouncement.embed.color)
            if(config.anouncement.embed.title.length !== 0) {
                embed.setTitle(config.anouncement.embed.title.replace(/{user}/g, user.user.username)
                    .replace(/{user.name}/g, user.user.username)
                    .replace(/{user.id}/g, user.user.id)
                    .replace(/{xp}/g, User.xp)
                    .replace(/{level}/g, newLevel)
                    .replace(/{xp.requirement}/g, (16 * ((newLevel + 1)^2)))
                )
            }
            if(config.anouncement.embed.description !== 0) {
                embed.setDescription(config.anouncement.embed.description.replace(/{user}/g, user.user)
                    .replace(/{user.name}/g, user.user.username)
                    .replace(/{user.id}/g, user.user.id)
                    .replace(/{xp}/g, User.xp)
                    .replace(/{level}/g, newLevel)
                    .replace(/{xp.requirement}/g, (16 * ((newLevel + 1)^2)))
                )
            }
            embed.setFields(config.anouncement.embed.fields.map((field) => {
                const fieldName = field.name.replace(/{user}/g, user.user.username)
                .replace(/{user.name}/g, user.user.username)
                .replace(/{user.id}/g, user.user.id)
                .replace(/{xp}/g, User.xp)
                .replace(/{level}/g, newLevel)
                .replace(/{xp.requirement}/g, (16 * ((newLevel + 1)^2)))

                const fieldValue = field.value.replace(/{user}/g, user.user)
                .replace(/{user.name}/g, user.user.username)
                .replace(/{user.id}/g, user.user.id)
                .replace(/{xp}/g, User.xp)
                .replace(/{level}/g, newLevel)
                .replace(/{xp.requirement}/g, (16 * ((newLevel + 1)^2)))

                return {
                    name: fieldName,
                    value: fieldValue,
                    inline: field.inline
                }
            }))
            .setImage(URL.test(config.anouncement.embed.image.replace(/{user.avatar}/g, user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png")) ? config.anouncement.embed.image : null)
            .setThumbnail(URL.test(config.anouncement.embed.thumbnail.replace(/{user.avatar}/g, user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png")) ? config.anouncement.embed.thumbnail.replace(/{user.avatar}/g, user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png") : null)
            .setURL(URL.test(config.anouncement.embed.url) ? config.anouncement.embed.url : null)
            if(config.anouncement.embed.footer.text.length !== 0) {
                embed.setFooter({
                    text: config.anouncement.embed.footer.text.replace(/{user}/g, user.user)
                    .replace(/{user.name}/g, user.user.username)
                    .replace(/{user.id}/g, user.user.id)
                    .replace(/{xp}/g, User.xp)
                    .replace(/{level}/g, newLevel)
                    .replace(/{xp.requirement}/g, (16 * ((newLevel + 1)^2))),
                    iconURL: URL.text(config.anouncement.embed.footer.icon.replace(/{user.avatar}/g, user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png")) ? config.anouncement.embed.footer.icon.replace(/{user.avatar}/g, user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png") : null
                })
            }
            embed.setTimestamp(config.anouncement.embed.timestamp ? Date.now() : null)

            if(config.anouncement.type == 2) {
                if(config.anouncement.messageEmbed) { 
                    message.channel.send({ content: levelMessage, embeds: [embed] })
                } else {
                    message.channel.send({ content: levelMessage })
                }
            } else if(config.anouncement.type == 3) {
                if(config.anouncement.messageEmbed) { 
                    user.user.send({ content: levelMessage, embeds: [embed] }) 
                } else {
                    user.user.send({ content: levelMessage })
                }
            } else if(config.anouncement.type == 4) {
                const channel = await message.guild.channels.cache.get(config.anouncement.channel)
                if(config.anouncement.messageEmbed) { 
                    channel.send({ content: levelMessage, embeds: [embed] })
                } else {
                    channel.send({ content: levelMessage })
                }
            }
        }
    }
}