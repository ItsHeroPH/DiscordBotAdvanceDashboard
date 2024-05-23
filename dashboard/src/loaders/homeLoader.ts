import { fetchBot } from "../utils/discord/Bot";
import { fetchUser } from "../utils/discord/User";

export async function homeLoader() {
    const botFetchPromise = fetchBot()
    const userFetchPromise = fetchUser()

    const [bot, user] = await Promise.all([botFetchPromise, userFetchPromise])
    
    return { bot: bot, user: user }
}