import { useEffect, useRef, useState } from "react"

export default function NoXPRoles({ config, setConfig, roles }) {
    const [dropMenu, setDropMenu] = useState(true)
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
        <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                <div>
                    <h1 className="text-xl text-white font-bold">No XP Role</h1>
                    <p className="text-md text-gray-600 font-medium">Here you can set the roles that user cannot gain XP when they have them</p>
                </div>
                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
            </div>
            <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                <div className="w-full h-[2px] bg-slate-400/25"></div>
                <div className="my-4 mx-4">
                    <div className="flex flex-col py-4 gap-3">
                        <div className="flex flex-row flex-wrap gap-2 items-center">
                            <div className={`w-[20px] h-[20px] flex rounded-full ${config.noXP_Roles.type == 1 ? "bg-sky-500" : "bg-zinc-800"} items-center justify-center cursor-pointer`} onClick={() => setConfig({...config, noXP_Roles: {...config.noXP_Roles, type: 1}})}>
                                <span className={`w-1/2 h-1/2 bg-white rounded-full ${config.noXP_Roles.type == 1 ? "" : "hidden"}`}></span>
                            </div>
                            <div>
                                <h1 className="text-md text-gray-300 font-medium">Deny for all roles excepts</h1>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2 items-center">
                            <div className={`w-[20px] h-[20px] flex rounded-full ${config.noXP_Roles.type== 2 ? "bg-sky-500" : "bg-zinc-800"} items-center justify-center cursor-pointer`} onClick={() => setConfig({...config, noXP_Roles: {...config.noXP_Roles, type: 2}})}>
                                <span className={`w-1/2 h-1/2 bg-white rounded-full ${config.noXP_Roles.type == 2 ? "" : "hidden"}`}></span>
                            </div>
                            <div>
                                <h1 className="text-md text-gray-300 font-medium">Allow for all roles excepts</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col relative min-w-fit max-w-[470px]">
                        <div className="w-full min-h-[55px] max-h-fit bg-neutral-950 rounded-lg px-4 py-2 cursor-pointer">
                            <div className="flex flex-row flex-wrap gap-2 items-center">
                                {config.noXP_Roles.roles.map((r) => (
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
                                            setConfig({...config, noXP_Roles: {...config.noXP_Roles, roles: [...config.noXP_Roles.roles.filter((ro) => ro !== r)] }})
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
                            {roles.filter(r => !config.noXP_Roles.roles.includes(r .id) && r .name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map(r  => (
                                <div className="w-full px-2 py-1.5 rounded-md hover:bg-slate-300/25 text-lg font-bold transition-all duration-200 cursor-pointer" key={r.id} style={{
                                    color: `#${r.color.toString(16).padStart(6,'0') == "000000" ? "828282" : r.color.toString(16).padStart(6,'0') }`
                                }} onClick={() => {
                                    setFilter("")
                                    ref.current.value = ""
                                    setConfig({...config, noXP_Roles: {...config.noXP_Roles, roles: [...config.noXP_Roles.roles, r.id] } })
                                }}>{r.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}