import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { lazy } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { useLoaderData } from "react-router"

const Navbar = lazy(() => import('../components/Navbar'))

export default function Home() {
    const { bot, user } = useLoaderData()
    return (
        <HelmetProvider>
            <Helmet>
                <title>The Best Multipurpose Discord Bot</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen bg-zinc-800 fixed">
                <Navbar bot={bot} user={user}/>
                <div className="w-full h-80 bg-zinc-900 flex justify-center items-center">
                    <img src={bot.displayAvatarURL} className="rounded-full w-[128px] h-[128px] hidden md:block"/>
                    <div className="flex flex-col mx-5">
                        <h1 className="font-black text-white text-5xl">{bot.username}</h1>
                        <p className="font-medium text-gray-400 text-2xl">The Best Multipurpose Discord Bot</p>
                        <div className="my-3 px-6 py-2 w-fit rounded-full border-2 border-gray-600 font-bold text-gray-600 text-xl cursor-pointer hover:bg-slate-400/25 hover:text-gray-200 transition-all duration-150">
                            <FontAwesomeIcon className="mr-2" icon={faDiscord}/> Add to Discord
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}