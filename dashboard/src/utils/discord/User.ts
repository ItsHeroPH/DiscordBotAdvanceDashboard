import axios from "axios";
import { API_URL } from "../constants/constant";

export interface User {
    username: string,
    global_name: string,
    id: string,
    avatar: string,
    avatarURL: string,
    guilds: GuildUser[]
}

export interface GuildUser {
    name: string,
    icon: string | null,
    id: string,
    owner: boolean,
    permissions: number
    permissions_new: number
}

export async function fetchUser() {
    const { data } = await axios.get(`${API_URL}/user/@user`, { withCredentials: true })
    let user = data.user
    if(user) {
        user.avatarURL = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
    }
    return user as User 
}