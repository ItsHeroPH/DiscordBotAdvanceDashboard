import { useState } from "react"

export default function SideBar({ bot, guild, guilds, openSideBar, setOpenSideBar }) {
    const [selectGuildDropMenu, setSelectGuildDropMenu] = useState(false)
    return(
        <div className={`w-[300px] h-full bg-stone-900 absolute drop-shadow-2xl transition-all duration-300 ${openSideBar ? "translate-x-0 pointer-events-auto" : "translate-x-[-100%] pointer-events-none"} lg:pointer-events-auto lg:drop-shadow-none lg:translate-x-0 lg:relative z-20`}>
            <div className="w-full flex-1 overflow-y-auto no-scrollbar">
                <div className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div className="hover:bg-slate-500/25 w-[40px] h-[40px] rounded-lg text-gray-400 font-bold px-2 py-1 cursor-pointer lg:hidden" onClick={() => setOpenSideBar(false)}><i className="text-2xl rotate-180 fa-solid fa-arrow-right-to-bracket"></i></div>
                        <div className="flex flex-row gap-3 rounded-lg py-1 px-1.5 items-center cursor-pointer hover:bg-slate-500/25" onClick={() => location.assign(`/dashboard`)}>
                            <img className="w-[40px] h-[40px] rounded-full" width={20} height={20} src={bot.displayAvatarURL}/>
                            <h1 className="text-3xl text-white font-black">{bot.username}</h1>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="w-[260px] h-[50px] bg-neutral-950 rounded-lg my-4 cursor-pointer" onClick={() => setSelectGuildDropMenu((prev) => !prev)}>
                            <div className="p-2.5 flex flex-row justify-between">
                                <div className="flex flex-row gap-3 items-center">
                                    { guild.icon ? (
                                        <img className="w-[30px] h-[30px] rounded-full border-2" width={20} height={20} src={guild.iconURL}></img>
                                    ) : (
                                        <div className="w-[30px] h-[30px] rounded-full border-2 bg-neutral-800 text-center">
                                            <h1 className="text-md text-gray-400 font-black">{guild.name.charAt(0,1).toLocaleUpperCase()}</h1>
                                        </div>
                                    )}
                                    <h1 className="text-xl text-white font-medium">{guild.name.length > 13 ? `${guild.name.slice(0, 13)}...`: guild.name}</h1>
                                </div>
                                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${selectGuildDropMenu ? "rotate-0" : "rotate-180"}`}></i>
                            </div>
                        </div>
                        <div className={`w-[260px] flex flex-col gap-2 p-2 rounded-lg bg-neutral-950 absolute transition-all duration-300 ${selectGuildDropMenu ? "translate-y-20 opacity-100 pointer-events-auto" : "translate-y-5 opacity-0 pointer-events-none"}`}>
                            { guilds.map((g) => (
                                <div className="px-2 py-1 rounded-md hover:bg-neutral-400/25 cursor-pointer flex flex-row gap-3 group" key={g.id} onClick={() => location.assign(`/dashboard/${g.id}`)}>
                                    { g.icon ? (
                                        <img className="w-[30px] h-[30px] rounded-full border-2 group-hover:border-sky-600" width={20} height={20} src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}`}></img>
                                    ) : (
                                        <div className="w-[30px] h-[30px] rounded-full border-2 group-hover:border-sky-600 bg-neutral-800 text-center">
                                            <h1 className="text-md text-gray-400 font-black">{g.name.charAt(0,1).toLocaleUpperCase()}</h1>
                                        </div>
                                    )}
                                    <h1 className="text-xl text-white font-medium group-hover:text-sky-600">{g.name.length > 13 ? `${g.name.slice(0, 13)}...`: g.name}</h1>
                                </div>
                            )) }
                            <div className="w-full h-[2px] rounded-xl bg-neutral-300/25"></div>
                            <div className="px-2 py-1 rounded-md hover:bg-neutral-400/25 cursor-pointer flex flex-row gap-3 items-center group">
                                <i className="fa-solid fa-circle-plus text-xl text-white font-bold group-hover:text-sky-600"></i>
                                <h1 className="text-xl text-white font-medium group-hover:text-sky-600" onClick={() => 
                                    window.open(`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&permissions=1122573558992449&scope=bot%20applications.commands`,
                                     "_blank",
                                     "width=500,height=900,location=no,resizable=no,menubar=no,toolbar=no")
                                }>Add a Server</h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-full my-1 px-2 py-2 rounded-lg cursor-pointer hover:bg-neutral-400/25 text-xl font-medium text-gray-500" onClick={() => location.assign(`/dashboard/${guild.id}`)}>Dashboard</div>
                    <div className="w-full my-1 px-2 py-2 rounded-lg cursor-pointer hover:bg-neutral-400/25 text-xl font-medium text-gray-500"onClick={() => location.assign(`/dashboard/${guild.id}/config`)}>Configuration</div>
                    <div className="w-full my-1 px-2 py-2 rounded-lg cursor-pointer hover:bg-neutral-400/25 text-xl font-medium text-gray-500"onClick={() => location.assign(`/dashboard/${guild.id}/commands`)}>Commands</div>
                    <div className="w-full my-1 px-2 py-2 rounded-lg cursor-pointer hover:bg-neutral-400/25 text-xl font-medium text-gray-500"onClick={() => location.assign(`/dashboard/${guild.id}/logs`)}>Logs</div>
                    <div className="font-black text-md text-white mx-2">Utility</div>
                    <div className="w-full my-1 px-2 py-2 rounded-lg cursor-pointer hover:bg-neutral-400/25 text-xl font-medium text-gray-500" onClick={() => location.assign(`/dashboard/${guild.id}/reactionroles`)}>Reaction Roles</div>
                    <div className="font-black text-md text-white mx-2">Fun & Engagement</div>
                    <div className="w-full my-1 px-2 py-2 rounded-lg cursor-pointer hover:bg-neutral-400/25 text-xl font-medium text-gray-500" onClick={() => location.assign(`/dashboard/${guild.id}/leveling`)}>Leveling</div>
                </div>
            </div>
        </div>
    )
}