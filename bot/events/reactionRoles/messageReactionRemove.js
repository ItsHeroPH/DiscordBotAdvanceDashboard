const { Event } = require("../../Hewo");
const ReactionRoles = require("../../schemas/settings/ReactionRoles");

module.exports = class extends Event {
    async run(messageReaction, user) {
        const message = messageReaction.message
        const member = await message.guild.members.cache.get(user.id)
        const config = await ReactionRoles.findOne({ messageId: message.id })
        if(config) {
            if(user.bot) return;
            for(const reaction of config.reactions) {
                if(reaction.emoji == messageReaction.emoji.name) {
                    if(config.type == 1) {
                        for(const role of reaction.roles) {
                            const roleToRemove = await message.guild.roles.cache.find((r) => r.id == role)
                            if(member.roles.cache.find((r) => r.id === roleToRemove.id )) {
                                await member.roles.remove(roleToRemove)
                            }
                        }
                        break;
                    } else if(config.type == 2) {
                        for(const role of reaction.roles) {
                            const roleToRemove = await message.guild.roles.cache.find((r) => r.id == role)
                            if(member.roles.cache.find((r) => r.id === roleToRemove.id )) {
                                await member.roles.remove(roleToRemove)
                            }
                        }
                        break;
                    } else if(config.type == 5) {
                        for(const role of reaction.roles) {
                            const roleToAdd = await message.guild.roles.cache.find((r) => r.id == role)
                            if(!member.roles.cache.find((r) => r.id === roleToAdd.id )) {
                                await member.roles.add(roleToAdd)
                            }
                        }
                        break;
                    } 
                }
            }
        }
    }
}