import { useLoaderData } from "react-router-dom"
import { Bot } from "../utils/discord/Bot.ts"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { User } from "../utils/discord/User.ts"
import { Suspense, lazy } from "react"
import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import features from "../utils/constants/features.ts"
import BotProvider from "../modules/Provider/BotProvider.tsx"
import UserProvider from "../modules/Provider/UserProvider.tsx"

const NavBar = lazy(() => import('../components/Navbar.tsx'))
const FeatureCards = lazy(() => import('../components/FeatureCards.tsx'))

interface loaderData {
    bot: Bot,
    user: User | null
}

export default function Home() {
    const { bot, user } = useLoaderData() as loaderData

    return(
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen bg-zinc-800 fixed overflow-y-scroll no-scrollbar">
                <BotProvider value={bot}>
                    <UserProvider value={user}>
                        <NavBar/>
                    </UserProvider>
                </BotProvider>
                <div className="w-full h-[600px] flex flex-col md:flex-row justify-center md:items-center">
                    <img src={bot.displayAvatarURL} className="rounded-full w-[128px] h-[128px]"/>
                    <div className="flex flex-col mx-5">
                        <h1 className="font-black text-white text-5xl">{bot.username}</h1>
                        <p className="font-medium text-gray-400 text-2xl">The Best Multipurpose Discord Bot</p>
                        <div className="my-3 px-6 py-2 w-fit rounded-full border-2 border-gray-600 font-bold text-gray-600 text-xl cursor-pointer hover:bg-slate-400/25 hover:text-gray-200 transition-all duration-150">
                            <FontAwesomeIcon className="mr-2" icon={faDiscord}/> Add to Discord
                        </div>
                    </div>
                </div>
                <div className="w-full p-4 bg-zinc-900">
                    <h1 className="text-white text-4xl font-black text-center mb-10">Features</h1>
                    <div className="w-full md:w-[70%] lg:w-[88%] xl:w-[70%] mx-auto">
                        { features.map((feature, i) => (
                            <Suspense key={i} fallback={<div/>}>
                                <FeatureCards feature={feature} index={i}/>
                            </Suspense>
                        ))}
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}