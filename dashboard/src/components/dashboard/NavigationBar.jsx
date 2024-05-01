import { useState } from "react"
import { API_URL } from "../../utils/constants"

export default function NavigationBar({ bot, user, openSideBar, setOpenSideBar }) {
    const [userDropMenu, setUserDropMenu] = useState(false)
    return(
        <div className="w-full h-[80px] bg-stone-900">
            <div className="p-5 flex flex-row justify-between lg:justify-end items-center">
                <div className="hover:bg-slate-500/25 w-[40px] h-[40px] rounded-lg text-gray-400 font-bold px-2 py-1 cursor-pointer lg:hidden" onClick={() => setOpenSideBar(true)}><i className="text-2xl rotate-180 fa-solid fa-bars"></i></div>
                <div className="text-white text-3xl font-black lg:hidden">{bot.username}</div>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 rounded-lg py-2 px-1.5 items-center cursor-pointer hover:bg-slate-500/25" onClick={() => setUserDropMenu((prev) => !prev)}>
                        <img className="w-[32px] h-[32px] rounded-full" width={20} height={20} src={`${user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png" }`}/>
                        <h1 className="text-lg text-gray-500 font-bold"><i className={`fa-solid fa-angle-up transition-all duration-300 ${userDropMenu ? "rotate-0" : "rotate-180"}`}></i></h1>
                    </div>
                    <div className={`absolute w-[220px] bg-neutral-950 rounded-lg shadow-2xl translate-x-[-70%] transition-all duration-300  ${userDropMenu ? "translate-y-14 opacity-100 pointer-events-auto z-10" : "translate-y-0 opacity-0 pointer-events-none z-0"}`}>
                        <div className="flex flex-col gap-2 px-4 py-3">
                            <div className="text-sm text-white font-black">{user.username}</div>
                            <div className="text-md text-gray-500 font-medium px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-500/25" onClick={() => location.assign(`/dashboard`)}>My Servers</div>
                            <div className="w-full h-[3px] bg-gray-500/25 rounded-xl"/>
                            <div className="text-md text-gray-500 font-medium px-2 py-1.5 rounded-lg cursor-pointer hover:bg-slate-500/25 hover:text-red-600" onClick={() => location.assign(`${API_URL}/logout`)}>Logout</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}