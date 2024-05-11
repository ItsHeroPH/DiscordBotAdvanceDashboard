import { useState } from "react"
import { ChromePicker } from "react-color"

export default function MessageEmbed({ config, setConfig }) {
    const [colorPicker, setColorPicker] = useState(false)
    return(
        <>
            <div className="my-3 w-full h-[2px] rounded-full bg-neutral-700"></div>
            <h1 className="font-bold text-white text-2xl mb-5">Message Embed</h1>
            <div className="w-full h-full bg-zinc-700 rounded-md border-l-4 px-3 py-2" style={{
                borderColor: config.embed.color
            }}>
                <div className="relative mb-2">
                    <div className="px-2 py-1.5 rounded-md bg-sky-600 w-fit font-bold text-white text-md cursor-pointer" onClick={() => setColorPicker((p) => !p)}>Pick a Color</div>
                    <ChromePicker className={`!bg-zinc-800 absolute transition-all duration-200 ${colorPicker ? "opacity-100 bottom-12 pointer-events-auto" : "opacity-0 bottom-8 pointer-events-none"}`} color={config.embed.color} onChange={(color) => setConfig({...config, embed: {...config.embed, color: color.hex }})}/>
                </div>
                <h1 className="font-bold text-white text-md my-2">Author</h1>
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1 px-2">
                        <input className="w-full px-3 py-1 font-bold text-white text-lg bg-gray-700 rounded-md border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" placeholder="Icon URL" defaultValue={config.embed.author.url} onChange={(e) => {
                            setConfig({...config, embed: {...config.embed, author: {...config.embed.author, icon: e.target.value }}})
                        }}/>
                    </div>
                    <div className="col-span-2 px-2">
                        <input className="w-full px-3 py-1 font-bold text-white text-lg bg-gray-700 rounded-md border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" placeholder="Name" defaultValue={config.embed.author.url} onChange={(e) => {
                            setConfig({...config, embed: {...config.embed, author: {...config.embed.author, name: e.target.value }}})
                        }}/>
                    </div>
                    <div className="col-span-1 px-2">
                        <input className="w-full px-3 py-1 font-bold text-white text-lg bg-gray-700 rounded-md border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" placeholder="Name URL" defaultValue={config.embed.author.url} onChange={(e) => {
                            setConfig({...config, embed: {...config.embed, author: {...config.embed.author, url: e.target.value }}})
                        }}/>
                    </div>
                </div>
                <h1 className="font-bold text-white text-md my-2">Title</h1>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="col-span-2 px-2">
                        <input className="w-full px-3 py-1 font-bold text-white text-lg bg-gray-700 rounded-md border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" placeholder="Title" defaultValue={config.embed.title} onChange={(e) => {
                            setConfig({...config, embed: {...config.embed, title: e.target.value }})
                        }}/>
                    </div>
                    <div className="col-span-1 px-2">
                        <input className="w-full px-3 py-1 font-bold text-white text-lg bg-gray-700 rounded-md border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" placeholder="Title URL" defaultValue={config.embed.url} onChange={(e) => {
                            setConfig({...config, embed: {...config.embed, url: e.target.value }})
                        }}/>
                    </div>
                </div>
                <h1 className="font-bold text-white text-md my-2">Description</h1>
                <textarea className="w-full min-h-[100px] max-h-[500px] px-3 py-1 font-bold text-white text-lg bg-gray-700 rounded-md border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" placeholder="Description" onChange={(e) => {
                    setConfig({...config, embed: {...config.embed, description: e.target.value }})
                }} defaultValue={config.embed.description}></textarea>
            </div>
        </>
    )
}