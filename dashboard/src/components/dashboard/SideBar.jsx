import { faCog, faDashboard, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense } from "react";

export default function SideBar({ bot, guild, path }) {
    return (
        <div className="w-[298px] h-full bg-zinc-900">
            <div className="flex justify-between items-center p-5">
                <div className="flex gap-2 items-center px-3 py-1 cursor-pointer" onClick={() => location.assign("/dashboard")}>
                    <Suspense fallback={
                        <div className="w-[48px] h-[48px] rounded-full bg-zinc-700"></div>
                    }>
                        <img className="w-[48px] h-[48px] rounded-full" src={bot.displayAvatarURL}/>
                    </Suspense>
                    <h1 className="font-black text-white text-3xl">{bot.username}</h1>
                </div>
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
        </div>
    )
}