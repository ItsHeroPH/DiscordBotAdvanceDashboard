import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import submitForm from "../../utils/submitForm";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const NavigationBar = lazy(() => import('../../components/dashboard/NavigationBar'))
const FormChangePopUp = lazy(() => import('../../components/dashboard/FormChangePopUp'))
const LevelingMessage = lazy(() => import('../../components/dashboard/mainLeveling/LevelingMessage'))
const LevelingCard = lazy(() => import('../../components/dashboard/mainLeveling/LevelingCard'))
const RankRewards = lazy(() => import('../../components/dashboard/mainLeveling/RankRewards'))
const XPRate = lazy(() => import('../../components/dashboard/mainLeveling/XPRate'))
const NoXPChannels = lazy(() => import('../../components/dashboard/mainLeveling/NoXPChannel'))
const NoXPRoles = lazy(() => import('../../components/dashboard/mainLeveling/NoXPRoles'))

export default function MainLeveling() {
    const { bot, user, guild, guilds, guildConfig, roles, channels } = useLoaderData()
    if(user == null) return location.assign("/")
    if(guild == null) return location.assign("/")
    if(guildConfig == null) return location.assign("/dashboard")

    const [openSideBar, setOpenSideBar] = useState(false)
    const [defaultConfig, setDefaultConfig] = useState({
        enable: guildConfig.enable,
        xp: guildConfig.xp,
        anouncement: guildConfig.anouncement,
        card: guildConfig.card,
        rewards: guildConfig.rewards,
        noXP_Roles: guildConfig.noXP_Roles,
        noXP_Channels: guildConfig.noXP_Channels
    })
    const [config, setConfig] = useState({
        enable: guildConfig.enable,
        xp: guildConfig.xp,
        anouncement: guildConfig.anouncement,
        card: guildConfig.card,
        rewards: guildConfig.rewards,
        noXP_Roles: guildConfig.noXP_Roles,
        noXP_Channels: guildConfig.noXP_Channels
    })
    const [isChanged, setChange] = useState(false)

    useEffect(() => {
        if(!(JSON.stringify(defaultConfig) === JSON.stringify(config))) {
            setChange(true)
        } else {
            setChange(false)
        }
    }, [config, defaultConfig])

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
                    <div className={`w-full h-full transition-all duration-300 ${openSideBar ? "blur-md" : "blur-0" } lg:blur-0 overflow-y-scroll no-scrollbar`}>
                        <div className="p-10 my-10">
                            <div className="flex flex-row justify-between items-center">
                                <div>
                                    <h1 className="text-4xl text-white font-bold">Leveling</h1>
                                    <p className="text-lg text-gray-600 font-medium">Give your member xp and levels up when they send a message</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <h1 className="text-xl text-white">Enable</h1>
                                    <label className={`w-[60px] h-[30px] ${config.enable ? "bg-sky-500" : "bg-gray-600"} transition-all duration-200 ease-out inline-block relative rounded-full shadow-inner cursor-pointer`} onClick={() => setConfig({...config, enable: !config.enable })}>
                                        <span className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-300 transform ${config.enable ? "translate-x-[120%]" : "translate-x-[20%]"} top-0.5 bottom-0.5`}/>
                                    </label>
                                </div>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                submitForm(`${API_URL}/guild/${guild.id}/config/leveling`, config)
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
                                <LevelingMessage config={config} setConfig={setConfig} channels={channels}/>
                                <LevelingCard config={config} setConfig={setConfig} user={user}/>
                                <RankRewards config={config} setConfig={setConfig} roles={roles}/>
                                <XPRate config={config} setConfig={setConfig}/>
                                <NoXPChannels config={config} setConfig={setConfig} channels={channels}/>
                                <NoXPRoles config={config} setConfig={setConfig} roles={roles}/>
                                <FormChangePopUp isChanged={isChanged} onError={onError}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}
