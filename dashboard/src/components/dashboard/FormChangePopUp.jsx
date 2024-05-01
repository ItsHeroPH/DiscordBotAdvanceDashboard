export default function FormChangePopUp({ isChanged, onError }) {
    return(
        <div className={`py-5 sticky bottom-20 w-full transform transition-all duration-300 z-[15] ${isChanged ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"}`}>
            <div className={`${onError ? "bg-red-800 translate-x-5": "bg-stone-900 translate-x-0"} transition-all duration-300 rounded-lg px-4 py-3 w-[80%] mx-auto flex flex-row flex-wrap gap-4 justify-between items-center`}>
                <h1 className="text-md text-white font-bold">Changes detected! Please save or cancel</h1>
                <div className="flex flex-wrap gap-3">
                    <button className="text-md text-white font-light px-2 py-1 bg-gray-500 rounded-md" type="reset">Cancel</button>
                    <button className="text-md text-white font-light px-2 py-1 bg-sky-500 rounded-md" type="submit">Save</button>
                </div>
            </div>
        </div>
    )
}