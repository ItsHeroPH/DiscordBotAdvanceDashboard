const Guild = require("../../schemas/settings/Guild")

module.exports = (app, client, valid) => {
    app.get("/api/guild/:guildID/config", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const config = await Guild.findOne({ guildId: guild.id }) || new Guild({ guildId: guild.id }).save().catch(() => {})
        res.json({
            guild: guild.id,
            config: config
        })
    })
    app.post("/api/guild/:guildID/config", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const config = await Guild.findOne({ guildId: guild.id }) || new Guild({ guildId: guild.id })
        
        if(req.body.prefix) {
            if(req.body.prefix !== config.prefix) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the prefix from <>${config.prefix}</> to <>${req.body.prefix}</>`,
                    date: new Date()
                })
            }
            config.prefix = req.body.prefix
        }
        if(req.body.embedColor) {
            if(req.body.embedColor !== config.embedColor) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the embed color from <>${config.embedColor}</> to <>${req.body.embedColor}</>`,
                    date: new Date()
                })
            }
            config.embedColor = req.body.embedColor
        }

        config.save()
        res.sendStatus(200)
    })
}