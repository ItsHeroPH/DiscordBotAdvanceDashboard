const { Schema, model } = require("mongoose");

const schema = new Schema({
    guildId: { type: String, required: true },
    messageId: { type: String, required: true, unique: true },
    message: { type: String, default: "" },
    channel: { type: String, default: "" },
    embed: {
        author: {
            name: { type: String, default: "" },
            icon: { type: String, default: "" },
            url: { type: String, default: "" }
        },
        url: { type: String, default: "" },
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        color: { type: String, default: "#000000" },
        image: { type: String, default: "" },
        fields: { type: Array, default: []},
        thumbnail: { type: String, default: "" },
        footer: {
            text: { type: String, default: "" },
            icon: { type: String, default: "" }
        },
        timestamp: { type: Boolean, default: false }
    },
    messageEmbed: { type: Boolean, default: false },
    type: { type: Number, default: 1 },
    reactions: { type: Array, default: []},
    blacklist: { type: Array, default: []},
    whitelist: { type: Array, default: []}
})

module.exports = model("guild-reaction-role", schema)