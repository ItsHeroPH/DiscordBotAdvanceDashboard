import { useMemo, useState } from "react"
import ReactionRoleModes from "../../../utils/ReactionRole/ReactionRoleModes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

export default function SelectType({ config, setConfig }) {
    const [dropMenu, setDropMenu] = useState(false)
    const type = useMemo(() => ReactionRoleModes.find((mode) => mode.type === config.type), [config.type])
    return (
        <>
            <h1 className="font-bold text-white text-2xl mb-5">Message Channel</h1>
            <div className="relative">
                <div className="w-full flex justify-between items-center bg-neutral-600 rounded-md border-2 border-black cursor-pointer" onClick={() => setDropMenu((p) => !p)}>
                    <h1 className="font-bold text-white text-lg px-4 py-2">{type.name}</h1>
                    <FontAwesomeIcon className={`font-bold text-gray-400 text-xl mr-4 translate-all duration-200 ${dropMenu ? "rotate-180" : "rotate-0"}`} icon={faCaretDown}/>
                </div>
                <div className={`w-full min-h-fit max-h-[200px] rounded-lg bg-neutral-600 border-2 border-black overflow-y-scroll absolute transition-all duration-200 ${dropMenu ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"}`}>
                    { ReactionRoleModes.map((mode) => (
                        <div className="w-full px-4 py-2 hover:bg-neutral-700 cursor-pointer" key={mode.type} onClick={() => {
                            setConfig({...config, type: mode.type})
                            setDropMenu(false)
                        }}>
                            <h1 className="font-medium text-white">{mode.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <p className="font-medium text-gray-400 text-md">{type.description}</p>
        </>
    )
}