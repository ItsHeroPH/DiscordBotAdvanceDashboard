import { faEdit, faHashtag, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import ReactionRoleModes from "../../../utils/ReactionRoleModes";

export default function ReactionRolesList({ config, channels, roles }) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th className="border-2 border-black text-white font-bold text-xl py-2">Channel</th>
                    <th className="border-2 border-black text-white font-bold text-xl py-2 hidden md:table-cell">Roles</th>
                    <th className="border-2 border-black text-white font-bold text-xl py-2 hidden lg:table-cell">Mode</th>
                    <th className="border-2 border-black text-white font-bold text-xl py-2">Actions</th>
                </tr>
            </thead>
            <tbody>
                { config.map((reaction, i) => (
                    <List key={reaction.messageId} reaction={reaction} channels={channels} roles={roles} index={i}/>
                ))}
            </tbody>
        </table>
    )
}

function List({ reaction, channels, roles, index }) {
    const channel = useMemo(() => channels.find((ch) => ch.id == reaction.channel),[channels])
    const bg = useMemo(() => (index + 1) % 2 === 0 ? "bg-zinc-800" : "bg-zinc-800/50", [index])
    const [roleList, setRoleList] = useState([])
    useEffect(() => {
        let ROLES = []
        reaction.reactions.map(reactionList => {
            reactionList.roles.map(role => {
                const roleToPush = roles.find(r => r.id == role)
                ROLES.push({
                    name: roleToPush.name,
                    id: roleToPush.id,
                    color: roleToPush.color.toString(16).padStart(6,'0') == "000000" ? "#828282" : `#${roleToPush.color.toString(16).padStart(6,'0')}`
                })
            })
        })
        setRoleList(ROLES)
    }, [reaction.reactions])
    const type = useMemo(() => ReactionRoleModes.find((t) => t.type == reaction.type))
    return (
        <tr>
            <td className={`text-white font-medium text-xl border-2 border-black px-3 py-2 ${bg}`}>
                <FontAwesomeIcon className="mr-2" icon={faHashtag}/>
                {channel.name}
            </td>
            <td className={`border-2 border-black px-3 py-2 ${bg} hidden md:table-cell`}>
                <div className="flex flex-wrap gap-2">
                    {roleList.map(r => (
                        <div className="w-fit p-2 rounded-full flex flex-row gap-2 items-center bg-gray-700 border-2 border-dashed grow-0" style={{
                            borderColor: r.color
                        }} key={r.id}>
                            <div className="w-[15px] h-[15px] rounded-full" style={{
                                backgroundColor: r.color
                            }}/>
                            <h1 className="text-md font-bold" style={{
                                color: r.color
                            }}>{r.name}</h1>
                        </div>
                    ))}
                </div>
            </td>
            <td className={`text-white font-medium text-xl text-center border-2 border-black px-3 py-2 ${bg} hidden lg:table-cell`}>
                {type.name}
            </td>
            <td className={`border-2 border-black px-3 py-2 ${bg}`}>
                <div className="flex flex-wrap gap-4 justify-center">
                <div className="w-[40px] h-[40px] bg-gray-700 rounded-lg flex justify-center items-center font-black text-xl text-gray-400 cursor-pointer relative group" onClick={() => {
                    }}>
                        <div className="px-3 py-1.5 bg-neutral-800 rounded-lg absolute -top-10 font-bold text-gray-300 text-sm pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100">
                            Edit
                        </div>
                        <FontAwesomeIcon icon={faEdit}/>
                    </div>
                    <div className="w-[40px] h-[40px] bg-red-700 rounded-lg flex justify-center items-center font-black text-xl text-red-200 cursor-pointer relative group" onClick={async() => {
                    }}>
                        <div className="px-3 py-1.5 bg-neutral-800 rounded-lg absolute -top-10 font-bold text-gray-300 text-sm pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100">
                            Delete
                        </div>
                        <FontAwesomeIcon icon={faTrashCan}/>
                    </div>
                </div>
            </td>
        </tr>
    )
}