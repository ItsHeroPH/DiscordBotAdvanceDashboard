import { useMemo, useRef, useState } from "react"

export default function SelectChannel({ config, setConfig, channels }) {
    const [dropMenu, setDropMenu] = useState(false)
    const [filter, setFilter] = useState("")
    const ref = useRef(null)
    const filteredChannels = useMemo(() => channels.filter(ch => ch.type == 0 && ch.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())),[filter])
    return (
        <div className="my-3">
            <h1 className="text-md text-gray-500 font-medium">Message Channel</h1>
            <div className="flex flex-col relative w-full mb-3 ">
                <div className="w-full h-[40px] bg-stone-950 rounded-lg cursor-pointer px-4 flex justify-between items-center" onClick={() => setDropMenu((prev) => !prev)}>
                    <div className="text-white font-medium flex flex-row items-center">
                        <i className="font-black fa-solid fa-hashtag mr-3"></i>
                        <input className="bg-transparent outline-none w-full h-fit text-gray-300" required={true} defaultValue={channels.find((ch) => ch.id == config.channel)? channels.find((ch) => ch.id == config.channel).name : ""} ref={ref} placeholder="Please Select A Channel" onChange={(e) => 
                            setFilter(e.target.value)
                        }></input>
                    </div>
                    <i className={`font-bold text-gray-600 text-xl transition-all duration-300 fa-solid fa-angle-up ${dropMenu ? "rotate-180" : "rotate-0"}`}></i>
                </div>
                <div className={`w-full min-h-fit max-h-[200px] border-2 border-neutral-800/50 p-2 rounded-lg z-40 bg-stone-950 absolute bottom-0 left-0 right-0 transition-all duration-300 ${dropMenu? "translate-y-full opacity-100 pointer-events-auto": "translate-y-3/4 opacity-0 pointer-events-none"} overflow-y-scroll`}>
                    {filteredChannels.map(ch => (
                        <h1 className="w-full p-2 rounded-lg cursor-pointer hover:bg-slate-400/25 text-white" key={ch.id} onClick={() => {
                            setConfig({...config, channel: ch.id})
                            setDropMenu(false)
                            ref.current.value = ch.name
                            setFilter("")
                        }}>
                            <i className="font-black fa-solid fa-hashtag mr-3"></i>
                            {ch.name}
                        </h1>
                    ))}
                </div>
            </div>
        </div>
    )
}