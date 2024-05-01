import { useState } from "react";
import EmbedMessage from "./EmbedMessage";

export default function LevelingMessage({ config, setConfig, channels }) {
    const [dropMenu, setDropMenu] = useState(true)
    const [lUMDropMenu, setLUMDropMenu] = useState(false)
    const [lUCDropMenu, setLUCDropMenu] = useState(false)
    return (
        <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                <div>
                    <h1 className="text-xl text-white font-bold">Leveling Message</h1>
                    <p className="text-md text-gray-600 font-medium">Here you can customize the message that the bot send when the member gain levels</p>
                </div>
                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
            </div>
            <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                <div className="w-full h-[2px] bg-slate-400/25"></div>
                <div className="my-4 mx-4">
                    <h1 className="text-md text-gray-500 font-medium">Level Up Message</h1>
                    <div className="flex flex-col relative">
                        <div className="min-w-fit max-w-[270px] min-h-[50px] max-h-fit bg-neutral-950 rounded-lg px-4 py-2 cursor-pointer" onClick={() => setLUMDropMenu((prev) => !prev)}>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-white text-lg font-medium">{config.anouncement.type == 1 ? "Disabled" : (config.anouncement.type == 2 ? "Current Channel" : (config.anouncement.type == 3 ? "Private Message" : "Custom Channel") )}</h1>
                                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${lUMDropMenu ? "rotate-0" : "rotate-180"}`}></i>
                            </div>
                        </div>
                        <div className={`min-w-fit max-w-[270px] px-4 py-2 flex flex-col gap-2 rounded-lg bg-neutral-950 drop-shadow-lg border-2 border-stone-700/25 transition-all duration-300 absolute bottom-0 ${lUMDropMenu ? "translate-y-full opacity-100 pointer-events-auto" : "translate-y-[10% - 10px] opacity-0 pointer-events-none"} z-10`}>
                            <div className="w-full px-2 py-1.5 rounded-md hover:bg-slate-300/25 text-white text-lg font-light transition-all duration-200 cursor-pointer" onClick={() => {
                                setConfig({...config, anouncement: {...config.anouncement, type: 1 } })
                                setLUMDropMenu(false)
                            }}>Disabled</div>
                            <div className="w-full px-2 py-1.5 rounded-md hover:bg-slate-300/25 text-white text-lg font-light transition-all duration-200 cursor-pointer" onClick={() => {
                                setConfig({...config, anouncement: {...config.anouncement, type: 2 } })
                                setLUMDropMenu(false)
                            }}>Current Channel</div>
                            <div className="w-full px-2 py-1.5 rounded-md hover:bg-slate-300/25 text-white text-lg font-light transition-all duration-200 cursor-pointer" onClick={() => {
                                setConfig({...config, anouncement: {...config.anouncement, type: 3 } })
                                setLUMDropMenu(false)
                            }}>Private Message</div>
                            <div className="w-full px-2 py-1.5 rounded-md hover:bg-slate-300/25 text-white text-lg font-light transition-all duration-200 cursor-pointer" onClick={() => {
                                setConfig({...config, anouncement: {...config.anouncement, type: 4 } })
                                setLUMDropMenu(false)
                            }}>Custom Channel</div>
                        </div>
                    </div>
                </div>
                <div className={`my-4 mx-4 ${config.anouncement.type == 4 ? "" : "hidden"}`}>
                    <h1 className="text-md text-gray-500 font-medium">Message Channel</h1>
                    <div className="flex flex-col relative">
                        <div className="min-w-fit max-w-[270px] min-h-[50px] max-h-fit bg-neutral-950 rounded-lg px-4 py-2 cursor-pointer" onClick={() => setLUCDropMenu((prev) => !prev)}>
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-white text-lg font-medium"><i className="fa-solid fa-hashtag mr-2"></i>{channels.find((c) => c.id == config.anouncement.channel) ? channels.find((c) => c.id == config.anouncement.channel).name : "Please Select Channel"}</h1>
                                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${lUCDropMenu ? "rotate-0" : "rotate-180"}`}></i>
                            </div>
                        </div>
                        <div className={`min-w-fit max-w-[270px] min-h-fit max-h-[300px] overflow-y-scroll px-4 py-2 flex flex-col gap-2 rounded-lg bg-neutral-950 drop-shadow-lg border-2 border-stone-700/25 transition-all duration-300 absolute bottom-0 ${lUCDropMenu ? "translate-y-full opacity-100 pointer-events-auto" : "translate-y-5 opacity-0 pointer-events-none"} z-10`}>
                            {channels.filter(c => c.type === 0).map(c => (
                                <div className="w-full px-2 py-1.5 rounded-md hover:bg-slate-300/25 text-white text-lg font-light transition-all duration-200 cursor-pointer" key={c.id} onClick={() => {
                                    setConfig({...config, anouncement: {...config.anouncement, channel: c.id } })
                                    setLUCDropMenu(false)
                                }}><i className="fa-solid fa-hashtag mr-2"></i>{c.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`my-4 mx-4 ${config.anouncement.type == 1 ? "hidden" : ""}`}>
                    <h1 className="text-md text-gray-500 font-medium">Message</h1>
                    <div className="m-2">
                        <p className="text-gray-500 text-sm font-medium my-1"><span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">{"{user}"}</span> - mention the user</p>
                        <p className="text-gray-500 text-sm font-medium my-1"><span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">{"{user.name}"}</span> - display the user's username</p>
                        <p className="text-gray-500 text-sm font-medium my-1"><span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">{"{user.id}"}</span> - display the user's id</p>
                        <p className="text-gray-500 text-sm font-medium my-1"><span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">{"{user.avatar}"}</span> - display the user's avatar <span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">Note: This is only for image url</span></p>
                        <p className="text-gray-500 text-sm font-medium my-1"><span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">{"{xp}"}</span> - display the user's xp</p>
                        <p className="text-gray-500 text-sm font-medium my-1"><span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">{"{level}"}</span> - display the user's level</p>
                        <p className="text-gray-500 text-sm font-medium my-1"><span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">{"{xp.requirement}"}</span> - display the requires xp to reach the next level</p>
                    </div>
                    <div className="min-w-fit max-w-[400px] rounded-lg bg-neutral-950">
                        <textarea className="w-full min-h-[100px] max-h-[400px] bg-transparent outline-none text-lg text-gray-300 px-3 py-1 font-semibold" onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, message: e.target.value } })} defaultValue={config.anouncement.message} placeholder="Message"/>
                    </div>
                    <div className="my-2 flex flex-wrap gap-2 items-center">
                        <label className={`w-[60px] h-[30px] ${config.anouncement.messageEmbed ? "bg-sky-500" : "bg-gray-600"} transition-all duration-200 ease-out transform inline-block relative rounded-full shadow-inner cursor-pointer`} onClick={() => setConfig({...config, anouncement: {...config.anouncement, messageEmbed: !config.anouncement.messageEmbed}})}>
                            <span className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-200 ease-out transform ${config.anouncement.messageEmbed ? "translate-x-[120%]" : "translate-x-[20%]"} top-0.5 bottom-0.5`}/>
                        </label>
                        <h1 className="text-md text-gray-500 font-medium">Message Embed</h1>
                    </div>
                    <EmbedMessage config={config} setConfig={setConfig}/>
                </div>
            </div>
        </div>
    )
}