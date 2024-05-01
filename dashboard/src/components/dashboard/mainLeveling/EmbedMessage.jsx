import { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { useInView } from "react-intersection-observer";

export default function EmbedMessage({ config, setConfig }) {
    const [embedColorPicker, setEmbedColorPicker] = useState(false)

    return (
        <div className={`w-fit sm:w-[400px] p-3 rounded-lg bg-stone-700 border-l-8 flex flex-row flex-wrap justify-between ${config.anouncement.messageEmbed ? "" : "hidden"}`} style={{borderLeftColor: config.anouncement.embed.color}}>
            <div className="w-full">
                <h1 className="text-md text-gray-300 font-medium">Embed Color</h1>
                <div className="flex flex-col">
                    <div className={`absolute translate-y-[-105%] ${embedColorPicker ? "": "hidden"}`}>
                        <ChromePicker className="!bg-neutral-800" color={config.anouncement.embed.color} onChange={(color) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, color: color.hex}}})}/>
                    </div>
                    <div className="relative w-[45px] h-[45px] rounded-lg border-4 border-stone-800 text-end px-1 cursor-pointer" onClick={() => setEmbedColorPicker((prev) => !prev)} style={
                            {
                                backgroundColor: `${config.anouncement.embed.color}`
                            }
                    }>
                        <i className="text-white text-sm fa-solid fa-eye-dropper"></i>
                    </div>
                </div>
                <h1 className="text-md text-gray-300 font-medium">Thumbnail</h1>
                <div className="w-full sm:w-[300px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                    <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="image url" defaultValue={config.anouncement.embed.thumbnail} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, thumbnail: e.target.value}}}) }/>
                </div>
            </div>
            <div className="w-full">
                <h1 className="text-md text-gray-300 font-medium">Author</h1>
                <div className="flex flex-row flex-wrap gap-1">
                    <div className="w-full sm:w-[100px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="icon_url" defaultValue={config.anouncement.embed.author.icon} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, author: {...config.anouncement.embed.author, icon: e.target.value}}}}) }/>
                    </div>
                    <div className="w-full sm:w-[200px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="name" defaultValue={config.anouncement.embed.author.name} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, author: {...config.anouncement.embed.author, name: e.target.value}}}}) }/>
                    </div>
                    <div className="w-full sm:w-[60px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="url" defaultValue={config.anouncement.embed.author.url} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, author: {...config.anouncement.embed.author, url: e.target.value}}}}) }/>
                    </div>
                </div>
                <h1 className="text-md text-gray-300 font-medium">Title</h1>
                <div className="flex flex-row flex-wrap gap-1">
                    <div className="w-full sm:w-[100px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="url" defaultValue={config.anouncement.embed.url} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, url: e.target.value}}}) }/>
                    </div>
                    <div className="w-full sm:w-[250px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="title" defaultValue={config.anouncement.embed.title} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, title: e.target.value}}}) }/>
                    </div>
                </div>
                <h1 className="text-md text-gray-300 font-medium">Description</h1>
                <div className="w-full sm:w-[350px] rounded-lg bg-neutral-800">
                    <textarea className="w-full min-h-[100px] max-h-[400px] bg-transparent outline-none text-lg text-gray-300 px-3 py-1 font-semibold" onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, description: e.target.value}}}) } defaultValue={config.anouncement.embed.description} maxLength={4096}/>
                </div>
                { config.anouncement.embed.fields.map((field, index) => (
                    <EmbedField config={config} setConfig={setConfig} field={field} index={index} key={index}/>
                ))}
                <div className={`w-full sm:w-[350px] h-[35px] my-1 bg-zinc-800 text-lg text-white font-medium text-center py-1 rounded-lg cursor-pointer ${config.anouncement.embed.fields.length == 25 ? "hidden" : ""}`} onClick={() => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, fields: [...config.anouncement.embed.fields, {name: "", value: "", inline: false }] }}})}>Add Field</div>
                <h1 className="text-md text-gray-300 font-medium">Image</h1>
                <div className="w-full sm:w-[350px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                    <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="image url" defaultValue={config.anouncement.embed.image} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, image: e.target.value}}}) }/>
                </div>
                <h1 className="text-md text-gray-300 font-medium">Footer</h1>
                <div className="flex flex-row flex-wrap gap-1">
                    <div className="w-full sm:w-[100px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="icon url" defaultValue={config.anouncement.embed.footer.icon} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, url: e.target.value}}}) }/>
                    </div>
                    <div className="w-full sm:w-[250px] h-[35px] rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                        <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" placeholder="footer" defaultValue={config.anouncement.embed.footer.text} onChange={(e) => setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, title: e.target.value}}}) }/>
                    </div>
                </div>
                <div className="flex gap-2 my-1 items-center">
                    <label className={`w-[40px] h-[20px] ${config.anouncement.embed.timestamp ? "bg-sky-500" : "bg-gray-600"} transition-all duration-200 ease-out transform inline-block relative rounded-full shadow-inner cursor-pointer`} onClick={() => 
                        setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, timestamp: !config.anouncement.embed.timestamp }}})
                    }>
                        <span className={`w-[15px] h-[15px] rounded-full bg-white absolute transition-all duration-200 ease-out transform ${config.anouncement.embed.timestamp ? "translate-x-[140%]" : "translate-x-[20%]"} top-0.5 bottom-0.5`}/>
                    </label>
                    <h1 className="text-md text-gray-300 font-medium">Timestamp</h1>
                </div>
            </div>
            
        </div>
    )
}
function EmbedField({ config, setConfig, field, index }) {
    const fields = config.anouncement.embed.fields
    const [ref, inView] = useInView({
        threshold: 0
    })
    const [view, setView] = useState(false)

    useEffect(() => {
        if(inView) setView(true)
    }, [inView])
    return(
        <div className={`w-full sm:w-[350px] p-4 rounded-lg bg-slate-800/25 hover:bg-slate-400/25 my-1 transition-all ease-in duration-300 ${view ? "scale-100 opacity-100" : "scale-50 opacity-0"}`} ref={ref}>
            <div className="flex justify-between">
                <h1 className="text-sm text-gray-300 font-medium">Field #{index + 1}</h1>
                <div className="text-red-800 text-xl cursor-pointer" onClick={() => 
                    setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, fields: fields.filter((_,i) => i !== index)}}})
                }><i className="fa-solid fa-circle-xmark"></i></div>
            </div>
            <h1 className="text-sm text-gray-300 font-medium">Name</h1>
            <div className="w-full h-[35px] my-0.5 rounded-lg border-sky-500 hover:border-2 bg-neutral-800">
                <input className="w-full h-full bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" defaultValue={field.name} required={true} onChange={(e) => {
                    fields[index] = {...fields[index], name: e.target.value }
                    setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, fields: [...fields] }}})
                }}/>
            </div>
            <h1 className="text-sm text-gray-300 font-medium">Value</h1>
            <div className="w-full rounded-lg bg-neutral-800">
                <textarea className="w-full min-h-[50px] max-h-[400px] bg-transparent outline-none text-sm text-gray-300 px-3 py-1 font-semibold" defaultValue={field.value} required={true} onChange={(e) => {
                    fields[index] = {...fields[index], value: e.target.value }
                    setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, fields: [...fields] }}})
                }}  maxLength={1024}/>
            </div>
            <div className="flex gap-2 my-1 items-center">
                <label className={`w-[40px] h-[20px] ${field.inline ? "bg-sky-500" : "bg-gray-600"} transition-all duration-200 ease-out transform inline-block relative rounded-full shadow-inner cursor-pointer`} onClick={() => {
                    fields[index] = {...fields[index], inline: !field.inline }
                    setConfig({...config, anouncement: {...config.anouncement, embed: {...config.anouncement.embed, fields: [...fields] }}})
                }}>
                    <span className={`w-[15px] h-[15px] rounded-full bg-white absolute transition-all duration-200 ease-out transform ${field.inline ? "translate-x-[140%]" : "translate-x-[20%]"} top-0.5 bottom-0.5`}/>
                </label>
                <h1 className="text-sm text-gray-300 font-medium">Inline Field</h1>
            </div>
        </div>
    )
}