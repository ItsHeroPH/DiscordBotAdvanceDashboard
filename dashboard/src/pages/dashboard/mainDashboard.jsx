import { lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const Navbar = lazy(() => import('../../components/dashboard/Navbar'))

export default function MainDashboard() {
    const { bot, user, guild, guilds, guildConfig } = useLoaderData()
    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen relative flex">
                <SideBar bot={bot} guild={guild} path="/"/>
                <div className="w-full h-full">
                    <Navbar bot={bot} user={user}/>
                </div>
            </div>
        </HelmetProvider>
    )
}