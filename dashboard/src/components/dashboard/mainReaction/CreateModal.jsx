import { lazy, useState } from "react"
import submitForm from "../../../utils/submitForm"
import { API_URL } from "../../../utils/constants"

const SelectChannel = lazy(() => import('./SelectChannel'))
const Message = lazy(() => import('./Message'))
const EmojiRoles = lazy(() => import('./EmojiRoles'))

export default function CreateModal({ setShowCreate, channels, roles, guildID, setReactionsConfig }) {
    const [config, setConfig] = useState({
        message: "",
        channel: "",
        embed: {
            author: {
                name: "",
                icon: "",
                url: ""
            },
            url: "",
            title: "",
            description: "",
            fields: [],
            thumbnail: "",
            footer: {
                text: "",
                icon: ""
            },
            color: "#000000",
            timestamp: false
        },
        messageEmbed: false,
        type: 1,
        reactions: [],
        blacklist: [],
        whitelist: []
    })
    return (
        <div className="w-screen h-screen bg-stone-950/45 fixed top-0 left-0 right-0 z-20 p-10 flex justify-center items-center">
        <div className={`min-w-fit w-[500px] min-h-fit max-h-[770px] relative rounded-xl bg-zinc-900 shadow-lg border-2 border-gray-700/50`}>
                <form onReset={() => setShowCreate(false)} onSubmit={async(e) => {
                    e.preventDefault()
                    const newReactionRole = await submitForm(`${API_URL}/guild/${guildID}/config/reactionroles`, config)
                    setShowCreate(false)
                    setReactionsConfig(newReactionRole.config)
                }}>
                    <div className="flex flex-row justify-between items-center mb-2 w-full h-full p-4 rounded-t-xl bg-zinc-950 z-40">
                        <h1 className="font-bold text-white text-lg">Create New Reaction Role</h1>
                        <h1 className="font-bold text-red-500 text-3xl cursor-pointer" onClick={() => setShowCreate(false)}><i className="fa-solid fa-xmark"></i></h1>
                    </div>
                    <div className="w-full min-h-[625px - 100vh] max-h-[625px] overflow-auto no-scrollbar px-4">
                        <SelectChannel config={config} setConfig={setConfig} channels={channels}/>
                        <Message config={config} setConfig={setConfig}/>
                        <EmojiRoles config={config} setConfig={setConfig} roles={roles}/>
                    </div>
                    <div className="flex flex-row gap-3 justify-end items-center my-2 w-full h-fit p-2 rounded-b-xl z-50 bg-zinc-950">
                        <button className="w-[100px] p-2 cursor-pointer hover:bg-zinc-700 rounded-md font-medium text-gray-600" type="reset">Close</button>
                        <button className="w-[100px] p-2 cursor-pointer bg-sky-600 rounded-md font-medium text-sky-300" type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
