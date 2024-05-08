import axios from "axios";
import { API_URL } from "../../utils/constants";

const fetchBot = async() => {
    const res = await axios.get(`${API_URL}/user/@bot`)
    return res.data
}

const fetchUser = async() => {
    const res = await axios.get(`${API_URL}/user/@user`, { withCredentials: true })
    return res.data
}

const fetchGuild = async(guildID) => {
    const res = await axios.get(`${API_URL}/guild/${guildID}`, { withCredentials: true })
    return res.data.guild
}

const fetchUserGuilds = async() => {
    const res = await axios.get(`${API_URL}/user/@user/guilds`, { withCredentials: true })
    return res.data.guilds
}

const fetchBotGuilds = async() => {
    const res = await axios.get(`${API_URL}/user/@bot/guilds`, { withCredentials: true })
    return res.data.guilds
}
const fetchGuildConfig = async(guildID) => {
    const res = await axios.get(`${API_URL}/guild/${guildID}/config`, { withCredentials: true })
    return res.data.config
}

export const mainDashboardLoader = async({ params }) => {
    const BotPromise = fetchBot()
    const UserPromise = fetchUser()
    const GuildPromise = fetchGuild(params.guildId)
    const BotGuildPromise = fetchBotGuilds()
    const UserGuildPromise = fetchUserGuilds()
    const GuildConfigPromise = fetchGuildConfig(params.guildId)
    const [bot, user, guild, botGuilds, userGuilds, guildConfig] = await Promise.all([BotPromise, UserPromise, GuildPromise, BotGuildPromise, UserGuildPromise, GuildConfigPromise])

    const guilds = userGuilds ? userGuilds.filter(g => botGuilds.find((g1) => g1.id == g.id)) : null
    return { bot: bot, user: user.user, guild: guild, guilds: guilds, guildConfig: guildConfig }
}