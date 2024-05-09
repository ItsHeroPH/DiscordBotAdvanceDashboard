import { faArrowRightToBracket, faBars, faCaretDown, faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, useState } from "react";

export default function NavBar({ bot, user, setSidebar }) {
    const [userMenu, setUserMenu] = useState(false)
    return (
        <div className="w-full p-5 bg-zinc-900 border-y-2 border-black flex items-center justify-between lg:justify-end sticky top-0 z-10">
            <FontAwesomeIcon className="p-2 border-2 border-gray-700 bg-zinc-800 rounded-md font-black text-white text-2xl cursor-pointer lg:hidden" onClick={() => setSidebar(true)} icon={faBars}/>
            <h1 className="font-black text-white text-3xl lg:hidden">{bot.username}</h1>
            <div className="relative">
                <div className="flex gap-2 cursor-pointer items-center" onClick={() => setUserMenu((p) => !p)}>
                    <Suspense fallback={<div className="w-[32px] h-[32px] rounded-full bg-zinc-600 animate-pulse"></div>}>
                        <img className="w-[32px] h-[32px] rounded-full" src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"}/>
                    </Suspense>
                    <FontAwesomeIcon className={`text-gray-500 text-2xl transition-all duration-200 ${userMenu ? "rotate-180" : "rotate-0"}`} icon={faCaretDown}/>
                </div>
                <div className={`w-[220px] h-fit bg-zinc-900 border-2 border-zinc-950 rounded-lg absolute right-0 top-0 flex flex-col transition-all duration-200 ${userMenu ? "opacity-100 translate-y-10 pointer-events-auto" : "opacity-0 translate-y-0 pointer-events-none"}`}>
                    <div className="w-full px-5 py-3 hover:bg-zinc-950/40 cursor-pointer" onClick={() => location.assign("/dashboard")}>
                        <h1 className="font-medium text-gray-300">
                            <FontAwesomeIcon className="font-bold text-gray-500 mr-2" icon={faServer}/> My Servers
                        </h1>
                    </div>
                    <div className="w-full px-5 py-3 hover:bg-zinc-950/40 cursor-pointer" onClick={() => location.assign(`${API_URL}/logout`)}>
                        <h1 className="font-medium text-gray-300">
                            <FontAwesomeIcon className="font-bold text-gray-500 mr-2" icon={faArrowRightToBracket}/> Logout
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}