import { API_URL } from "../utils/constants";
import { useState } from "react";

export default function NavigationBar({ bot, user }) {
    const [userDropMenu, setUserDropMenu] = useState(false)
    return(
        <div className="w-full h-[70px] bg-neutral-900 z-10">
            <div className="w-[75%] mx-auto py-1.5 flex justify-between items-center">
                <div className="flex flex-row gap-3 rounded-lg py-1 px-1.5 items-center cursor-pointer hover:bg-slate-500/25" onClick={() => location.assign(`/`)}>
                    <img className="w-[48px] h-[48px] rounded-full" width={20} height={20} src={bot.displayAvatarURL}/>
                    <h1 className="text-3xl text-white font-black hidden lg:block">{bot.username}</h1>
                </div>
                { user !== null ? (
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-2 rounded-lg py-2 px-1.5 items-center cursor-pointer hover:bg-slate-500/25" onClick={() => setUserDropMenu((prev) => !prev)}>
                            <img className="w-[32px] h-[32px] rounded-full" width={20} height={20} src={`${user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png" }`}/>
                            <h1 className="text-xl text-white font-black hidden lg:block">{user.global_name}</h1>
                            <h1 className="text-lg text-gray-500 font-bold"><i className={`fa-solid fa-angle-up transition-all duration-300 ${userDropMenu ? "rotate-0" : "rotate-180"}`}></i></h1>
                        </div>
                        <div className={`absolute w-[220px] bg-neutral-950 rounded-lg shadow-2xl translate-x-[-30%] transition-all duration-300  ${userDropMenu ? "translate-y-14 opacity-100 pointer-events-auto" : "translate-y-0 opacity-0 pointer-events-none"} z-10`}>
                            <div className="flex flex-col gap-2 px-4 py-3">
                                <div className="text-sm text-white font-black">{user.username}</div>
                                <div className="text-md text-gray-500 font-medium px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-500/25" onClick={() => location.assign(`/dashboard`)}>My Servers</div>
                                <div className="w-full h-[3px] bg-gray-500/25 rounded-xl"/>
                                <div className="text-md text-gray-500 font-medium px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-500/25 hover:text-red-600" onClick={() => location.assign(`${API_URL}/logout`)}>Logout</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row gap-3 rounded-lg py-1 px-1.5 items-center cursor-pointer hover:bg-slate-500/25" onClick={() => location.assign(`${API_URL}/login`)}>
                        <h1 className="text-3xl text-white font-bold"><i className="fa-solid fa-right-to-bracket"></i></h1>
                        <h1 className="text-2xl text-white font-black">Login</h1>
                    </div>
                ) }
            </div>
        </div>
    )
}