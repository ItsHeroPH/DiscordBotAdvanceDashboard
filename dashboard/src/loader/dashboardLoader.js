import axios from "axios";
import { API_URL } from "../utils/constants";

async function fetchBotData() {
    const { data } = await axios.get(`${API_URL}/user/@bot`)

    return data
}

async function fetchUserData() {
    const { data } = await axios.get(`${API_URL}/user/@user`, { withCredentials: true })

    return data.user
}

async function fetchUserGuildsData() {
    const { data } = await axios.get(`${API_URL}/user/@user/guilds`, { withCredentials: true })

    return data.guilds
}

async function fetchBotGuildsData() {
    const { data } = await axios.get(`${API_URL}/user/@bot/guilds`)

    return data.guilds
}

export default async function dashboardLoader() {
    const fetchBot = fetchBotData()
    const fetchUser = fetchUserData()
    const fetchUserGuilds = fetchUserGuildsData()
    const fetchBotGuilds = fetchBotGuildsData()

    const [bot, user, guilds, botGuilds] = await Promise.all([fetchBot, fetchUser, fetchUserGuilds, fetchBotGuilds])

    return { bot: bot, user: user, userGuilds: guilds, botGuilds: botGuilds }
}