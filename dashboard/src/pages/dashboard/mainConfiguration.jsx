import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { lazy, useState } from "react";
import { API_URL } from "../../utils/constants";
import { ChromePicker, SketchPicker } from "react-color";
import submitForm from "../../utils/submitForm";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const NavigationBar = lazy(() => import('../../components/dashboard/NavigationBar'))
const FormChangePopUp = lazy(() => import('../../components/dashboard/FormChangePopUp'))

export default function MainConfiguration() {
    const { bot, user, guild, guilds, guildConfig } = useLoaderData()
    if(user == null) return location.assign("/")
    if(guild == null) return location.assign("/")
    if(guildConfig == null) return location.assign("/dashboard")

    const [openSideBar, setOpenSideBar] = useState(false)
    const [defaultConfig, setDefaultConfig] = useState({
        prefix: guildConfig.prefix,
        embedColor: guildConfig.embedColor
    })
    const [config, setConfig] = useState({
        prefix: guildConfig.prefix,
        embedColor: guildConfig.embedColor
    })
    let isChanged = !(JSON.stringify(defaultConfig) === JSON.stringify(config))

    const [onError, setError] = useState(false)

    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen bg-stone-800 flex flex-row grow fixed">
                <SideBar bot={bot} guild={guild} guilds={guilds} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
                <div className="w-full lg:w-[calc(100vh - 300px)] h-screen">
                    <NavigationBar bot={bot} user={user} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
                    <div className={`w-full h-full transition-all duration-300 ${openSideBar ? "blur-md" : "blur-0" } relative lg:blur-0 overflow-y-scroll no-scrollbar`}>
                        <div className="p-10 my-10">
                            <h1 className="text-4xl text-white font-bold">Configuration</h1>
                            <p className="text-lg text-gray-600 font-medium">Here you can customize the bot configurations</p>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                submitForm(`${API_URL}/guild/${guild.id}/config`, config)
                                setDefaultConfig(config)
                            }}
                                onReset={() => {
                                    setConfig(defaultConfig)
                                }}
                                onInvalid={() => {
                                    setError(true)
                                    setTimeout(() => setError(false), 100)
                                    setTimeout(() => setError(true), 200)
                                    setTimeout(() => setError(false), 300)
                                }}
                            >
                                <PrefixForm config={config} setConfig={setConfig}/>
                                <EmbedField config={config} bot={bot} setConfig={setConfig}/>
                                <FormChangePopUp isChanged={isChanged} onError={onError}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

function PrefixForm({ config, setConfig }) {
    const [dropMenu, setDropMenu] = useState(true)
    return (
        <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                <div>
                    <h1 className="text-xl text-white font-bold">Bot Prefix</h1>
                    <p className="text-md text-gray-600 font-medium">Here you can customize the bot prefix to trigger the bot</p>
                </div>
                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
            </div>
            <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                <div className="w-full h-[2px] bg-slate-400/25"></div>
                <div className="my-4 mx-4">
                    <h1 className="text-sm text-gray-500 font-medium">Command Prefix</h1>
                    <div className="w-full h-[45px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full relative bg-transparent outline-none text-lg text-gray-300 px-3 py-1 font-semibold" placeholder="Command Prefix" defaultValue={`${config.prefix}`} required={true} onChange={(e) => setConfig({...config, prefix: e.target.value})}/>
                    </div>
                    <div className="flex flex-row my-1 mx-2 gap-2">
                        <p className="text-sm text-gray-400 font-medium px-2 py-1 rounded-md bg-zinc-700/25 cursor-pointer"><span className="text-white">{config.prefix}</span>help</p>
                        <p className="text-sm text-gray-400 font-medium px-2 py-1 rounded-md bg-zinc-700/25 cursor-pointer"><span className="text-white">{config.prefix}</span>help information</p>
                        <p className="text-sm text-gray-400 font-medium px-2 py-1 rounded-md bg-zinc-700/25 cursor-pointer"><span className="text-white">{config.prefix}</span>info</p>
                    </div>
                </div>
            </div>
        </div>
    ) 
}
function EmbedField({ config, bot, setConfig }) {
    const [dropMenu, setDropMenu] = useState(true)
    const [colorPicker, setColorPicker] = useState(false)

    const date = new Date()
    return (
        <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                <div>
                    <h1 className="text-xl text-white font-bold">Embed Color</h1>
                    <p className="text-md text-gray-600 font-medium">Here you can customize the bot embed color</p>
                </div>
                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
            </div>
            <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                <div className="w-full h-[2px] bg-slate-400/25"></div>
                <div className="flex justify-start items-start gap-2 px-2 py-3">
                    <div className="w-[32px] h-[32px] cursor-pointer">
                        <img className="w-full h-full rounded-full" width={30} height={30} src={bot.displayAvatarURL}/>
                    </div>
                    <div className="flex flex-col gap-1 flex-wrap">
                        <div className="flex flex-row items-center gap-2">
                            <h1 className="text-sm text-white text-wrap font-bold items-center"><span className="cursor-pointer hover:underline">{bot.username}</span><span className="mx-1 px-1 py-0.5 text-[8px] uppercase bg-sky-500 rounded-sm">Bot</span></h1>
                            <p className="text-xs text-gray-400 font-light">Today at {`${(date.getHours() % 12) == 0 ? 12 : (date.getHours() % 12)}:${date.getMinutes()} ${(date.getHours()/12) > 1 ? "PM": "AM"}`}</p>
                        </div>
                        <div className="bg-neutral-800 rounded-md border-l-4" style={
                            {
                                borderLeftColor: `${config.embedColor}`
                            }
                        }>
                            <div className="px-3 py-1.5 text-white text-sm font-medium">Message Embed Title</div>
                            <div className="px-3 py-1.5 text-gray-400 text-sm font-light">{`${bot.username} is the Best Multipurpose Discord Bot ever!`}</div>
                        </div>
                    </div>
                </div>
                <div className="my-4 mx-4">
                    <h1 className="text-sm text-gray-500 font-medium">Embed Color</h1>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col">
                            <div className={`absolute translate-y-[-105%] ${colorPicker ? "": "hidden"}`}>
                                <ChromePicker className="!bg-neutral-800" color={config.embedColor} onChange={(color) => setConfig({...config, embedColor: color.hex})}/>
                            </div>
                            <div className="relative w-[45px] h-[45px] rounded-lg border-4 border-stone-800 text-end px-1 cursor-pointer" onClick={() => setColorPicker((prev) => !prev)} style={
                                {
                                    backgroundColor: `${config.embedColor}`
                                }
                            }>
                                <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                            </div>
                        </div>
                        <div className="w-full h-[45px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                            <input className="w-full h-full relative bg-transparent outline-none text-lg text-gray-300 px-3 py-1 font-semibold" value={config.embedColor} readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}
