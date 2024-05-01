import { API_URL } from "../../utils/constants";
import axios from "axios";

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
    const res = await axios.get(`${API_URL}/guild/${guildID}/config/leveling`, { withCredentials: true })
    return res.data.config
}
const fetchGuildRoles = async(guildID) => {
    const res = await axios.get(`${API_URL}/guild/${guildID}/roles`, { withCredentials: true })
    return res.data.roles
}
const fetchGuildChannels = async(guildID) => {
    const res = await axios.get(`${API_URL}/guild/${guildID}/channels`, { withCredentials: true })
    return res.data.channels
}

export const mainLevelingLoader = async({ params }) => {
    const BotPromise = fetchBot()
    const UserPromise = fetchUser()
    const GuildPromise = fetchGuild(params.guildID)
    const BotGuildPromise = fetchBotGuilds()
    const UserGuildPromise = fetchUserGuilds()
    const GuildConfigPromise = fetchGuildConfig(params.guildID)
    const GuildRolesPromise = fetchGuildRoles(params.guildID)
    const GuildChannelsPromise = fetchGuildChannels(params.guildID)
    const [bot, user, guild, botGuilds, userGuilds, guildConfig, roles, channels] = await Promise.all([BotPromise, UserPromise, GuildPromise, BotGuildPromise, UserGuildPromise, GuildConfigPromise, GuildRolesPromise, GuildChannelsPromise])

    const guilds = userGuilds ? userGuilds.filter(g => botGuilds.find((g1) => g1.id == g.id)) : null
    return { bot: bot, user: user.user, guild: guild, guilds: guilds, guildConfig: guildConfig, roles: roles, channels: channels }
}