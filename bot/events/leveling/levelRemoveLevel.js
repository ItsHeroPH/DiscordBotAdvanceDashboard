const { Event } = require("../../Hewo");
const Leveling = require("../../schemas/settings/Leveling");
const UserLeveling = require("../../schemas/users/UserLeveling");

module.exports = class extends Event {
    async run(message, user) {
        const config = await Leveling.findOne({ guildId: message.guild.id }) || new Leveling({ guildId: message.guild.id }).save().then(() => {})
        const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: user.id }) || new UserLeveling({ guildId: message.guild.id, userId: user.id }).save().then(() => {})
        let REWARD = null
        for(const reward of config.rewards.rewards.sort((a, b) => parseInt(b.level) - parseInt(a.level))) {
            if(parseInt(reward.level) <= User.level) {
                REWARD = reward
                break;
            } 
        }
        if(REWARD) {
            this.client.emit("levelReward", message, user, config.rewards, REWARD)
        } else {
            this.client.emit("levelNoReward", message, user, config.rewards)
        }
    }
}