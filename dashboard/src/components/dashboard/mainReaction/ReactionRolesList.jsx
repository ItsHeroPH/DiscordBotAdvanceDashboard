import { useEffect, useMemo } from "react"
import { useState } from "react"
import { ReactionRolesTypes } from "../../../utils/constants"

export default function ReactionRolesList({ reaction, channels, roles, setConfigEdit, setReactionsConfig, setDeleteNotif }) {
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
    const channel = useMemo(() => channels.find(ch => ch.id === reaction.channel), [])
    const type = useMemo(() => ReactionRolesTypes.find((t) => t.type == reaction.type))
    return (
        <div className="w-full h-fit bg-neutral-950 rounded px-6 py-2 flex flex-wrap xl:grid grid-cols-12 gap-3 xl:gap-16 items-center my-2">
            <div className="flex flex-col gap-2 col-span-3">
                <h1 className="text-md text-gray-500 font-medium">Channel Name:</h1>
                <h1 className="font-bold text-white text-lg">
                    <i className="font-black fa-solid fa-hashtag mr-3"></i>
                    {channel?.name}
                </h1>
            </div>
            <div className="flex flex-col gap-2 col-span-6">
                <h1 className="text-md text-gray-500 font-medium">Role List:</h1>
                <div className="w-fit h-fit flex flex-row flex-wrap gap-3">
                    {roleList.map(r => (
                        <div className="w-fit p-2 rounded-full flex flex-row gap-2 items-center bg-gray-700 border-2 border-dashed" style={{
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
            </div>
            <div className="flex flex-col gap-2 col-span-1">
                <h1 className="text-md text-gray-500 font-medium">Mode:</h1>
                <h1 className="font-bold text-white text-lg">
                    {type.name}
                </h1>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
                <h1 className="text-md text-gray-500 font-medium">Actions:</h1>
                <div className="flex gap-4">
                    <div className="w-[40px] h-[40px] bg-gray-700 rounded-lg flex justify-center items-center font-black text-xl text-gray-400 cursor-pointer relative group" onClick={() => {
                        setConfigEdit(reaction)
                    }}>
                        <div className="px-3 py-1.5 bg-neutral-800 rounded-lg absolute -top-10 font-bold text-gray-300 text-sm pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100">
                            Edit
                        </div>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className="w-[40px] h-[40px] bg-red-700 rounded-lg flex justify-center items-center font-black text-xl text-red-200 cursor-pointer relative group" onClick={async() => {
                        setDeleteNotif(reaction)
                    }}>
                        <div className="px-3 py-1.5 bg-neutral-800 rounded-lg absolute -top-10 font-bold text-gray-300 text-sm pointer-events-none transition-all duration-200 opacity-0 group-hover:opacity-100">
                            Delete
                        </div>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}