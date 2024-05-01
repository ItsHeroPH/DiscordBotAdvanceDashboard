
export default async function drawLevelingCard(ctx, card, user) {
    const background = new Image()
    background.src = card.background
    background.onload = () => {
        ctx.clearRect(0, 0, 467, 141)
        ctx.save()
        ctx.drawImage(background, 0, 0, 467, 141)
        ctx.fillStyle = card.color.overlay
        ctx.globalAlpha = card.overlay
        ctx.fillRect(17, 10, 433, 121)
        ctx.globalAlpha = 1

        const avatar = new Image()
        avatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        avatar.onload = () => {
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
            ctx.fillStyle = "#2DFD6E"
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
            ctx.beginPath()
            ctx.roundRect(138, 90, 279 * (512/1024), 25, 12.5)
            ctx.closePath()
            ctx.fill()

            ctx.fillStyle = card.color.username
            ctx.font = "bold 20px Verdana"
            ctx.fillText(user.username, 145, 83)

            ctx.fillStyle = card.color.text
            ctx.font = "bold 13px Verdana"
            const xp = ctx.measureText("512")
            const totalXP = ctx.measureText("/ 1024 XP")
            ctx.fillText("512", ((420 - totalXP.width) - 6) - xp.width, 83)
            ctx.fillStyle = "#CACACA"
            ctx.fillText("/ 1024 XP", 420 - totalXP.width, 83)

            ctx.fillStyle = card.color.text
            const rankText = ctx.measureText("Rank")
            const rank = ctx.measureText("#1")
            ctx.font = "20px Arial"
            ctx.fillText("Rank", (((310 - rank.width) - 20) - rankText.width), 42)
            ctx.font = "bold 27px Arial"
            ctx.fillText("#1", (310 - rank.width), 42)

            ctx.fillStyle = card.color.progressbar
            const levelText = ctx.measureText("Level")
            const level = ctx.measureText("#8")
            ctx.font = "20px Arial"
            ctx.fillText("Level", (((420 - level.width) + 10) - levelText.width), 42)
            ctx.font = "bold 27px Arial"
            ctx.fillText("#7", (420 - level.width), 42)
        }
    }
    background.onerror = () => {
        ctx.clearRect(0, 0, 467, 141)
        ctx.save()
        ctx.fillStyle = card.color.overlay
        ctx.globalAlpha = card.overlay
        ctx.fillRect(17, 10, 433, 121)
        ctx.globalAlpha = 1

        const avatar = new Image()
        avatar.src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        avatar.onload = () => {
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
            ctx.fillStyle = "#2DFD6E"
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
            ctx.beginPath()
            ctx.roundRect(138, 90, 279 * (512/1024), 25, 12.5)
            ctx.closePath()
            ctx.fill()

            ctx.fillStyle = card.color.username
            ctx.font = "bold 20px Verdana"
            ctx.fillText(user.username, 145, 83)

            ctx.fillStyle = card.color.text
            ctx.font = "bold 13px Verdana"
            const xp = ctx.measureText("512")
            const totalXP = ctx.measureText("/ 1024 XP")
            ctx.fillText("512", ((420 - totalXP.width) - 6) - xp.width, 83)
            ctx.fillStyle = "#CACACA"
            ctx.fillText("/ 1024 XP", 420 - totalXP.width, 83)

            ctx.fillStyle = card.color.text
            const rankText = ctx.measureText("Rank")
            const rank = ctx.measureText("#1")
            ctx.font = "20px Arial"
            ctx.fillText("Rank", (((310 - rank.width) - 20) - rankText.width), 42)
            ctx.font = "bold 27px Arial"
            ctx.fillText("#1", (310 - rank.width), 42)

            ctx.fillStyle = card.color.progressbar
            const levelText = ctx.measureText("Level")
            const level = ctx.measureText("#8")
            ctx.font = "20px Arial"
            ctx.fillText("Level", (((420 - level.width) + 10) - levelText.width), 42)
            ctx.font = "bold 27px Arial"
            ctx.fillText("#7", (420 - level.width), 42)
        }
    }
}