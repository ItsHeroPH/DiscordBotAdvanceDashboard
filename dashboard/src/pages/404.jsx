import { Helmet, HelmetProvider } from "react-helmet-async";
import NavigationBar from "../components/NavigationBar";
import { useLoaderData } from "react-router-dom";
import Loading from "../components/loading";

export default function NotFound() {
    const { bot, user } = useLoaderData()
    return(
        <HelmetProvider>  
            <Helmet>
                <title>Page Not Found</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <NavigationBar bot={bot} user={user}/>
            <div className="w-screen h-full bg-neutral-800">
                <div className="w-[75%] mx-auto py-11">
                    <div className="flex flex-col items-center text-center my-40">
                        <h1 className="text-9xl text-white font-black">404</h1>
                        <h1 className="text-6xl text-white font-black">Not Found</h1>
                        <h1 className="text-2xl text-white font-medium mt-10">We could not find this page</h1>
                        <h1 className="text-md text-gray-500 mt-5">There is nothing to show up in here...<br></br>You can now go back on the <a className="text-sky-500 underline-offset-2 hover:underline cursor-pointer" href="/">home page</a></h1>
                        <div className="bg-sky-500 rounded-lg w-[180px] px-3 py-2 my-11 text-sky-200 font-medium cursor-pointer" onClick={() => location.assign("/")}>Back To Home Page</div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}