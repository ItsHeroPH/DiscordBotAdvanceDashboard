import { faCrown, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";

export default function GuildCards({ guild, bot, botGuilds }) {
    const isBotInServer = useMemo(() => botGuilds.find((g) => g.id == guild.id), [guild])
    return(
        <div className="min-w-[125px] max-w-[150px] aspect-square bg-zinc-800 rounded-md transition-all duration-100 hover:-translate-y-3 hover:shadow-xl relative" onClick={() => {
            if(isBotInServer) {
                location.assign(`/dashboard/${guild.id}`)
            } else {
                window.open(`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&permissions=1122573558992449&scope=bot%20applications.commands&guild_id=${guild.id}`,
                "_blank",
                "width=500,height=900,location=no,resizable=no,menubar=no,toolbar=no")
            }
        }}>
            <div className="w-full h-1/2 rounded-t-md overflow-hidden">
                { guild.icon ? (
                    <img className={`w-[150px] h-[150px] blur-md ${isBotInServer ? "saturate-100" : "saturate-0"}`} width={32} height={32} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}></img>
                ) : (
                    <div className={`w-full h-full ${isBotInServer ? "bg-gray-700" : "bg-neutral-700"} blur-md`}></div>
                )}
            </div>
            <div className="w-full h-1/2 rounded-t-md">
                <div className="w-[48px] h-[48px] rounded-full border-4 border-zinc-800 absolute translate-x-2 translate-y-[-50%] overflow-hidden">
                    { guild.icon ? (
                        <img className={`w-full h-full ${isBotInServer ? "saturate-100" : "saturate-0"}`} width={20} height={20} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}></img>
                    ) : (
                        <div className="w-full h-full bg-neutral-900 text-center">
                            <h1 className={`text-3xl ${isBotInServer ? "text-gray-600" : "text-gray-400"} font-black`}>{guild.name.charAt(0,1).toLocaleUpperCase()}</h1>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-1 py-2 px-2">
                    <div className="w-[25px] h-[25px] rounded-md bg-zinc-900 self-end flex justify-center items-center group relative">
                        { guild.owner ? (
                            <FontAwesomeIcon className={`text-orange-600 text-xs ${isBotInServer ? "saturate-100" : "saturate-0"}`} icon={faCrown}/>
                        ) : (
                            <FontAwesomeIcon className={`text-blue-600 text-xs ${isBotInServer ? "saturate-100" : "saturate-0"}`} icon={faShieldAlt}/>
                        )}
                        <div className="px-2 py-1 rounded-md bg-zinc-950 font-medium text-gray-400 text-sm absolute -translate-y-[110%] opacity-0 group-hover:opacity-100">{guild.owner ? "Owner" : "Moderator"}</div>
                    </div>
                    <div className="w-full px-2 py-1 rounded-lg bg-zinc-900 text-white font-medium text-md truncate">{guild.name}</div>
                </div>
            </div>
        </div>
    )
}