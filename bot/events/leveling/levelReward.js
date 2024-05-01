const { Event } = require("../../Hewo");
const UserLeveling = require("../../schemas/users/UserLeveling");

module.exports = class extends Event {
    async run(message, user, config, reward) {
        const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: user.id }) || new UserLeveling({ guildId: message.guild.id, userId: user.id }).save().then(() => {})
        if(config.type == 1) {
            const sortedRewards = config.rewards.sort((a, b) => parseInt(b.level) - parseInt(a.level));
            if(reward.level <= User.level) {
                if(config.removeWhenLoseXP) {
                    for(const prevReward of sortedRewards.filter((r) => r.level > User.level)) {
                        for (const role of prevReward.roles) {
                            const RoleToRemove = await message.guild.roles.cache.get(role);
                            if (user.roles.cache.find(r => r.id === RoleToRemove.id)) {
                                await user.roles.remove(RoleToRemove);
                            }
                        }
                    }
                }
                for(const Reward of sortedRewards.filter((r) => r.level <= User.level)) {
                    for (const role of Reward.roles) {
                        const RoleToAdd = await message.guild.roles.cache.get(role);
                        if (!user.roles.cache.find(r => r.id === RoleToAdd.id)) {
                            await user.roles.add(RoleToAdd);
                        }
                    }
                }
            } else if(reward.level > User.level) {
                if(config.removeWhenLoseXP) {
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
        } else {
            const sortedRewards = config.rewards.sort((a, b) => parseInt(b.level) - parseInt(a.level));
            if(config.removeWhenLoseXP) {
                for(const prevReward of sortedRewards.filter((r) => r.level !== reward.level)) {
                    for (const role of prevReward.roles) {
                        const RoleToRemove = await message.guild.roles.cache.get(role);
                        if (user.roles.cache.find(r => r.id === RoleToRemove.id)) {
                            await user.roles.remove(RoleToRemove);
                        }
                    }
                }
                for (const role of reward.roles) {
                    const RoleToRemove = await message.guild.roles.cache.get(role);
                    if (!user.roles.cache.find(r => r.id === RoleToRemove.id)) {
                        await user.roles.add(RoleToRemove);
                    }
                }
            } else {
                let highestReward = 0
                for(const role of user.roles.cache.map((r) => r)) {
                    for(const Reward of sortedRewards) {
                        if(Reward.roles.includes(role.id)) highestReward = parseInt(Reward.level)
                        break
                    }
                }
                if(!(highestReward > reward.level)) {
                    for(const prevReward of sortedRewards.filter((r) => parseInt(r.level) !== reward.level)) {
                        for (const role of prevReward.roles) {
                            const RoleToRemove = await message.guild.roles.cache.get(role);
                            if (user.roles.cache.find(r => r.id === RoleToRemove.id)) {
                                await user.roles.remove(RoleToRemove);
                            }
                        }
                    }
                    for (const role of reward.roles) {
                        const RoleToRemove = await message.guild.roles.cache.get(role);
                        if (!user.roles.cache.find(r => r.id === RoleToRemove.id)) {
                            await user.roles.add(RoleToRemove);
                        }
                    }
                } else {
                    for(const prevReward of sortedRewards.filter((r) => parseInt(r.level) !== highestReward)) {
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
    }
}