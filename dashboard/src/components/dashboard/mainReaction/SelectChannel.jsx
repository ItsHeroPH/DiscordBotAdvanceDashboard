import { faCaretDown, faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useMemo, useRef, useState } from "react"

export default function SelectChannel({ config, setConfig, channels, readOnly }) {
    const [dropMenu, setDropMenu] = useState(false)
    const ref = useRef()
    useEffect(() => {
        if(readOnly) return;
        if(dropMenu) {
            ref.current.focus()
        } else {
            ref.current.blur()
        }
    },[dropMenu])
    const [filter, setFilter] = useState("")
    const channel = useMemo(() => channels.find((ch) => ch.id === config.channel), [config])
    const channelList = useMemo(() => channels.filter((ch) => ch.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) && ch.type == 0), [filter])
    return (
        <>
            <h1 className="font-bold text-white text-2xl mb-5">Message Channel</h1>
            {readOnly ? (
                <div className="w-full flex items-center bg-neutral-600 rounded-md border-2 border-black">
                    <FontAwesomeIcon className="ml-4 font-medium text-gray-500" icon={faHashtag}/>
                    <h1 className="font-bold text-white text-lg px-4 py-2">{channel.name}</h1>
                </div>
            ) : (
                <div className="relative z-10">
                    <div className="w-full flex justify-between items-center bg-neutral-600 rounded-md border-2 border-black cursor-pointer" onClick={() => setDropMenu((p) => !p)}>
                        <div className="flex items-center">
                            <FontAwesomeIcon className="ml-4 font-medium text-gray-500" icon={faHashtag}/>
                            <input ref={ref} className="w-full bg-transparent font-bold text-white text-lg px-4 py-2 outline-none" placeholder="Please Select A Channel" onBlur={() => setTimeout(() => setDropMenu(false), 300)} onChange={(e) => {
                                setFilter(e.target.value)
                            }} defaultValue={channel?.name} required={true} readOnly={false}/>
                        </div>
                        <FontAwesomeIcon className={`font-bold text-gray-400 text-xl mr-4 translate-all duration-200 ${dropMenu ? "rotate-180" : "rotate-0"}`} icon={faCaretDown}/>
                    </div>
                    <div className={`w-full min-h-fit max-h-[200px] rounded-lg bg-neutral-600 border-2 border-black overflow-y-scroll absolute transition-all duration-200 ${dropMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
                        { channelList.map((ch) => (
                            <div className="w-full px-2 py-2 hover:bg-neutral-700 flex items-center gap-2 cursor-pointer" key={ch.id} onClick={() => {
                                setConfig({...config, channel: ch.id})
                                ref.current.value = ch.name
                                setFilter("")
                                setDropMenu(false)
                            }}>
                                <FontAwesomeIcon className="font-medium text-gray-500" icon={faHashtag}/>
                                <h1 className="font-medium text-white">{ch.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}