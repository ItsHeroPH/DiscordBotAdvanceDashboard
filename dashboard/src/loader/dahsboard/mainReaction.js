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

const fetchReactionRoles = async(guildID) => {
    const res = await axios.get(`${API_URL}/guild/${guildID}/config/reactionroles`, { withCredentials: true })
    return res.data.reactionroles
}
const fetchGuildRoles = async(guildID) => {
    const res = await axios.get(`${API_URL}/guild/${guildID}/roles`, { withCredentials: true })
    return res.data.roles
}
const fetchGuildChannels = async(guildID) => {
    const res = await axios.get(`${API_URL}/guild/${guildID}/channels`, { withCredentials: true })
    return res.data.channels
}


export const mainReactionLoader = async({ params }) => {
    const BotPromise = fetchBot()
    const UserPromise = fetchUser()
    const GuildPromise = fetchGuild(params.guildId)
    const ReactionRolesPromise = fetchReactionRoles(params.guildId)
    const GuildRolesPromise = fetchGuildRoles(params.guildId)
    const GuildChannelsPromise = fetchGuildChannels(params.guildId)
    const [bot, user, guild, reactionRoles, roles, channels] = await Promise.all([BotPromise, UserPromise, GuildPromise, ReactionRolesPromise, GuildRolesPromise, GuildChannelsPromise])

    return { bot: bot, user: user.user, guild: guild, reactionRoles: reactionRoles, roles: roles, channels: channels }
}