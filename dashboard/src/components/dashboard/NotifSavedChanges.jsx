import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"

export default function NotifSavedChanges({ duration, setCloseNotif }) {
    const [notif, setNotif] = useState(false)
    useEffect(() => {
        setTimeout(() => setNotif(true), 1)
        setTimeout(() => setNotif(false), duration - 200)
    }, [])
    
    const handleClose = () => {
        setNotif(false)
        setTimeout(() => setCloseNotif(false), 199)
    }
    return (
        <div className={`w-full bg-green-700 rounded-md border-2 border-black flex justify-between items-center transition-all duration-200 ${notif ? "skew-x-0 pointer-events-auto": "skew-x-12 pointer-events-none"}`}>
            <h1 className="text-white text-lg px-3 py-3">Changes Saved</h1>
            <FontAwesomeIcon className="px-5 py-5 bg-green-800/50 font-bold text-white cursor-pointer rounded-r-md border-l-2 border-black" icon={faX} onClick={handleClose}/>
        </div>
    )
}