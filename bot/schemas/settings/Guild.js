const { Schema, model } = require("mongoose")
const config = require("../../config")

const schema = new Schema({
    guildId: { type: String, required: true, unique: true },
    prefix: { type: String, default: config.prefix },
    embedColor: { type: String, default: config.colors.default },
    language: { type: String, default: "en-us" },
    enablePlugin: { type: Array, default: []},
    disabledCommands: { type: Array, default: []},
    leaves: { type: Array, default: []},
    joins: { type: Array, default: []},
})

module.exports = model("guild-settings", schema)