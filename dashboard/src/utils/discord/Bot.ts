import axios from "axios";
import { API_URL } from "../constants/constant";

export interface Bot {
    username: string,
    id: string,
    displayAvatarURL: string,
    tag: string,
    discriminator: string
    guilds: GuildBot[]
}

export interface GuildBot {
    name: string,
    id: string,
    icon: string,
    iconURL: string,
    ownerId: string,
    nameAcronym: string
}

export async function fetchBot() {
    const { data } = await axios.get(`${API_URL}/user/@bot`)
    let bot = data
    const guilds = await axios.get(`${API_URL}/user/@bot/guilds`)
    bot.guilds = guilds.data.guilds
    return bot as Bot
}