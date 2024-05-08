import { faArrowRightToBracket, faCaretDown, faServer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../utils/constants";
import { useState } from "react";

export default function Navbar({ bot, user }) {
    const [userMenu, setUserMenu] = useState(false)
    return(
        <div className="w-full px-6 py-4 bg-zinc-900 flex justify-between items-center">
            <div className="flex gap-2 cursor-pointer items-center" onClick={() => location.assign("/")}>
                <img className="w-[42px] h-[42px] rounded-full" src={bot.displayAvatarURL}/>
                <h1 className="font-black text-white text-3xl">{bot.username}</h1>
            </div>
            { user ? (
                <div className="relative">
                    <div className="flex gap-2 cursor-pointer items-center" onClick={() => setUserMenu((p) => !p)}>
                        <img className="w-[32px] h-[32px] rounded-full" src={user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"}/>
                        <h1 className="font-black text-white text-xl hidden sm:block">{user.global_name}</h1>
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
            ): (
                <h1 className="font-black text-xl text-white cursor-pointer" onClick={() => location.assign(`${API_URL}/login`)}>
                    <FontAwesomeIcon className="mr-2" icon={faArrowRightToBracket}/>Login
                </h1>
            )}
        </div>
    )
}