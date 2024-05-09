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
            config.prefix = req.body.prefix
        }
        if(req.body.embedColor) {
            config.embedColor = req.body.embedColor
        }

        config.save()
        res.json(config)
    })
}