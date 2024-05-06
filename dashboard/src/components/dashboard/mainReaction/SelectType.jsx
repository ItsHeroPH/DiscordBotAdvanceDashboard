import { useMemo, useState } from "react"
import { ReactionRolesTypes } from "../../../utils/constants"

export default function SelectType({ config, setConfig }) {
    const [dropMenu, setDropMenu] = useState(false)
    const selectValue = useMemo(() => ReactionRolesTypes.find((t) => t.type === config.type))
    return (
        <div className="my-2">
            <h1 className="font-medium text-gray-500 text-md">Reacting Role Mode</h1>
            <div className="flex flex-col relative w-full mb-3">
                <div className="w-full h-[40px] bg-stone-950 rounded-lg cursor-pointer px-4 flex justify-between items-center" onClick={() => setDropMenu((prev) => !prev)}>
                    <h1 className="text-gray-300 font-medium">
                        {selectValue.name}
                    </h1>
                    <i className={`font-bold text-gray-600 text-xl transition-all duration-300 fa-solid fa-angle-up ${dropMenu ? "rotate-180" : "rotate-0"}`}></i>
                </div>
                <div className={`w-full min-h-fit max-h-[200px] border-2 border-neutral-800/50 p-2 rounded-lg bg-stone-950 absolute z-40 bottom-0 left-0 right-0 transition-all duration-300 ${dropMenu? "translate-y-full opacity-100 pointer-events-auto": "translate-y-3/4 opacity-0 pointer-events-none"} overflow-y-scroll`}>
                    {ReactionRolesTypes.map(type => (
                        <h1 className="w-full p-2 rounded-lg cursor-pointer hover:bg-slate-400/25 text-white" key={type.type} onClick={() => {
                            setConfig({...config, type: type.type})
                            setDropMenu(false)
                        }}>
                            {type.name}
                        </h1>
                    ))}
                </div>
                <p className="font-medium text-gray-300 text-sm">{selectValue.description}</p>
            </div>
        </div>
    )
}