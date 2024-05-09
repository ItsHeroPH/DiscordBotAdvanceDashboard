import { faFaceLaughBeam, faSpinner, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Suspense, lazy, useState } from "react";

const SelectChannel = lazy(() => import('./SelectChannel'))
const Message = lazy(() => import('./Message'))

export default function ReactionRoleCreate({ reactionRoles, setReactionroles, setCreateReaction, channels, roles }) {
    const [loading, setLoading] = useState(false)
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
        reactions: []
    })
    return (
        <div className="w-screen h-full fixed bg-neutral-800/50 z-20 flex justify-center items-center py-10 px-2 overflow-y-scroll no-scrollbar">
            <div className="min-w-fit w-[600px]">
                <form onReset={() => setCreateReaction(false)} onSubmit={(e) => {
                    e.preventDefault()
                    setLoading(true)
                    setCreateReaction(false)
                }}>
                    <div className="w-full h-full border-2 border-black rounded-xl drop-shadow-2xl">
                        <div className="w-full p-5 rounded-t-lg bg-neutral-900 border-b-2 border-black flex gap-4 justify-between items-center">
                            <h1 className="font-bold text-white text-xl">
                                <FontAwesomeIcon className="mr-2" icon={faFaceLaughBeam}/>
                                Create Reaction Role
                            </h1>
                            <FontAwesomeIcon className="text-red-600 font-bold text-2xl cursor-pointer" icon={faX} onClick={() => setCreateReaction(false)}/>
                        </div>
                        <div className="w-full h-full bg-neutral-800 p-5">
                            <Suspense fallback={
                                <div className="w-full h-[20px] rounded-full animate-pulse bg-neutral-500"></div>
                            }>
                                <SelectChannel config={config} setConfig={setConfig} channels={channels} readOnly={false}/>
                            </Suspense>
                            <div className="my-3 w-full h-[2px] rounded-full bg-neutral-700"></div>
                            <Suspense fallback={
                                <div className="w-full h-[20px] rounded-full animate-pulse bg-neutral-500"></div>
                            }>
                                <Message config={config} setConfig={setConfig}/>
                            </Suspense>
                        </div>
                        <div className="w-full p-5 rounded-b-lg bg-neutral-900 border-t-2 border-black flex gap-4 justify-end items-center">
                            <button className="p-2 bg-gray-600/50 rounded-md hover:bg-gray-600 font-medium text-white text-xl" type="reset">Cancel</button>
                            <button className="p-2 bg-sky-600 rounded-md hover:bg-sky-800 font-medium text-white text-xl" type="submit">{ loading ? (<FontAwesomeIcon className="animate-spin mx-4" icon={faSpinner}/>) : "Create"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}