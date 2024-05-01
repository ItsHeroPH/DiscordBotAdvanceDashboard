import { useState } from "react"

export default function XPRate({ config, setConfig }) {
    const [dropMenu, setDropMenu] = useState(true)
    return (
        <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                <div>
                    <h1 className="text-xl text-white font-bold">XP Rate</h1>
                    <p className="text-md text-gray-600 font-medium">Here you can customize the XP Rate that member can obtain</p>
                </div>
                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
            </div>
            <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                <div className="w-full h-[2px] bg-slate-400/25"></div>
                <div className="my-4 mx-4">
                    <h1 className="text-md text-gray-300 font-medium">XP Rate</h1>
                    <div className="flex flex-row flex-wrap gap-3">
                        <div className="m-1">
                            <h1 className="text-md text-gray-500 font-medium">Minimum</h1>
                            <div className="w-[100px] h-[40px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                                <input className="w-full h-full bg-transparent outline-none text-md text-gray-300 px-3 py-1 font-semibold" placeholder="Minimum XP" defaultValue={config.xp.minimum} onChange={(e) => 
                                    setConfig({...config, xp: {...config.xp, minimum: e.target.value }}) 
                                }/>
                            </div>
                        </div>
                        <div className="m-1">
                            <h1 className="text-md text-gray-500 font-medium">Maximum</h1>
                            <div className="w-[100px] h-[40px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                                <input className="w-full h-full bg-transparent outline-none text-md text-gray-300 px-3 py-1 font-semibold" placeholder="Maximum XP" defaultValue={config.xp.maximum} onChange={(e) => 
                                    setConfig({...config, xp: {...config.xp, maximum: e.target.value }}) 
                                }/>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-md text-gray-300 font-medium">XP Multiplier</h1>
                    <div className="w-[348px] sm:flex justify-between hidden">
                        <h1 className="text-sm text-gray-500 font-medium">0.1x</h1>
                        <h1 className="text-sm text-gray-500 font-medium">0.5x</h1>
                        <h1 className="text-sm text-gray-500 font-medium">1.0x</h1>
                        <h1 className="text-sm text-gray-500 font-medium">1.5x</h1>
                        <h1 className="text-sm text-gray-500 font-medium">2.0x</h1>
                    </div>
                    <label>
                        <input type="range" className="w-full sm:w-[350px] h-[15px] rounded-full slider" style={{
                            background: `linear-gradient(90deg, #0284c7 ${(config.xp.multiplier / 2) * 100}%, #27272a ${(config.xp.multiplier / 2) * 100}%)`
                        }} defaultValue={config.xp.multiplier} max={2} min={0.1} step={0.1} onChange={(e) => setConfig({...config, xp: {...config.xp, multiplier: e.target.value }})}/>
                    </label>
                </div>
            </div>
        </div>
    )
}