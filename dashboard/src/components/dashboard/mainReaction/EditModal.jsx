import { useState } from "react"
import SelectChannel from "./SelectChannel"
import Message from "./Message"
import EmojiRoles from "./EmojiRoles"
import submitForm from "../../../utils/submitForm"
import { API_URL } from "../../../utils/constants"

export default function EditModal({ setConfigEdit, config, channels, roles, guildID, setReactionsConfig }) {
    return (
        <div className="w-screen h-screen bg-stone-950/45 fixed top-0 left-0 right-0 z-20 p-10 flex justify-center items-center">
            <div className={`min-w-fit w-[500px] min-h-fit max-h-[770px] relative rounded-xl bg-zinc-900 shadow-lg border-2 border-gray-700/50`}>
                <form onReset={() => setConfigEdit(null)} onSubmit={async(e) => {
                    e.preventDefault()
                    const newReactionRole = await submitForm(`${API_URL}/guild/${guildID}/config/reactionroles/${config.messageId}`, config)
                    setReactionsConfig(newReactionRole.config)
                    setTimeout(() => setConfigEdit(null), 100)
                }}>
                    <div className="flex flex-row justify-between items-center mb-2 w-full h-full p-4 rounded-t-xl bg-zinc-950 z-40">
                        <h1 className="font-bold text-white text-lg">Edit Reaction Role</h1>
                        <h1 className="font-bold text-red-500 text-3xl cursor-pointer" onClick={() => setConfigEdit(null)}><i className="fa-solid fa-xmark"></i></h1>
                    </div>
                    <div className="w-full min-h-[625px - 100vh] max-h-[625px] overflow-auto no-scrollbar px-4">
                        <SelectChannel config={config} setConfig={setConfigEdit} channels={channels}/>
                        <Message config={config} setConfig={setConfigEdit}/>
                        <EmojiRoles config={config} setConfig={setConfigEdit} roles={roles}/>
                    </div>
                    <div className="flex flex-row gap-3 justify-end items-center my-2 w-full h-fit p-2 rounded-b-xl z-50 bg-zinc-950">
                        <button className="w-[100px] p-2 cursor-pointer hover:bg-zinc-700 rounded-md font-medium text-gray-600" type="reset">Close</button>
                        <button className="w-[130px] p-2 cursor-pointer bg-sky-600 rounded-md font-medium text-sky-300" type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
