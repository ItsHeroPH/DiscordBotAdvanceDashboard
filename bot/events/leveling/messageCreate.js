const { parse } = require("url");
const { Event } = require("../../Hewo");
const Leveling = require("../../schemas/settings/Leveling");
const UserLeveling = require("../../schemas/users/UserLeveling");

module.exports = class extends Event {
    async run(message) {
        const config = await Leveling.findOne({ guildId: message.guild.id }) || new Leveling({ guildId: message.guild.id }).save().then(() => {})
        const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: message.member.id }) || new UserLeveling({ guildId: message.guild.id, userId: message.member.id }).save().then(() => {})
        if(message.author.bot || !config.enable) return;

        const xp = Math.max(Math.floor((Math.random() * (config.xp.maximum - config.xp.minimum) + config.xp.minimum) * config.xp.multiplier), 0)
        if(config.noXP_Channels.type == 1) {
            if(config.noXP_Channels.channels.includes(message.channel.id)) {
                if(config.noXP_Roles.type == 1) {
                    if(config.noXP_Roles.roles.length == 0) {
                        this.client.emit("levelAddXP", message, message.member, xp)
                    } else {
                        for(const role of config.noXP_Roles.roles) {
                            if(!message.member.roles.cache.find((r) => r.id == role)) {
                                this.client.emit("levelAddXP", message, message.member, xp)
                                break;
                            }
                        }
                    }
                } else {
                    let hasRole = false
                    for(const role of config.noXP_Roles.roles) {
                        if(message.member.roles.cache.find((r) => r.id == role)) {
                            hasRole = true
                            break;
                        }
                    }
                    if(!hasRole) this.client.emit("levelAddXP", message, message.member, xp)
                }
            }
        } else {
            if(!config.noXP_Channels.channels.includes(message.channel.id)) {
                if(config.noXP_Roles.type == 1) {
                    if(config.noXP_Roles.roles.length == 0) {
                        this.client.emit("levelAddXP", message, message.member, xp)
                    } else {
                        for(const role of config.noXP_Roles.roles) {
                            if(!message.member.roles.cache.find((r) => r.id == role)) {
                                this.client.emit("levelAddXP", message, message.member, xp)
                                break;
                            }
                        }
                    }
                    
                } else {
                    let hasRole = false
                    for(const role of config.noXP_Roles.roles) {
                        if(message.member.roles.cache.find((r) => r.id == role)) {
                            hasRole = true
                            break;
                        }
                    }
                    if(!hasRole) this.client.emit("levelAddXP", message, message.member, xp)
                }
            }
        }
        let REWARD = null
        for(const reward of config.rewards.rewards.sort((a, b) => parseInt(b.level) - parseInt(a.level))) {
            if(parseInt(reward.level) <= User.level) {
                REWARD = reward
                break;
            } 
        }
        if(REWARD) {
            this.client.emit("levelReward", message, message.member, config.rewards, REWARD)
        } else {
            this.client.emit("levelNoReward", message, message.member, config.rewards)
        }
    }
}