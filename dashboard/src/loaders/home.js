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

export const homeLoader = async() => {
    const BotPromise = fetchBot()
    const UserPromise = fetchUser()
    const [bot, user] = await Promise.all([BotPromise, UserPromise])
    return { bot: bot, user: user.user }
}