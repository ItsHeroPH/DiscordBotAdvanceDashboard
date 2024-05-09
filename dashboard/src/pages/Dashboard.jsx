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

    if(!user) return location.assign("/") 

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
                <div className="min-w-fit max-w-[830px] px-4 py-3 mx-auto my-10 flex flex-col gap-6 justify-center">
                    <div className="flex gap-4 items-center">
                        <img className="w-[82px] h-[82px] rounded-full ring-8 ring-zinc-700" src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"}/>
                        <div className="flex flex-col">
                            <h1 className="font-black text-white text-3xl">{user.global_name}</h1>
                            <p className="font-bold text-gray-600 text-xl">@{user.username}</p>
                        </div>
                    </div>
                    <div className="w-full px-3 py-4 bg-zinc-900 rounded-lg">
                        <h1 className="font-black text-white text-2xl mt-5">Select A Server</h1>
                        <div className="w-full flex flex-row flex-wrap gap-2 my-5">
                            <div className="min-w-fit px-3 py-2 bg-zinc-800 rounded-md flex justify-between items-center">
                                <input className="outline-0 bg-transparent font-bold text-white text-lg w-full" placeholder="Search Server" onChange={(e) => setFilter(e.target.value)}/>
                                <FontAwesomeIcon className="font-black text-white text-xl" icon={faSearch}/>
                            </div>
                            <div className="relative w-[80px] z-10">
                                <div className="w-full px-3 py-2 bg-zinc-800 rounded-md flex justify-between items-center cursor-pointer" onClick={() => setSelectSort((p) => !p)}>
                                    <h1 className="font-medium text-white text-lg">{sort.toLocaleUpperCase()}</h1>
                                    <FontAwesomeIcon className={`font-black text-gray-600 text-xl transition-all duration-100 ${selectSort ? "rotate-180" : "rotate-0"}`} icon={faCaretDown}/>
                                </div>
                                <div className={`w-full rounded-md bg-zinc-800 shadow-xl top-0 absolute transition-all duration-100 ${selectSort ? "opacity-100 translate-y-12 pointer-events-auto" : "opacity-0 translate-y-0 pointer-events-none"}`}>
                                    <div className="w-full px-3 py-2 cursor-pointer hover:bg-zinc-900/40 font-medium text-white text-lg" onClick={() => {
                                        setSort("a-z")
                                        setSelectSort(false)
                                    }}>A-Z</div>
                                    <div className="w-full px-3 py-2 cursor-pointer hover:bg-zinc-900/40 font-medium text-white text-lg" onClick={() => {
                                        setSort("z-a")
                                        setSelectSort(false)
                                    }}>Z-A</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            { filteredGuilds.sort((a, b) => {
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
                                <Suspense fallback={<LoadingGuildCard/>} key={guild.id}>
                                    <GuildCards guild={guild} bot={bot} botGuilds={botGuilds}/>
                                </Suspense>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

function LoadingGuildCard() {
    return (
        <div className="min-w-[125px] max-w-[150px] aspect-square bg-zinc-800 rounded-md transition-all duration-100 hover:-translate-y-3 hover:shadow-xl relative">
            <div className="w-full h-1/2 rounded-t-md overflow-hidden">
                <div className="w-full h-full bg-neutral-700 blur-md"></div>
            </div>
            <div className="w-full h-1/2 rounded-t-md">
                <div className="w-[48px] h-[48px] rounded-full border-4 border-zinc-800 bg-neutral-900 absolute translate-x-2 translate-y-[-50%] overflow-hidden">
                </div>
                <div className="flex flex-col gap-1 py-2 px-2">
                    <div className="w-[25px] h-[25px] rounded-md bg-zinc-900 self-end">
                    </div>
                    <div className="w-full px-2 py-1 rounded-lg bg-zinc-900"></div>
                </div>
            </div>
        </div>
    )
}