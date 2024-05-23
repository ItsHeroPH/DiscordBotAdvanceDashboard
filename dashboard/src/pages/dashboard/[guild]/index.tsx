import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { Bot } from "../../../utils/discord/Bot";
import { User } from "../../../utils/discord/User";

interface loaderData {
    bot: Bot,
    user: User | null
}

export default function DashboardHome() {
    const { bot, user } = useLoaderData() as loaderData

    if(!user) location.assign("/")
    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
        </HelmetProvider>
    )
}