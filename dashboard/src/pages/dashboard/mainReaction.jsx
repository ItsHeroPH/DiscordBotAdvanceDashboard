import { lazy, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const Navbar = lazy(() => import('../../components/dashboard/Navbar'))
const ReactionRoles = lazy(() => import('../../components/dashboard/mainReaction/ReactionRoles'))

export default function MainReaction() {
    const { bot, user, guild, reactionRoles, channels, roles } = useLoaderData()

    if(!user) return location.assign("/") 

    const [sidebar, setSidebar] = useState(false)

    const [reactionsConfig, setReactionsConfig] = useState([...reactionRoles])


    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen relative flex">
                <SideBar bot={bot} guild={guild} path="/reactionroles" sidebar={sidebar} setSidebar={setSidebar}/>
                <div className="w-full h-full overflow-y-scroll no-scrollbar bg-neutral-800">
                    <Navbar bot={bot} user={user} setSidebar={setSidebar}/>
                    <div className={`w-full h-full p-10 transition-all duration-200 ${sidebar ? "blur-sm": "blur-none"} lg:blur-none`}>
                        <div className="w-full my-5">
                            <ReactionRoles config={reactionsConfig} setReactionsConfig={setReactionsConfig} channels={channels} roles={roles}/>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}