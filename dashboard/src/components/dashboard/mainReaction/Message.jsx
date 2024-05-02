import MessageEmbed from "./MessageEmbed";

export default function Message({ config, setConfig }) {
    return (
        <div className="my-3 relative">
            <h1 className="text-md text-gray-500 font-medium">Message</h1>
            <div className="w-full rounded-lg bg-neutral-950">
                <textarea className="w-full min-h-[100px] max-h-[400px] bg-transparent outline-none text-lg text-gray-300 px-3 py-1 font-semibold" onChange={(e) => setConfig({...config, message: e.target.value })} defaultValue={config.message} placeholder="Message"/>
            </div>
            <div className="my-2 flex flex-wrap gap-2 items-center">
                <label className={`w-[60px] h-[30px] ${config.messageEmbed ? "bg-sky-500" : "bg-gray-600"} transition-all duration-200 ease-out transform inline-block relative rounded-full shadow-inner cursor-pointer`} onClick={() => setConfig({...config, messageEmbed: !config.messageEmbed })}>
                    <span className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-200 ease-out transform ${config.messageEmbed ? "translate-x-[120%]" : "translate-x-[20%]"} top-0.5 bottom-0.5`}/>
                </label>
                <h1 className="text-md text-gray-500 font-medium">Message Embed</h1>
            </div>
            <MessageEmbed config={config} setConfig={setConfig}/>
        </div>
    )
}