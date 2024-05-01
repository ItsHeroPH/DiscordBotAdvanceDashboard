import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../components/NavigationBar";
import { useLoaderData } from "react-router-dom";

export default function Home() {
    const { bot, user } = useLoaderData()
    return(
        <HelmetProvider>
            <Helmet>
                <title>The Best Multipurpose Discord Bot</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <NavigationBar bot={bot} user={user}/>
            <div className="w-screen h-full bg-neutral-800">
                <div className="w-[75%] mx-auto py-11">
                    <div className="flex flex-row gap-3 justify-start">
                        <img className="w-[96px] h-[96px] rounded-full" src={bot.displayAvatarURL}/>
                        <div className="flex flex-col">
                            <h1 className="text-6xl text-white font-black">{bot.username}</h1>
                            <h1 className="text-2xl text-white font-medium">The Best Multipurpose Bot</h1>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}