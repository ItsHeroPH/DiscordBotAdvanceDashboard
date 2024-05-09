const Guild = require("../../schemas/settings/Guild");
const Leveling = require("../../schemas/settings/Leveling");

module.exports = (app, client, valid) => {
    app.get("/api/guild/:guildID/config/leveling", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const config = await Leveling.findOne({ guildId: guild.id }) || new Leveling({ guildId: guild.id }).save().catch(() => {})
        res.json({
            guild: guild.id,
            config: config
        })
    })
    app.post("/api/guild/:guildID/config/leveling", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const config = await Guild.findOne({ guildId: guild.id }) || new Guild({ guildId: guild.id })
        const level = await Leveling.findOne({ guildId: guild.id }) || new Leveling({ guildId: guild.id })

        if(req.body.enable) {
            level.enable = req.body.enable
            if(!config.enablePlugin.includes("leveling")) {
                config.enablePlugin.push("leveling")
            }
        } else {
            level.enable = req.body.enable
            if(config.enablePlugin.includes("leveling")) {
                config.enablePlugin.pull("leveling")
            }
        }

        if(req.body.anouncement.type) {
            level.anouncement.type = req.body.anouncement.type
        }

        if(req.body.anouncement.channel) {
            level.anouncement.channel = req.body.anouncement.channel
        }

        if(req.body.anouncement.message) {
            level.anouncement.message = req.body.anouncement.message
        } else {
            if(level.anouncement.message !== "") {
                level.anouncement.message = ""
            }
        }

        if(req.body.anouncement.messageEmbed) {
            level.anouncement.messageEmbed = req.body.anouncement.messageEmbed
        } else {
            level.anouncement.messageEmbed = req.body.anouncement.messageEmbed
        }

        if(req.body.anouncement.embed.color) {
            level.anouncement.embed.color = req.body.anouncement.embed.color
        }

        if(req.body.anouncement.embed.author.url) {
            level.anouncement.embed.author.url = req.body.anouncement.embed.author.url
        } else {
            level.anouncement.embed.author.url = ""
        }

        if(req.body.anouncement.embed.author.icon) {
            level.anouncement.embed.author.icon = req.body.anouncement.embed.author.icon
        } else {
            level.anouncement.embed.author.icon = ""
        }

        if(req.body.anouncement.embed.author.name) {
            level.anouncement.embed.author.name = req.body.anouncement.embed.author.name
        } else {
            level.anouncement.embed.author.name = ""
        }

        if(req.body.anouncement.embed.url) {
            level.anouncement.embed.url = req.body.anouncement.embed.url
        } else {
            level.anouncement.embed.url = ""
        }

        if(req.body.anouncement.embed.title) {
            level.anouncement.embed.title = req.body.anouncement.embed.title
        } else {
            level.anouncement.embed.title = ""
        }

        if(req.body.anouncement.embed.description) {
            level.anouncement.embed.description = req.body.anouncement.embed.description
        } else {
            level.anouncement.embed.description = ""
        }

        if(req.body.anouncement.embed.fields) {
            level.anouncement.embed.fields = req.body.anouncement.embed.fields
        } else {
            level.anouncement.embed.fields = []
        }

        if(req.body.anouncement.embed.footer.icon) {

            level.anouncement.embed.footer.icon = req.body.anouncement.embed.footer.icon
        } else {
            level.anouncement.embed.footer.icon = ""
        }

        if(req.body.anouncement.embed.footer.text) {
            level.anouncement.embed.footer.text = req.body.anouncement.embed.footer.text
        } else {
            level.anouncement.embed.footer.text = ""
        }

        if(req.body.anouncement.embed.timestamp) {
            level.anouncement.embed.timestamp = req.body.anouncement.embed.timestamp
        } else {
            level.anouncement.embed.timestamp = req.body.anouncement.embed.timestamp
        }

        if(req.body.card.background) {
            level.card.background = req.body.card.background
        } else {
            level.card.background = ""
        }

        if(req.body.card.color.avatar) {
            level.card.color.avatar = req.body.card.color.avatar
        }

        if(req.body.card.color.username) {
            level.card.color.username = req.body.card.color.username
        }

        if(req.body.card.color.text) {
            level.card.color.text = req.body.card.color.text
        }

        if(req.body.card.color.overlay) {
            level.card.color.overlay = req.body.card.color.overlay
        }

        if(req.body.card.color.progressbar) {
            level.card.color.progressbar = req.body.card.color.progressbar
        }

        if(req.body.card.overlay) {
            level.card.overlay = req.body.card.overlay
        }

        if(req.body.rewards.type) {
            level.rewards.type = req.body.rewards.type
        }

        if(req.body.rewards.removeWhenLoseXP) {
            level.rewards.removeWhenLoseXP = req.body.rewards.removeWhenLoseXP
        } else {
            level.rewards.removeWhenLoseXP = req.body.rewards.removeWhenLoseXP
        }

        if(req.body.rewards.rewards) {
            level.rewards.rewards = req.body.rewards.rewards
        } else {
            level.rewards.rewards = req.body.rewards.rewards
        }

        if(req.body.xp.minimum) {
            level.xp.minimum = req.body.xp.minimum
        }

        if(req.body.xp.maximum) {
            level.xp.maximum = req.body.xp.maximum
        }

        if(req.body.xp.multiplier) {
            level.xp.multiplier = req.body.xp.multiplier
        }

        if(req.body.noXP_Channels.type) {
            level.noXP_Channels.type = req.body.noXP_Channels.type
        }

        if(req.body.noXP_Channels.channels) {
            level.noXP_Channels.channels = req.body.noXP_Channels.channels
        }

        if(req.body.noXP_Roles.type) {
            level.noXP_Roles.type = req.body.noXP_Roles.type
        }

        if(req.body.noXP_Roles.roles) {
            level.noXP_Roles.roles = req.body.noXP_Roles.roles
        }

        config.save()
        level.save()
        res.sendStatus(200)
    })
}