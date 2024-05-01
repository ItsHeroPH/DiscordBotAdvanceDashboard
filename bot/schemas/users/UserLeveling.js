const { Schema, model } = require("mongoose");

const schema = new Schema({
    guildId: { type: String, require: true },
    userId: { type: String, require: true },
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 }
})

module.exports = model("guild-user-leveling", schema)