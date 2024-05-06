import EmojiPicker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";

export default function EmojiRoles({ config, setConfig, roles }) {
    const [dropMenu, setDropMenu] = useState(false)
    const handleAddEmoji = async (e) => {
        setConfig({...config, reactions: [...config.reactions, { emoji: e.native, roles: []}] })
        setDropMenu(false)
    }
    return (
        <>
            <div className="flex flex-col justify-center gap-2 items-center relative my-2">
                <div className="w-full py-2 text-center font-bold text-sky-600 border-2 border-dashed border-sky-600 rounded-lg bg-gray-600 cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                    Add Emoji
                </div>
                <div className={`transition-all duration-300 absolute top-10 z-40 ${dropMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-10 pointer-events-none"}`}>
                    <EmojiPicker theme="dark" onEmojiSelect={(e) => handleAddEmoji(e)}/>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                { config.reactions.map((reaction, i) => (
                    <Emoji config={config} setConfig={setConfig} reaction={reaction} roles={roles} index={i} key={i} />
                ))}
            </div>
        </>
    )
}

function Emoji({ config, setConfig, reaction, roles, index }) {
    const [selectDrop, setSelectDrop] = useState(false)
    const [filter, setFilter] = useState("")
    const ref = useRef(null)
    useEffect(() => {
        if(selectDrop) {
            ref.current.focus()
        } else {
            setFilter("")
            ref.current.blur()
            ref.current.value = ""
        }
    }, [selectDrop])
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center gap-3">
                <h1 className="w-[30px] h-[30px] flex justify-center items-center border-2 border-gray-300 bg-gray-600 rounded-full font-black text-gray-300 cursor-pointer" onClick={() => {
                    setConfig({...config, reactions: config.reactions.filter((_, i) => i !== index) })
                }}>
                    <i className="fa-solid fa-xmark"></i>
                </h1>
                <h1 className="text-3xl">{reaction.emoji}</h1>
            </div>
            <div className="flex flex-col relative min-w-fit max-w-[470px] my-2">
                <div className="w-full min-h-[55px] max-h-fit bg-neutral-950 rounded-lg px-4 py-2 cursor-pointer">
                    <div className="flex flex-row flex-wrap gap-2 items-center">
                        {reaction.roles.map((r) => (
                            <div className="p-2 flex flex-row flex-wrap gap-1 rounded-full bg-neutral-800 border-2 border-dashed items-center" key={r} style={{
                                borderColor: `#${roles.find(rol => rol.id == r).color.toString(16).padStart(6,'0') == "000000" ? "828282" : roles.find(rol => rol.id == r).color.toString(16).padStart(6,'0') }`
                            }}>
                                <div className="w-[15px] h-[15px] rounded-full" style={{
                                    backgroundColor: `#${roles.find(rol => rol.id == r).color.toString(16).padStart(6,'0') == "000000" ? "828282" : roles.find(rol => rol.id == r).color.toString(16).padStart(6,'0') }`
                                }}/>
                                <h1 className="text-md font-bold" style={{
                                    color: `#${roles.find(rol => rol.id == r).color.toString(16).padStart(6,'0') == "000000" ? "828282" : roles.find(rol => rol.id == r).color.toString(16).padStart(6,'0') }`
                                }}>{roles.find((ro) => ro.id == r)?.name}</h1>
                                <i className="font-bold text-gray-500 fa-regular fa-circle-xmark cursor-pointer" onClick={() => {
                                    config.reactions[index] = {...config.reactions[index], roles: [...reaction.roles.filter((ro) => ro !== r)]}
                                    setConfig({...config })
                                }}></i>
                            </div>
                        ))}
                        <h1 className="text-white font-bold px-2 py-1 flex items-center justify-center rounded-full w-[38px] h-[38px] bg-zinc-700" onClick={() => setSelectDrop((prev) => !prev)}><i className="fa-solid fa-plus"></i></h1>
                        <div className="min-w-fit max-w-[130px] h-[30px]">
                            <input className="w-full h-full outline-none bg-transparent font-bold text-white" ref={ref}
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Search Role"
                                onFocus={() => setSelectDrop(true)}
                                onBlur={() => setTimeout(() => setSelectDrop(false), 200)}
                                ></input>
                        </div>
                    </div>
                </div>
                <div className={`w-full max-h-[200px] min-h-fit overflow-y-scroll px-4 py-2 flex flex-col gap-2 rounded-lg bg-neutral-950 drop-shadow-lg border-2 border-stone-700/25 transition-all duration-300 absolute top-0 ${selectDrop ? "-translate-y-full opacity-100 pointer-events-auto" : "-translate-y-10 opacity-0 pointer-events-none"} z-10`}>
                    {roles.filter(r => !reaction.roles.includes(r .id) && r.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map(r  => (
                        <div className="w-full px-2 py-1.5 rounded-md hover:bg-slate-300/25 text-lg font-bold transition-all duration-200 cursor-pointer" key={r.id} style={{
                            color: `#${r.color.toString(16).padStart(6,'0') == "000000" ? "828282" : r.color.toString(16).padStart(6,'0') }`
                        }} onClick={() => {
                            setFilter("")
                            ref.current.value = ""
                            config.reactions[index] = {...config.reactions[index], roles: [...reaction.roles, r.id]}
                            setConfig({...config, reactions: config.reactions })
                        }}>{r.name}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}