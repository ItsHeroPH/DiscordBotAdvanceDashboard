import { Suspense, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faServer } from "@fortawesome/free-solid-svg-icons"
import { API_URL } from "../utils/constants/constant"
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket"
import { getBot } from "../modules/Provider/BotProvider"
import { getUser } from "../modules/Provider/UserProvider"

export default function NavBar() {
    return (
        <div className="bg-zinc-900 px-6 py-4 drop-shadow-xl">
            <div className="w-full md:w-[90%] lg:w-[80%] mx-auto flex justify-between items-center">
                <Suspense>
                    <Logo/>
                </Suspense>
                <div className="flex">
                    <User/>
                </div>
            </div>
        </div>
    )
}

function Logo() {
    const bot = getBot()
    return (
        <div className="flex gap-2 items-center cursor-pointer" onClick={
            () => location.assign("/")
        }>
            <img className="w-[42px] h-[42px] rounded-full" src={bot.displayAvatarURL}/>
            <h1 className="font-black text-white text-3xl">{bot.username}</h1>
        </div>
    )
}

function User() {
    const user = getUser()

    const [dropMenu, setDropMenu] = useState(false)

    return (
        <>
            { user !== null ? 
            (
                <div className="relative">
                    <div className="flex gap-2 items-center cursor-pointer" onClick={
                        () => setDropMenu((p) => !p)
                    }>
                        <Suspense fallback={<div className="w-[32px] h-[32px] bg-gray-400 rounded-full"/>}>
                            <img className="w-[32px] h-[32px] rounded-full" src={user.avatarURL}/>
                        </Suspense>
                        <h1 className="text-white text-lg font-semibold hidden md:block">{user.global_name}</h1>
                        <FontAwesomeIcon className={`text-white text-xl transition-all duration-200 ${dropMenu ? "-scale-100" : "scale-100"}`} icon={faAngleDown}/>
                    </div>
                    <div className={`w-[240px] p-4 bg-zinc-950 rounded-md absolute right-0 transition-all duration-150 ${dropMenu ? "translate-y-4 opacity-100 pointer-events-auto" : "-translate-y-3 opacity-0 pointer-events-none"} drop-shadow-lg`}>
                        <h1 className="text-white text-sm font-black my-1">Server Owner</h1>
                        <div className="px-3 py-2 rounded-lg text-gray-400 text-md font-light transition-all duration-75 hover:bg-gray-700/40 cursor-pointer" onClick={
                            () => location.assign("/dashboard")
                        }>
                            <FontAwesomeIcon className="font-black mr-2" icon={faServer}/>
                            Manage Server
                        </div>
                        <div className="w-full h-[2px] rounded-full bg-zinc-800 my-2"/>
                        <div className="px-3 py-2 rounded-lg text-red-400 text-md font-light transition-all duration-75 hover:bg-red-900/40 cursor-pointer" onClick={
                            () => location.assign(`${API_URL}/logout`)
                        }>
                            <FontAwesomeIcon className="font-black mr-2" icon={faArrowRightFromBracket}/>
                            Log Out
                        </div>
                    </div>
                </div>
            ) : (
                <div className="px-4 py-1.5 bg-gradient-to-br from-sky-300 via-sky-500 to-sky-700 shadow-sky-400 shadow-md rounded-full flex gap-2 items-center cursor-pointer"
                onClick={
                    () => location.assign(`${API_URL}/login`)
                }>
                    <FontAwesomeIcon className="text-white font-black" icon={faArrowRightToBracket}/>
                    <h1 className="text-white font-bold text-lg">Login</h1>
                </div>
            )
            }
        </>
    )
}