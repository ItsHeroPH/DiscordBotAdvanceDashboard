import { faCrown, faShieldAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function GuildCards({ guild, bot, botGuilds }) {
    return(
        <div className="w-[250px] h-[200px] border-4 border-zinc-950 rounded-2xl transition-all duration-100 hover:translate-y-[-5%] hover:drop-shadow-2xl cursor-pointer">
            <div className="w-full h-1/2 rounded-t-xl realtive overflow-hidden">
                { guild.icon ? (
                    <img className="w-full h-full blur-md" width={32} height={32} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}></img>
                ) : (
                    <div className="w-full h-full bg-neutral-700 blur-md"></div>
                )}
            </div>
            <div className="w-full h-1/2 bg-zinc-900 gap-2 rounded-b-xl relative flex flex-col px-4 py-2">
                <div className="w-[64px] h-[64px] rounded-full border-8 border-zinc-900 absolute translate-y-[-60%] overflow-hidden">
                    { guild.icon ? (
                        <img className="w-full h-full" width={20} height={20} src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}></img>
                    ) : (
                        <div className="w-full h-full bg-neutral-800 text-center">
                            <h1 className="text-4xl text-gray-400 font-black">{guild.name.charAt(0,1).toLocaleUpperCase()}</h1>
                        </div>
                    )}
                </div>
                <div className="flex flex-row ml-16 justify-between items-center group">
                    <h1 className="text-md text-white text-start font-bold">{guild.name.length > 9 ? `${guild.name.slice(0, 9)}...`: guild.name}</h1>
                    <div className="flex flex-col items-center">
                        <div className="w-[30px] h-[30px] bg-stone-950 rounded-lg text-center text-lg">
                            { guild.owner ? (
                                <FontAwesomeIcon className="text-orange-600" icon={faCrown}/>
                            ) : (
                                <FontAwesomeIcon className="text-blue-600" icon={faShieldAlt}/>
                            )}
                        </div>
                        <div className="bg-zinc-950 rounded-lg px-2 py-1 absolute translate-y-[-120%] text-gray-400 font-medium opacity-0 group-hover:opacity-100">{guild.owner ? "Owner" : "Moderator"}</div>
                    </div>
                </div>
                {
                    botGuilds.find((g) => g.id == guild.id) ? (
                        <div className="w-[100px] h-[33px] bg-sky-500 rounded-md px-2 py-1 font-medium text-white self-end cursor-pointer" onClick={() => location.assign(`/dashboard/${guild.id}`)}>Dashbaord</div>
                    ) : (
                        <div className="w-[120px] h-[33px] bg-gray-500 rounded-md px-2 py-1 font-medium text-white self-end cursor-pointer" onClick={() => 
                            window.open(`https://discordapp.com/oauth2/authorize?client_id=${bot.id}&permissions=1122573558992449&scope=bot%20applications.commands&guild_id=${guild.id}`,
                            "_blank",
                            "width=500,height=900,location=no,resizable=no,menubar=no,toolbar=no"
                    )}>Add to Server</div>
                    )
                }
            </div>
        </div>
    )
}