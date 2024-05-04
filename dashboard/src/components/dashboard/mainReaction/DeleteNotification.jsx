import { API_URL } from "../../../utils/constants"
import submitForm from "../../../utils/submitForm"

export default function DeleteNotification({ data, setDeleteNotif, setReactionsConfig }) {
    return (
        <div className="w-full h-full fixed z-40 bg-stone-950/40 top-0 right-0 left-0 bottom-0 flex justify-center items-center">
            <div className="h-fit min-w-fit max-w-[500px] bg-neutral-900 rounded-xl shadow-xl flex flex-wrap justify-between items-center gap-6 py-3 px-4 mx-4">
                <h1 className="font-bold text-white text-lg">Are you sure you want to delete it</h1>
                <div className="flex gap-3">
                    <div className="px-3 py-1.5 font-medium text-gray-300 text-lg rounded-md cursor-pointer hover:bg-slate-300/25" onClick={() => {
                        setDeleteNotif(false)
                    }}>Cancel</div>
                    <div className="px-3 py-1.5 font-medium text-red-200 text-lg rounded-md cursor-pointer bg-red-600" onClick={async() => {
                        const newReactionRole = await submitForm(`${API_URL}/guild/${data.guildId}/config/reactionroles/${data.messageId}/delete`, data)
                        setReactionsConfig(newReactionRole.config)
                        setDeleteNotif(false)
                    }}>Delete</div>
                </div>
            </div>
        </div>
)
}