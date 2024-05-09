import { faArrowLeft, faArrowRightToBracket, faCog, faDashboard, faFaceLaughBeam, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";

export default function SideBar({ bot, guild, path, sidebar, setSidebar }) {
    return (
        <div className={`w-[298px] h-full bg-zinc-900 border-2 border-black absolute lg:relative transition-all duration-200 ${sidebar ? "left-0" : "-left-full"} lg:left-0 z-20`}>
            <div className="flex gap-2 items-center p-4">
                <FontAwesomeIcon className="font-black text-white text-2xl cursor-pointer lg:hidden rotate-180" icon={faArrowRightToBracket} onClick={() => setSidebar(false)}/>
                <div className="flex gap-1 items-center px-1 cursor-pointer" onClick={() => location.assign("/dashboard")}>
                    <Suspense fallback={
                        <div className="w-[48px] h-[48px] rounded-full bg-zinc-700"></div>
                    }>
                        <img className="w-[48px] h-[48px] rounded-full" src={bot.displayAvatarURL}/>
                    </Suspense>
                    <h1 className="font-black text-white text-3xl">{bot.username}</h1>
                </div>
            </div>
            <div className="w-full p-3 flex gap-3 items-center border-y-2 border-black bg-zinc-950/40">
                    <Suspense fallback={
                        <div className="w-[38px] h-[38px] rounded-full bg-zinc-700"></div>
                    }>
                        { guild.icon ? (
                            <img className="w-[38px] h-[38px] rounded-full" width={20} height={20} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}></img>
                        ) : (
                            <div className="w-[38px] h-[38px] rounded-full bg-neutral-800 text-center">
                                <h1 className="text-3xl font-black text-gray-300">{guild.name.charAt(0,1).toLocaleUpperCase()}</h1>
                            </div>
                        )}
                    </Suspense>
                    <h1 className="font-black text-white text-xl truncate">{guild.name}</h1>
            </div>
            <h1 className="px-5 py-2 font-bold text-white text-md uppercase">Settings</h1>
            <div className={`px-10 py-4 ${path == "/" ? "bg-zinc-950/60" : "bg-transparent"} cursor-pointer group hover:bg-sky-900 flex gap-3 items-center`} onClick={() => location.assign(`/dashboard/${guild.id}`)}>
                <FontAwesomeIcon className="text-gray-600 font-bold text-2xl group-hover:text-white" icon={faDashboard}/>
                <h1 className="text-gray-300 font-medium text-lg group-hover:text-white">Dashboard</h1>
            </div>
            <div className={`px-10 py-4 ${path == "/config" ? "bg-zinc-950/60" : "bg-transparent"} cursor-pointer group hover:bg-sky-900 flex gap-3 items-center`} onClick={() => location.assign(`/dashboard/${guild.id}/config`)}>
                <FontAwesomeIcon className="text-gray-600 font-bold text-2xl group-hover:text-white" icon={faCog}/>
                <h1 className="text-gray-300 font-medium text-lg group-hover:text-white">Configuration</h1>
            </div>
            <div className={`px-10 py-4 ${path == "/commands" ? "bg-zinc-950/60" : "bg-transparent"} cursor-pointer group hover:bg-sky-900 flex gap-3 items-center`} onClick={() => location.assign(`/dashboard/${guild.id}/commands`)}>
                <FontAwesomeIcon className="text-gray-600 font-bold text-2xl group-hover:text-white" icon={faTerminal}/>
                <h1 className="text-gray-300 font-medium text-lg group-hover:text-white">Commands</h1>
            </div>
            <h1 className="px-5 py-2 font-bold text-white text-md uppercase">Utility</h1>
            <div className={`px-10 py-4 ${path == "/reactionroles" ? "bg-zinc-950/60" : "bg-transparent"} cursor-pointer group hover:bg-sky-900 flex gap-3 items-center`} onClick={() => location.assign(`/dashboard/${guild.id}/reactionroles`)}>
                <FontAwesomeIcon className="text-gray-600 font-bold text-2xl group-hover:text-white" icon={faFaceLaughBeam}/>
                <h1 className="text-gray-300 font-medium text-lg group-hover:text-white">Reaction Roles</h1>
            </div>
        </div>
    )
}