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

export default async function homeLoader() {
    const fetchBot = fetchBotData()
    const fetchUser = fetchUserData()

    const [bot, user] = await Promise.all([fetchBot, fetchUser])

    return { bot: bot, user: user }
}