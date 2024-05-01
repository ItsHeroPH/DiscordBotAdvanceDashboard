const { Event } = require("../../Hewo");
const UserLeveling = require("../../schemas/users/UserLeveling");

module.exports = class extends Event {
    async run(message, user, config) {
        const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: user.id }) || new UserLeveling({ guildId: message.guild.id, userId: user.id }).save().then(() => {})
        if(config.removeWhenLoseXP) {
            const sortedRewards = config.rewards.sort((a, b) => parseInt(b.level) - parseInt(a.level));
            for(const prevReward of sortedRewards.filter((r) => r.level > User.level)) {
                for (const role of prevReward.roles) {
                    const RoleToRemove = await message.guild.roles.cache.get(role);
                    if (user.roles.cache.find(r => r.id === RoleToRemove.id)) {
                        await user.roles.remove(RoleToRemove);
                    }
                }
            }
        }
    }
}