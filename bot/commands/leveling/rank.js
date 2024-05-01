
const { createCanvas, Image, loadImage } = require("canvas");
const { Command } = require("../../Hewo");
const Leveling = require("../../schemas/settings/Leveling");
const UserLeveling = require("../../schemas/users/UserLeveling");
const Request = require("node-superfetch");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "rank",
            description: "Get your rank",
            arguments: [
                {
                    name: "",
                    description: "Get your rank"
                },
                {
                    name: "(user)",
                    description: "Get the user's rank"
                }
            ],
            category: "leveling"
        })
    }
    async run(message, args) {
        const config = await Leveling.findOne({ guildId: message.guild.id }) || new Leveling({ guildId: message.guild.id }).save().then(() => {})
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(user && !user.bot) {
            const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: user.id }) || new UserLeveling({ guildId: message.guild.id, userId: user.id }).save().then(() => {})
            const users = await UserLeveling.find({ guildId: message.guild.id }).sort({ level: -1 })
            let i = 0
            users.forEach(async(u) => {
                i++
                if(User.userId == u.userId) {
                    message.channel.sendTyping()
                    await drawCard(config.card, user, u, i).then((card) => {
                        message.channel.send({ files: [card]})
                    })
                }
            })
            
        } else {
            const User = await UserLeveling.findOne({ guildId: message.guild.id, userId: message.author.id }) || new UserLeveling({ guildId: message.guild.id, userId: message.author.id }).save()
            const users = await UserLeveling.find({ guildId: message.guild.id }).sort({ level: -1 })
            let i = 0
            users.forEach(async(u) => {
                i++
                if(User.userId === u.userId) {
                    message.channel.sendTyping()
                    const card = await drawCard(config.card, message.member, u, i)
                    message.channel.send({ files: [card]})
                }
            })
            
        }
    }
}

async function drawCard(card, user, leveling, Rank) {
    const canvas = createCanvas(467, 141)
    const ctx = canvas.getContext("2d")
    const progressbarWidth = Math.floor(279 * (leveling.xp/(Math.pow((leveling.level + 1), 2) * 16)))
    ctx.clearRect(0, 0, 467, 141)
    ctx.save()
    if(card.background.length > 1) {
        const bg = await Request.get(card.background)
        const background = await loadImage(bg.body)
        ctx.drawImage(background, 0, 0, 467, 141)
    }
    ctx.fillStyle = card.color.overlay
    ctx.globalAlpha = card.overlay
    ctx.fillRect(17, 10, 433, 121)
    ctx.globalAlpha = 1

    const avatar = await loadImage(user.user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.user.avatar}.png`: "https://cdn.discordapp.com/embed/avatars/2.png")
    ctx.beginPath()
    ctx.arc(84.5, 70.5, 44.5, 0, 2 * Math.PI)
    ctx.fillStyle = card.color.avatar
    ctx.fill()
    ctx.beginPath()
    ctx.arc(85, 71.5, 39.5, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, 46, 32, 79, 79)
    ctx.restore()
    if(user.presence?.status == "online") {
        ctx.fillStyle = "#2DFD6E"
    } else if(user.presence?.status == "idle") {
        ctx.fillStyle = "#D09900"
    } else if(user.presence?.status == "dnd") {
        ctx.fillStyle = "#9E0001"
    } else {
        ctx.fillStyle = "#656565"
    }
    ctx.beginPath()
    ctx.arc(117, 98, 12, 0, 2 * Math.PI)
    ctx.fill()
    ctx.strokeStyle = card.color.avatar
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillStyle = "#3B3B3B"
    ctx.beginPath()
    ctx.roundRect(138, 90, 279, 25, 12.5)
    ctx.fill()
    ctx.fillStyle = card.color.progressbar
    if(progressbarWidth > 10) {
        ctx.fillStyle = card.color.progressbar
        ctx.beginPath()
        ctx.roundRect(138, 90, progressbarWidth, 25, 12.5)
        ctx.closePath()
        ctx.fill()
    }

    ctx.fillStyle = card.color.username
    ctx.font = "bold 20px Verdana"
    ctx.fillText(user.user.username, 145, 83)

    ctx.fillStyle = card.color.text
    ctx.font = "bold 13px Verdana"
    const xp = ctx.measureText(`${leveling.xp}`)
    const totalXP = ctx.measureText(`/ ${(Math.pow((leveling.level + 1), 2) * 16)} XP`)
    ctx.fillText(`${leveling.xp}`, ((420 - totalXP.width) - 6) - xp.width, 83)
    ctx.fillStyle = "#CACACA"
    ctx.fillText(`/ ${(Math.pow((leveling.level + 1), 2) * 16)} XP`, 420 - totalXP.width, 83)

    ctx.fillStyle = card.color.text
    const rankText = ctx.measureText("Rank")
    const rank = ctx.measureText(`#${Rank}`)
    const levelText = ctx.measureText("Level")
    const level = ctx.measureText(`#${leveling.level}`)
    ctx.font = "20px Arial"
    ctx.fillText("Rank", ((((((420 - level.width) - 20) - levelText.width) - rank.width) - 20) - rankText.width - 20), 42)
    ctx.font = "bold 27px Arial"
    ctx.fillText(`#${Rank}`, ((((420 - level.width) - 20) - levelText.width) - rank.width - 20), 42)

    ctx.fillStyle = card.color.progressbar
    ctx.font = "20px Arial"
    ctx.fillText("Level", (((420 - level.width) - 20) - levelText.width), 42)
    ctx.font = "bold 27px Arial"
    ctx.fillText(`#${leveling.level}`, (420 - level.width), 42)
    return canvas.toBuffer()
}