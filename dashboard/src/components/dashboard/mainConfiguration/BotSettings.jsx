import { faCog, faEyeDropper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ChromePicker } from "react-color";

export default function BotSettings({ config, setConfig }) {
    const [colorPicker, setColorPicker] = useState(false)
    return (
        <div className="w-full h-fit drop-shadow-xl border-2 border-black rounded-lg col-span-1">
            <div className="w-full px-5 py-3 rounded-t-lg border-b-2 border-b-black bg-zinc-800">
                <h1 className="font-bold text-white text-md">
                    <FontAwesomeIcon className="mr-2" icon={faCog}/>
                    Bot Settings
                </h1>
            </div>
            <div className="w-full px-5 py-3 rounded-b-lg bg-zinc-700">
                <h1 className="font-bold text-white text-2xl my-2">Custom Prefix</h1>
                <p className="font-medium text-gray-300 text-lg">Set the custom prefix</p>
                <div className="w-full rounded-lg border-2 border-black flex items-center my-4">
                    <input className="w-full bg-gray-600 rounded-l-lg text-white text-md font-medium px-2 py-1 transition-all duration-75 outline-sky-500/80 focus:outline focus:outline-4" defaultValue={config.prefix} required={true} onChange={(e) => {
                        setConfig({...config, prefix: e.target.value})
                    }}/>
                    <button className="w-fit h-full bg-sky-600 px-2 py-1 rounded-r-lg border-l-2 border-black font-bold text-white text-md text-center cursor-pointer">Save</button>
                </div>
                <h1 className="font-bold text-white text-2xl my-2">Embed Color</h1>
                <p className="font-medium text-gray-300 text-lg">Set the embed color</p>
                <div className="w-full rounded-lg border-2 border-black flex items-center my-4">
                    <div className="relative">
                        <div className="w-[50px] h-[33px] rounded-l-lg border-r-2 border-black flex justify-end px-1.5 py-1 cursor-pointer" style={{
                            backgroundColor: config.embedColor
                        }} onClick={() => setColorPicker((p) => !p)}>
                            <FontAwesomeIcon className="text-white" icon={faEyeDropper}/>
                        </div>
                        <ChromePicker className={`absolute left-0 !bg-zinc-800 transition-all duration-150 ${colorPicker ? "bottom-10 opacity-100 pointer-events-auto" : "bottom-5 opacity-0 pointer-events-none"}`} color={config.embedColor} onChange={(color) => setConfig({...config, embedColor: color.hex})}/>
                    </div>
                    <input className="w-full bg-gray-600 text-white text-md font-medium px-2 py-1 transition-all duration-75 outline-sky-500/80 focus:outline focus:outline-4" value={config.embedColor} readOnly/>
                    <button className="w-fit h-full bg-sky-600 px-2 py-1 rounded-r-lg border-l-2 border-black font-bold text-white text-md text-center cursor-pointer">Save</button>
                </div>
            </div>
        </div>
    )
}