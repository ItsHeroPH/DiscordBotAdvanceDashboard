const { EmbedBuilder } = require("discord.js")
const ReactionRoles = require("../../schemas/settings/ReactionRoles")

module.exports = (app, client, valid) => {
    app.get("/api/guild/:guildID/config/reactionroles", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const reactionRoles = await ReactionRoles.find({ guildId: guild.id })
        res.json({
            reactionroles: reactionRoles
        })
    })
    app.post("/api/guild/:guildID/config/reactionroles", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const reactionRoles = await ReactionRoles.find({ guildId: guild.id })

        if(!guild) return;

        const channel = await guild.channels.cache.find((ch) => ch.id == req.body.channel)

        if(!channel) return;

        let message = ""
        if(req.body.message) message = req.body.message
        if(req.body.messageEmbed) {
            const URL = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
            const embed = new EmbedBuilder()
            if(req.body.embed.author.name) {
                embed.setAuthor({
                    name: req.body.embed.author.name,
                    iconURL: URL.test(req.body.embed.author.icon) ? req.body.embed.author.icon : null,
                    url: URL.test(req.body.embed.author.url) ? req.body.embed.author.url : null
                })
            }
            if(req.body.embed.thumbnail) {
                embed.setThumbnail(URL.test(req.body.embed.thumbnail) ? req.body.embed.thumbnail : null)
            }
            if(req.body.embed.color) {
                embed.setColor(req.body.embed.color)
            }
            if(req.body.embed.url) {
                embed.setTitle(URL.test(req.body.embed.url) ? req.body.embed.url : null)
            }
            if(req.body.embed.title) {
                embed.setTitle(req.body.embed.title)
            }
            if(req.body.embed.description) {
                embed.setDescription(req.body.embed.description)
            }
            if(req.body.embed.fields) {
                embed.setFields(req.body.embed.fields)
            }
            if(req.body.embed.image) {
                embed.setImage(URL.test(req.body.embed.image) ? req.body.embed.image : null)
            }
            if(req.body.embed.footer.text) {
                embed.setFooter({
                    text: req.body.embed.footer.text,
                    iconURL: URL.test(req.body.embed.footer.icon) ? req.body.embed.footer.icon : null,
                })
            }
            if(req.body.embed.timestamp) {
                embed.setTimestamp(Date.now())
            }
            const messages = await channel.send({ content: message, embeds: [embed]})

            for(const react of req.body.reactions) {
                await messages.react(react.emoji)
            }
            const config = new ReactionRoles({ guildId: guild.id, messageId: messages.id, ...req.body })
            await config.save().then(() => {})
            res.json({
                config: [...reactionRoles, config]
            })
        } else {
            const messages = await channel.send({ content: message})

            for(const react of req.body.reactions) {
                await messages.react(react.emoji)
            }
            const config = new ReactionRoles({ guildId: guild.id, messageId: messages.id, ...req.body })
            await config.save().then(() => {})
            res.json({
                config: [...reactionRoles, config]
            })
        }
    })
    app.post("/api/guild/:guildID/config/reactionroles/:messageID", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const reactionConfig = await ReactionRoles.findOne({ guildId: guild.id, messageId: req.params.messageID })
        if(!guild || !reactionConfig) return;

        if(req.body.message) {
            reactionConfig.message = req.body.message
        } else {
            reactionConfig.message = req.body.message
        }
        if(req.body.messageEmbed) {
            reactionConfig.messageEmbed = req.body.messageEmbed
        } else {
            reactionConfig.messageEmbed = req.body.messageEmbed
        }
        if(req.body.reactions) {
            reactionConfig.reactions = req.body.reactions
        } else {
            reactionConfig.reactions = req.body.reactions
        }
        if(req.body.whitelist) {
            reactionConfig.whitelist = req.body.whitelist
        } else {
            reactionConfig.whitelist = req.body.whitelist
        }
        if(req.body.embed) {
            reactionConfig.embed = req.body.embed
        }
        if(req.body.channel) {
            reactionConfig.channel = req.body.channel
        }

        const channel = await guild.channels.cache.find((ch) => ch.id == reactionConfig.channel)

        if(channel) {
            if(reactionConfig.messageEmbed) {

                const URL = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
                const embed = new EmbedBuilder()
                if(reactionConfig.embed.author.name) {
                    embed.setAuthor({
                        name: reactionConfig.embed.author.name,
                        iconURL: URL.test(reactionConfig.embed.author.icon) ? reactionConfig.embed.author.icon : null,
                        url: URL.test(reactionConfig.embed.author.url) ? reactionConfig.embed.author.url : null
                    })
                }
                if(reactionConfig.embed.thumbnail) {
                    embed.setThumbnail(URL.test(reactionConfig.embed.thumbnail) ? reactionConfig.embed.thumbnail : null)
                }
                if(reactionConfig.embed.color) {
                    embed.setColor(reactionConfig.embed.color)
                }
                if(reactionConfig.embed.url) {
                    embed.setTitle(URL.test(reactionConfig.embed.url) ? reactionConfig.embed.url : null)
                }
                if(reactionConfig.embed.title) {
                    embed.setTitle(reactionConfig.embed.title)
                }
                if(reactionConfig.embed.description) {
                    embed.setDescription(reactionConfig.embed.description)
                }
                if(reactionConfig.embed.fields) {
                    embed.setFields(reactionConfig.embed.fields)
                }
                if(reactionConfig.embed.image) {
                    embed.setImage(URL.test(reactionConfig.embed.image) ? reactionConfig.embed.image : null)
                }
                if(reactionConfig.embed.footer.text) {
                    embed.setFooter({
                        text: reactionConfig.embed.footer.text,
                        iconURL: URL.test(reactionConfig.embed.footer.icon) ? reactionConfig.embed.footer.icon : null,
                    })
                }
                if(reactionConfig.embed.timestamp) {
                    embed.setTimestamp(Date.now())
                }
                await channel.messages.fetch((m) => m.id == reactionConfig.messageId).then(async(msg) => {
                    await msg.delete()
                    const newMessage = await channel.send({ content: reactionConfig.message, embeds: [embed]})
                    reactionConfig.messageId = newMessage.id
                    for(const react of req.body.reactions) {
                        await newMessage.react(react.emoji)
                    }
                })
            } else {
                await channel.messages.fetch((m) => m.id == reactionConfig.messageId).then(async(msg) => {
                    await msg.delete()
                    const newMessage = await channel.send({ content: reactionConfig.message})
                    reactionConfig.messageId = newMessage.id
                    for(const react of req.body.reactions) {
                        await newMessage.react(react.emoji)
                    }
                })
            }
        }
        await reactionConfig.save().then(() => {})
        const reactionRoles = await ReactionRoles.find({ guildId: guild.id })
        res.json({
            config: reactionRoles
        })
    })
    app.post("/api/guild/:guildID/config/reactionroles/:messageID/delete", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        await ReactionRoles.deleteOne({ guildId: guild.id, messageId: req.params.messageID })
        const reactionRoles = await ReactionRoles.find({ guildId: guild.id })
        res.json({
            config: reactionRoles
        })
    })
}