import { API_URL } from "../utils/constants";
import axios from "axios";

const fetchBot = async() => {
    const res = await axios.get(`${API_URL}/user/@bot`)
    return res.data
}
const fetchUser = async() => {
    const res = await axios.get(`${API_URL}/user/@user`, { withCredentials: true })
    return res.data
}

const fetchUserGuilds = async() => {
    const res = await axios.get(`${API_URL}/user/@user/guilds`, { withCredentials: true })
    return res.data
}

const fetchBotGuilds = async() => {
    const res = await axios.get(`${API_URL}/user/@bot/guilds`, { withCredentials: true })
    return res.data
}

export const dashboardLoader = async() => {
    const BotPromise = fetchBot()
    const UserPromise = fetchUser()
    const BotGuildPromise = fetchBotGuilds()
    const UserGuildPromise = fetchUserGuilds()
    const [bot, user, botGuilds, userGuilds] = await Promise.all([BotPromise, UserPromise, BotGuildPromise, UserGuildPromise])
    return { bot: bot, user: user.user, botGuilds: botGuilds.guilds, userGuilds: userGuilds.guilds }
}