import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../components/NavigationBar";
import { useLoaderData } from "react-router-dom";
import leveling_card from "../public/leveling-card.png"

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
            <div className="w-screen h-full bg-neutral-900">
                <div className="w-[50%] mx-auto py-11 flex flex-col justify-center items-center gap-4">
                    <h1 className="text-5xl text-white font-medium text-center">Features</h1>
                    <div className="grid grid-cols-3 xl:grid-cols-6 gap-16 items-center">
                        <div className="col-span-3 flex flex-col gap-4">
                            <h1 className="text-4xl text-white font-black">Leveling and XP System</h1>
                            <p className="text-md text-gray-400 font-medium text-wrap">Make it more fun in your server activities by implementing our leveling system.
                            This gives the rewards to the most active on the server, by gaining xp and getting level ups. This is design to encourage the member of the server
                            to actively participate to the server's activities and chats</p>
                        </div>
                        <div className="col-span-3">
                            <img className="w-[400px] h-[400px]"src={leveling_card}/>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}