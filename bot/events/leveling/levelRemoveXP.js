const { Event } = require("../../Hewo");
const UserLeveling = require("../../schemas/users/UserLeveling");
const { calculateLevelAfterRemovingXP, calculateXPRequirement } = require("../../util/levelingCalculation");

module.exports = class extends Event {
    async run(message, user, xp) {
        const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: user.id }) || new UserLeveling({ guildId: message.guild.id, userId: user.id })

        const currentLevel = User.level
        const newLevel = calculateLevelAfterRemovingXP(User.xp, currentLevel, xp)
        if(newLevel < currentLevel) {
            if(newLevel < 0) {
                User.xp = 0
                User.level = 0
                User.save().then(() => {})
            } else {
                User.level = newLevel
                const newXP = Math.floor((User.xp - xp) - calculateXPRequirement(newLevel))
                if (newXP < 0) {
                    User.xp = 0
                    User.save().then(() => {})
                    setTimeout(() => this.client.emit("levelRemoveXP", message, user, Math.floor(calculateXPRequirement(newLevel) - (User.xp - xp))), 5)
                } else {
                    User.xp = newXP
                    User.save().then(() => {})
                }
            }
            setTimeout(() => this.client.emit("levelRemoveLevel", message, user), 5)
        } else {
            User.xp = Math.floor(User.xp - xp)
            User.save().then(() => {})
        }
    }
}