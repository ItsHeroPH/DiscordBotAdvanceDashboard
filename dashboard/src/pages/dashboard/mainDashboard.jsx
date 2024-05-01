import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { lazy, useState } from "react";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const NavigationBar = lazy(() => import('../../components/dashboard/NavigationBar'))
const DashboardStats = lazy(() => import('../../components/dashboard/dashboardStats'))

export default function MainDashboard() {
    const { bot, user, guild, guilds, guildConfig } = useLoaderData()
    if(user == null) return location.assign("/")
    if(guild == null) return location.assign("/")
    if(guildConfig == null) return location.assign("/dashboard")
    
    const [openSideBar, setOpenSideBar] = useState(false)
    
    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen bg-stone-800 flex flex-row grow fixed">
                <SideBar bot={bot} guild={guild} guilds={guilds} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
                <div className="w-full lg:w-[calc(100vh - 300px)] h-screen">
                    <NavigationBar bot={bot} user={user} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
                    <div className={`w-full h-full transition-all duration-300 ${openSideBar ? "blur-md" : "blur-0" } lg:blur-0 overflow-y-scroll no-scrollbar`}>
                        <div className="p-10 my-10">
                            <h1 className="text-4xl text-white font-bold">Dashboard</h1>
                            <p className="text-lg text-gray-600 font-medium">Welcome to the dashboard! Here you can custimize the bot configuration on each plugins</p>
                            <DashboardStats guild={guild} guildConfig={guildConfig}/>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}