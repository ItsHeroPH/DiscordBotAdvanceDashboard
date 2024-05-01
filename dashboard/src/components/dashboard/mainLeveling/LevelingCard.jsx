import { useEffect, useRef, useState } from "react";
import drawLevelingCard from "../../../utils/drawLevelingCard";
import { ChromePicker } from "react-color";

export default function LevelingCard({ config, setConfig, user }) {
    const [dropMenu, setDropMenu] = useState(true)
    const [avatarColor, setAvatarColor] = useState(false)
    const [textColor, setTextColor] = useState(false)
    const [usernameColor, setUsernameColor] = useState(false)
    const [overlayColor, setOverlayColor] = useState(false)
    const [progressBarColor, setProgressBarColor] = useState(false)

    const ref = useRef(null)
    useEffect(() => {
        const canvas = ref.current
        const context = canvas.getContext("2d")
        drawLevelingCard(context, config.card, user)
    }, [config])
    return (
        <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                <div>
                    <h1 className="text-xl text-white font-bold">Rank Card</h1>
                    <p className="text-md text-gray-600 font-medium">Here you can customize the server rank cards</p>
                </div>
                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
            </div>
            <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                <div className="w-full h-[2px] bg-slate-400/25"></div>
                <div className="my-4 mx-4 relative">
                    <h1 className="text-md text-gray-500 font-medium">Preview</h1>
                    <div className="min-w-fit max-w-[467px] aspect-[3.31/1] relative">
                        <canvas className="rounded-xl w-full h-full block" ref={ref} width={467} height={141}/>
                    </div>
                    <h1 className="text-lg text-gray-300 font-medium my-2">Customization</h1>
                    <h1 className="text-md text-gray-300 font-medium">Background</h1>
                    <p className="text-gray-500 text-sm font-medium my-1">- The image url must be an <span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">imgur.com</span> link</p>
                    <p className="text-gray-500 text-sm font-medium my-1">- The image format must be <span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">png</span> or <span className="text-red-400 font-thin p-1 bg-zinc-950 rounded-lg">jpeg</span></p>
                    <div className="min-w-fit max-w-[450px] h-[45px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full relative bg-transparent outline-none text-lg text-gray-300 px-3 py-1 font-semibold" placeholder="image url" 
                        pattern="(https:)?\/\/(\w+\.)?imgur\.com\/(\S*)(\.[a-zA-Z]{3,4})"
                        defaultValue={config.card.background} onChange={(e) => setConfig({...config, card: {...config.card, background: e.target.value }})}/>
                    </div>
                    <div className="flex flex-row flex-wrap">
                        <div className="m-2">
                            <h1 className="text-md text-gray-300 font-medium">Avatar Color</h1>
                            <div className="flex flex-col">
                                <div className={`absolute translate-y-[-105%] ${avatarColor ? "": "hidden"}`}>
                                    <ChromePicker className="!bg-neutral-800" color={config.card.color.avatar} onChange={(color) => setConfig({...config, card: {...config.card, color: {...config.card.color, avatar: color.hex }}})}/>
                                </div>
                                <div className="relative w-[45px] h-[45px] rounded-lg border-4 border-stone-800 text-end px-1 cursor-pointer" onClick={() => {
                                    setAvatarColor((prev) => !prev)
                                    setOverlayColor(false)
                                    setUsernameColor(false)
                                    setTextColor(false)
                                    setProgressBarColor(false)
                                }} style={
                                        {
                                            backgroundColor: `${config.card.color.avatar}`
                                        }
                                }>
                                    <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                                </div>
                            </div>
                        </div>
                        <div className="m-2">
                            <h1 className="text-md text-gray-300 font-medium">Username Color</h1>
                            <div className="flex flex-col">
                                <div className={`absolute translate-y-[-105%] ${usernameColor ? "": "hidden"}`}>
                                    <ChromePicker className="!bg-neutral-800" color={config.card.color.username} onChange={(color) => setConfig({...config, card: {...config.card, color: {...config.card.color, username: color.hex }}})}/>
                                </div>
                                <div className="relative w-[45px] h-[45px] rounded-lg border-4 border-stone-800 text-end px-1 cursor-pointer" onClick={() => {
                                    setAvatarColor(false)
                                    setOverlayColor(false)
                                    setUsernameColor((prev) => !prev)
                                    setTextColor(false)
                                    setProgressBarColor(false)
                                }} style={
                                        {
                                            backgroundColor: `${config.card.color.username}`
                                        }
                                }>
                                    <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                                </div>
                            </div>
                        </div>
                        <div className="m-2">
                            <h1 className="text-md text-gray-300 font-medium">Text Color</h1>
                            <div className="flex flex-col">
                                <div className={`absolute translate-y-[-105%] ${textColor ? "": "hidden"}`}>
                                    <ChromePicker className="!bg-neutral-800" color={config.card.color.text} onChange={(color) => setConfig({...config, card: {...config.card, color: {...config.card.color, text: color.hex}}})}/>
                                </div>
                                <div className="relative w-[45px] h-[45px] rounded-lg border-4 border-stone-800 text-end px-1 cursor-pointer" onClick={() => {
                                    setAvatarColor(false)
                                    setOverlayColor(false)
                                    setUsernameColor(false)
                                    setTextColor((prev) => !prev)
                                    setProgressBarColor(false)
                                }} style={
                                        {
                                            backgroundColor: `${config.card.color.text}`
                                        }
                                }>
                                    <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                                </div>
                            </div>
                        </div>
                        <div className="m-2">
                            <h1 className="text-md text-gray-300 font-medium">Overlay Color</h1>
                            <div className="flex flex-col">
                                <div className={`absolute translate-y-[-105%] ${overlayColor ? "": "hidden"}`}>
                                    <ChromePicker className="!bg-neutral-800" color={config.card.color.overlay} onChange={(color) => setConfig({...config, card: {...config.card, color: {...config.card.color, overlay: color.hex}}})}/>
                                </div>
                                <div className="relative w-[45px] h-[45px] rounded-lg border-4 border-stone-800 text-end px-1 cursor-pointer" onClick={() => {
                                    setAvatarColor(false)
                                    setOverlayColor((prev) => !prev)
                                    setUsernameColor(false)
                                    setTextColor(false)
                                    setProgressBarColor(false)
                                }} style={
                                        {
                                            backgroundColor: `${config.card.color.overlay}`
                                        }
                                }>
                                    <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                                </div>
                            </div>
                        </div>
                        <div className="m-2">
                            <h1 className="text-md text-gray-300 font-medium">Progress Bar Color</h1>
                            <div className="flex flex-col">
                                <div className={`absolute translate-y-[-105%] ${progressBarColor ? "": "hidden"}`}>
                                    <ChromePicker className="!bg-neutral-800" color={config.card.color.progressbar} onChange={(color) => setConfig({...config, card: {...config.card, color: {...config.card.color, progressbar: color.hex}}})}/>
                                </div>
                                <div className="relative w-[45px] h-[45px] rounded-lg border-4 border-stone-800 text-end px-1 cursor-pointer" onClick={() => {
                                    setAvatarColor(false)
                                    setOverlayColor(false)
                                    setUsernameColor(false)
                                    setTextColor(false)
                                    setProgressBarColor((prev) => !prev)
                                }} style={
                                        {
                                            backgroundColor: `${config.card.color.progressbar}`
                                        }
                                }>
                                    <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-md text-gray-300 font-medium">Overlay Opacity</h1>
                    <div className="w-[448px] sm:flex justify-between hidden">
                        <h1 className="text-sm text-gray-500 font-medium">0.0</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.1</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.2</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.3</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.4</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.5</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.6</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.7</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.8</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.9</h1>
                        <h1 className="text-sm text-gray-500 font-medium">1.0</h1>
                    </div>
                    <label>
                        <input type="range" className="w-full sm:w-[450px] h-[15px] rounded-full slider" style={{
                            background: `linear-gradient(90deg, #0284c7 ${config.card.overlay * 100}%, #27272a ${config.card.overlay * 100}%)`
                        }} defaultValue={config.card.overlay} max={1} min={0} step={0.1} onChange={(e) => setConfig({...config, card: {...config.card, overlay: e.target.value }})}/>
                    </label>
                </div>
            </div>
        </div>
    )
}