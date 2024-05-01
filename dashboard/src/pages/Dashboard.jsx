import NavigationBar from "../components/NavigationBar";
import { PermissionFlags } from "../utils/constants";
import { useLoaderData } from "react-router-dom";
import { useState, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const GuildCards = lazy(() => import('../components/GuildCards'))

export default function Dashboard() {
    const { bot, user, botGuilds, userGuilds } = useLoaderData()
    if(user == null) return location.assign("/")
    
    const guilds = userGuilds.filter((guild) => {
        if((guild.permissions_new & PermissionFlags.ADMINISTRATOR) == PermissionFlags.ADMINISTRATOR || (guild.permissions_new & PermissionFlags.MANAGE_GUILD) == PermissionFlags.MANAGE_GUILD) return guild
    })
    
    const [searchGuild, setSearchGuild] = useState("")
    const [sortGuildDropMenu, setSortGuildDropMenu] = useState(false)
    const [sortGuild, setSortGuild] = useState("a-z")

    const filteredGuilds = guilds.filter((guild) => {
        if(guild.name.toLocaleLowerCase().includes(searchGuild.toLocaleLowerCase())) return guild
    })
    
    return(
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <NavigationBar bot={bot} user={user}/>
            <div className="min-w-full max-w-screen h-full bg-neutral-800 overflow-x-hidden fixed overflow-y-scroll no-scrollbar">
                <div className="w-[70%] sm:w-[80%] md:w-[69%] lg:w-[60%] xl:w-[75%] mx-auto py-11">
                    <div className="flex flex-col">
                        <div className="text-center text-3xl text-white font-black">Select A Server</div>
                        <div className="flex flex-row flex-wrap gap-2 my-8 items-center justify-center lg:justify-start">
                            <div className="group">
                                <div className="w-[170px] h-[35px] bg-stone-900 rounded-lg border-b-2 border-gray-600 cursor-text items-center flex flex-row group-focus-within:border-sky-600">
                                    <i className="relative pl-2 text-gray-600 font-black group-focus-within:text-sky-600 fa-solid fa-magnifying-glass"></i>
                                    <input className="relative w-full h-full px-2 py-1 bg-transparent focus:outline-none text-white font-bold placeholder:text-gray-600 focus:text-sky-600 focus:placeholder:text-sky-600" placeholder="Search a Server" onChange={(e) => setSearchGuild(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <h1 className="text-lg text-white font-bold">Sort by:</h1>
                                <div>
                                    <div className="w-[80px] h-[35px] bg-stone-900 rounded-lg flex flex-row items-center cursor-pointer z-10" onClick={() => setSortGuildDropMenu((prev) => !prev)}>
                                        <h1 className="px-4 py-1.5 text-gray-300 font-medium">{sortGuild.toLocaleUpperCase()}</h1>
                                        <i className={`text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${sortGuildDropMenu ? "rotate-0" : "rotate-180"}`}></i>
                                    </div>
                                    <div className={`w-[80px] bg-stone-900 rounded-lg flex flex-col gap-1 px-2 py-2 absolute mt-1 transition-all duration-300 ${sortGuildDropMenu ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-[-10] opacity-0 pointer-events-none"}`}>
                                        <div className="px-1.5 py-1 rounded-md text-gray-300 font-medium hover:bg-slate-400/25 hover:text-sky-400 cursor-pointer" onClick={async() => {
                                            setSortGuild("a-z") 
                                            setSortGuildDropMenu(false)
                                        }}>A-Z</div>
                                        <div className="px-1.5 py-1 rounded-md text-gray-300 font-medium hover:bg-slate-400/25 hover:text-sky-400 cursor-pointer" onClick={async() => {
                                            setSortGuild("z-a")
                                            setSortGuildDropMenu(false)
                                        }}>Z-A</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row flex-wrap grow gap-6 my-20">
                            {filteredGuilds.sort((a, b) => {
                                if(a.name && b.name) {
                                    if(sortGuild.toLocaleLowerCase() === "a-z") {
                                        if(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ) {
                                            return 1
                                        } else if(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ) {
                                            return -1
                                        } else {
                                            return 0
                                        }
                                    } else if(sortGuild.toLocaleLowerCase() === "z-a") {
                                        if(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ) {
                                            return -1
                                        } else if(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ) {
                                            return 1
                                        } else {
                                            return 0
                                        }
                                    }
                                }
                            }).map((guild) => (
                                <GuildCards key={guild.id} guild={guild} bot={bot} botGuilds={botGuilds}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}