const { Event } = require("../../Hewo");
const UserLeveling = require("../../schemas/users/UserLeveling");
const { calculateLevelAfterAddingXP, calculateXPRequirement } = require("../../util/levelingCalculation");

module.exports = class extends Event {
    async run(message, user, xp) {
        const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: user.id }) || new UserLeveling({ guildId: message.guild.id, userId: user.id })

        const currentLevel = User.level
        const newLevel = calculateLevelAfterAddingXP(User.xp, currentLevel, xp)
        if(newLevel > currentLevel) {
            User.level = newLevel
            const newXP = Math.floor((User.xp + xp) - calculateXPRequirement(currentLevel))
            const newXpRequirement = calculateXPRequirement(newLevel)
            if (newXP > newXpRequirement) {
                User.xp = 0
                User.save().then(() => {})
                setTimeout(() => this.client.emit("levelAddXP", message, user, newXP), 5)
                this.client.emit("levelAddLevel", message, user, false)
            } else {
                User.xp = newXP
                User.save().then(() => {})
                this.client.emit("levelAddLevel", message, user, newLevel, true)
            }
        } else {
            User.xp = Math.floor(User.xp + xp)
            User.save().then(() => {})
        }
    }
}