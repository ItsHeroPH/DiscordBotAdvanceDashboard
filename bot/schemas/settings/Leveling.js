const { Schema, model } = require("mongoose");

const schema = new Schema({
    guildId: { type: String, required: true, unique: true },
    enable: { type: Boolean, default: false },
    xp: {
        minimum: { type: Number, default: 10 },
        maximum: { type: Number, default: 40 },
        multiplier: { type: Number, default: 1 }
    },
    anouncement: {
        type: { type: Number, default: 1 },
        channel: { type: String, default: "" },
        message: { type: String, default: "**Congratulation {user} You reached level {level}**" },
        embed: {
            author: {
                name: { type: String, default: "" },
                icon: { type: String, default: "" },
                url: { type: String, default: "" }
            },
            url: { type: String, default: "" },
            title: { type: String, default: "Congratulations 🎉🎉" },
            description: { type: String, default: "Congratulation {user} You reached level {level}" },
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
        messageEmbed: { type: Boolean, default: false }
    },
    card: {
        color: {
            avatar: { type: String, default: "#FFFFFF" },
			username: { type: String, default: "#FFFFFF" },
			progressbar: { type: String, default: "#3CBAF9" },
            text: { type: String, default: "#FFFFFF" },
            overlay: { type: String, default: "#000000" }
        },
        background: { type: String, default: "" },
        overlay: { type: Number, default: 0.3 }
    },
    rewards: {
        type: { type: Number, default: 1 },
        removeWhenLoseXP: { type: Boolean, default: true },
        rewards: { type: Array, default: []}
    },
    noXP_Roles: {
        roles: { type: Array, default: [] },
        type: { type: Number, default: 1 }
    },
    noXP_Channels: {
        channels: { type: Array, default: [] },
        type: { type: Number, default: 1 }
    }
})

module.exports = model("guild-leveling", schema)