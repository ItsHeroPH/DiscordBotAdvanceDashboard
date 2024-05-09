import { Suspense, lazy } from "react"

const MessageEmbed = lazy(() => import('./MessageEmbed'))

export default function Message({ config, setConfig }) {
    return(
        <>
            <h1 className="font-bold text-white text-2xl mb-5">Message Content</h1>
            <div className="w-full h-fit bg-neutral-700 rounded-md mb-3">
                <textarea className="w-full min-h-[80px] max-h-[300px] bg-transparent rounded-md p-2 font-medium text-white text-lg transition-all duration-75 focus:outline focus:border-4 border-sky-400 outline-4 outline-sky-300/50" placeholder="Please enter some message" maxLength={4096}></textarea>
            </div>
            { config.messageEmbed && 
                <Suspense fallback={
                    <div className="w-full h-[20px] rounded-full animate-pulse bg-neutral-500"></div>
                }>
                    <MessageEmbed config={config} setConfig={setConfig}/>
                </Suspense>
            }
            { config.messageEmbed ? (
                <div className="px-2 py-1 rounded-md bg-red-600 w-fit font-bold text-white text-lg cursor-pointer" onClick={() => setConfig({...config, messageEmbed: false})}>Disable Embed</div>
            ) : (
                <div className="px-2 py-1 rounded-md bg-sky-600 w-fit font-bold text-white text-lg cursor-pointer" onClick={() => setConfig({...config, messageEmbed: true})}>Enable Embed</div>
            )}
        </>
    )
}