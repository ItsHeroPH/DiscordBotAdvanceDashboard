import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Suspense, lazy, useMemo, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useLoaderData } from 'react-router'
import { PermissionFlags } from '../utils/constants'

const Navbar = lazy(() => import('../components/Navbar'))
const GuildCards = lazy(() => import('../components/GuildCards'))

export default function Dashboard() {
    const { bot, user, userGuilds, botGuilds } = useLoaderData()

    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState("a-z")
    const [selectSort, setSelectSort] = useState(false)

    const guilds = userGuilds.filter((guild) => {
        if((guild.permissions_new & PermissionFlags.ADMINISTRATOR) == PermissionFlags.ADMINISTRATOR || (guild.permissions_new & PermissionFlags.MANAGE_GUILD) == PermissionFlags.MANAGE_GUILD) return guild
    })

    const filteredGuilds = useMemo(() => guilds.filter((guild) => {
        if(guild.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) return guild
    }), [filter])
    return (
        <HelmetProvider>
            <Helmet>
                <title>The Best Multipurpose Discord Bot</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen bg-zinc-800 fixed overflow-y-scroll no-scrollbar">
                <Navbar bot={bot} user={user}/>
                <div className="py-4 px-3 flex flex-col justify-center items-center">
                    <h1 className="text-center font-bold text-3xl text-white my-4">Select A Server</h1>
                    <div className="w-full flex gap-2 justify-center">
                        <div className="min-w-fit w-[400px] h-[40px] px-3 py-1.5 rounded-md bg-zinc-900 relative flex items-center">
                            <input className="outline-none bg-transparent text-white text-xl w-full" placeholder="Search"/>
                            <FontAwesomeIcon className="text-xl text-white" icon={faSearch}/>
                        </div>
                       <div className="min-w-fit w-[100px] h-[40px] relative">
                            <div className="w-full h-full px-3 py-1.5 rounded-md bg-zinc-900 flex justify-between items-center cursor-pointer" onClick={() => setSelectSort((p) => !p)}>
                                <h1 className="text-white text-xl font-medium">{sort.toLocaleUpperCase()}</h1>
                                <FontAwesomeIcon className={`text-xl text-white transition-all duration-200 ${selectSort ? "rotate-180" : "rotate-0"}`} icon={faCaretDown}/>
                            </div>
                            <div className={`w-full rounded-md bg-zinc-900 border-2 border-zinc-950 flex flex-col absolute top-0 transition-all duration-200 ${selectSort ? "opacity-100 translate-y-11 pointer-events-auto" : "opacity-0 translate-y-0 pointer-events-none"}`}>
                                <div className="w-full px-3 py-1 font-medium text-white text-xl cursor-pointer hover:bg-zinc-950/40" onClick={() => {
                                    setSort("a-z")
                                    setSelectSort(false)
                                }}>A-Z</div>
                                <div className="w-full px-3 py-1 font-medium text-white text-xl cursor-pointer hover:bg-zinc-950/40" onClick={() => {
                                    setSort("z-a")
                                    setSelectSort(false)
                                }}>Z-A</div>
                            </div>
                       </div>
                    </div>
                    <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredGuilds.sort((a, b) => {
                            if(a.name && b.name) {
                                if(sort.toLocaleLowerCase() === "a-z") {
                                    if(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ) {
                                        return 1
                                    } else if(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ) {
                                        return -1
                                    } else {
                                        return 0
                                    }
                                } else if(sort.toLocaleLowerCase() === "z-a") {
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
                            <Suspense fallback={<LoadingGuildCard/>}>
                                <GuildCards key={guild.id} guild={guild} bot={bot} botGuilds={botGuilds}/>
                            </Suspense>
                        ))}
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

function LoadingGuildCard() {
    return (
        <div className="w-[250px] h-[200px] border-4 border-stone-900 rounded-2xl">
            <div className="w-full h-1/2 rounded-t-xl realtive overflow-hidden">
                <div className="w-full h-full bg-neutral-900 blur-md animate-pulse"></div>
            </div>
            <div className="w-full h-1/2 bg-stone-900 gap-2 rounded-b-xl relative flex flex-col px-4 py-2">
                <div className="w-[64px] h-[64px] rounded-full border-8 border-stone-900 bg-stone-900 absolute translate-y-[-60%] overflow-hidden">
                    <div className="w-full h-full bg-zinc-950 animate-pulse"></div>
                </div>
                <div className="flex flex-row ml-16 justify-between items-center group">
                    <div className="w-[140px] h-[20px] bg-gray-600 rounded-full animate-pulse"></div>                            
                </div>
                <div className="w-[110px] h-[33px] bottom-0 bg-sky-300/30 animate-pulse rounded-lg px-2 py-1 font-medium text-white self-end flex items-center gap-2 cursor-pointer">
                    <i className="animate-spin fa-solid fa-spinner"></i>
                    Loading...
                </div>
            </div>
        </div>
    )
}