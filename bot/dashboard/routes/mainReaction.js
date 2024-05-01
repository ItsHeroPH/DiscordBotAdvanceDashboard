const ReactionRoles = require("../../schemas/settings/ReactionRoles")

module.exports = (app, client, valid) => {
    app.get("/api/guild/:guildID/config/reactionroles", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const reactionRoles = await ReactionRoles.find({ guildId: guild.id })
        res.json({
            reactionroles: reactionRoles
        })
    })
}