import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const NavigationBar = lazy(() => import('../../components/dashboard/NavigationBar'))

export default function mainLogs() {
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
                            <h1 className="text-4xl text-white font-bold">Logs</h1>
                            <p className="text-lg text-gray-600 font-medium">Welcome to the logs! Here you can see the changes to the configurations of the bot</p>
                            <div className="w-full bg-neutral-900 rounded-lg p-5 flex flex-col gap-2 my-4">
                                {guildConfig.logs.length < 1 ? (
                                    <div className="flex flex-col">
                                        <h1 className="text-xl text-gray-400 font-bold text-center">There is no logs yet!</h1>
                                        <h1 className="text-md text-gray-600 font-medium text-center">Once the moderator begin change the configuration,<br></br>You can see the changes here</h1>
                                    </div>
                                ) : guildConfig.logs.sort((a, b) => {
                                    if(a.date && b.date) {
                                        if(a.date > b.date) {
                                            return -1
                                        } else {
                                            return 1
                                        }
                                        return 0
                                    }
                                }).map((log, i) => (
                                    <Logs log={log} key={i}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

function Logs({ log }) {
    const date = new Date(log.date)
    const [ref, inView] = useInView({
        threshold: 0
    })
    const [view, setView] = useState(false)
    useEffect(() => {
        if(inView) setView(true)
    }, [inView])
    return (
        <div className={`w-full bg-neutral-800 rounded-lg p-3 flex flex-row gap-2 transition-all ease-in duration-300 ${view ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} ref={ref}>
            <img className="w-[42px] h-[42px] rounded-full" src={log.user.icon}/>
            <div className="flex flex-col gap-0.1">
                <p className="font-medium text-gray-400"><span className="text-white font-bold">{log.user.username}</span> <span dangerouslySetInnerHTML={{__html: log.message.replaceAll("<>", `<span class="px-2 py-1 rounded-md bg-stone-900 text-red-400 font-light">`).replaceAll("</>", "</span>")}}></span></p>
                <p className="text-gray-500 text-sm">{`${date.toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}</p>
            </div>
        </div>
    )
}