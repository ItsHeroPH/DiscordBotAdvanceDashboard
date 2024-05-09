import { Suspense, lazy, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import pluginList from "../../utils/pluginList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const Navbar = lazy(() => import('../../components/dashboard/Navbar'))

export default function MainDashboard() {
    const { bot, user, guild } = useLoaderData()

    if(!user) return location.assign("/") 

    const [sidebar, setSidebar] = useState(false)
    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen relative flex">
                <SideBar bot={bot} guild={guild} path="/" sidebar={sidebar} setSidebar={setSidebar}/>
                <div className="w-full h-full overflow-y-scroll no-scrollbar bg-neutral-800">
                    <Navbar bot={bot} user={user} setSidebar={setSidebar}/>
                    <div className={`w-full h-full p-10 transition-all duration-200 ${sidebar ? "blur-sm": "blur-none"} lg:blur-none`}>
                        <div className="w-full flex flex-row gap-2 flex-wrap">
                            {pluginList.map((plugin, i) => (
                                <Suspense key={i} fallback={
                                    <div className="w-[400px] h-[150px] bg-stone-900 rounded-md border-2 border-black drop-shadow-lg"/>
                                }>
                                    <div className="min-w-[230px] max-w-[400px] h-[150px] bg-stone-900 border-2 border-black drop-shadow-lg rounded-md p-5 flex flex-col justify-between cursor-pointer" onClick={() => location.assign(plugin.url.replace(/{guildId}/g, guild.id))}>
                                        <div className="flex gap-2">
                                            <FontAwesomeIcon className="font-black text-white text-5xl" icon={plugin.icon} />
                                            <div className="flex flex-col gap-1">
                                                <h1 className="font-bold text-gray-400 text-xl">{plugin.name}</h1>
                                                <p className="font-medium text-gray-600 text-md">{plugin.description}</p>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon className="self-end font-black text-gray-300 text-2xl" icon={faArrowRight}/>
                                    </div>
                                </Suspense>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}