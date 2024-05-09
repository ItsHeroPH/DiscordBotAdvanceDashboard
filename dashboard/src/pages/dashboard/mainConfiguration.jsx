import { lazy, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import submitForm from "../../utils/submitForm";
import { API_URL } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import NotifSavedChanges from "../../components/dashboard/NotifSavedChanges";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const Navbar = lazy(() => import('../../components/dashboard/Navbar'))
const BotSettings = lazy(() => import('../../components/dashboard/mainConfiguration/BotSettings'))
const EmbedPreview = lazy(() => import('../../components/dashboard/mainConfiguration/EmbedPreview'))

export default function MainConfiguration() {
    const { bot, user, guild, guildConfig } = useLoaderData()

    if(!user) return location.assign("/") 

    const [sidebar, setSidebar] = useState(false)

    const [config, setConfig] = useState({
        prefix: guildConfig.prefix,
        embedColor: guildConfig.embedColor
    })

    const [notif, setNotif] = useState(false)

    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen relative flex">
                <SideBar bot={bot} guild={guild} path="/config" sidebar={sidebar} setSidebar={setSidebar}/>
                <div className="w-full h-full overflow-y-scroll no-scrollbar bg-neutral-800">
                    <Navbar bot={bot} user={user} setSidebar={setSidebar}/>
                    <div className={`w-full h-full p-10 transition-all duration-200 ${sidebar ? "blur-sm": "blur-none"} lg:blur-none`}>
                        <form onSubmit={async(e) => {
                            e.preventDefault()
                            const submit = await submitForm(`${API_URL}/guild/${guild.id}/config`, config)
                            if(submit.status == 200) {
                                setNotif(true)
                                setTimeout(() => setNotif(false),4000)
                            }
                        }}>
                            { notif && (
                                <NotifSavedChanges duration={4000} setCloseNotif={setNotif}/>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-5">
                                <BotSettings config={config} setConfig={setConfig}/>
                                <EmbedPreview bot={bot} config={config}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}