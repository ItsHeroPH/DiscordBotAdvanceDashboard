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

export const mainDashboardLoader = async({ params }) => {
    const BotPromise = fetchBot()
    const UserPromise = fetchUser()
    const GuildPromise = fetchGuild(params.guildId)
    const [bot, user, guild] = await Promise.all([BotPromise, UserPromise, GuildPromise])

    return { bot: bot, user: user.user, guild: guild }
}