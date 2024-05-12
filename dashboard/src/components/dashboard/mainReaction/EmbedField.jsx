import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function EmbedField({ config, setConfig, field, index }) {
    const fields = config.embed.fields
    return (
        <>
            <h1 className="font-bold text-white text-md my-2">Field {index + 1}</h1>
            <div className="w-full py-1">
                <div className="grid grid-cols-4 sm:grid-cols-5">
                    <input className="col-span-4 w-full px-3 py-1 font-bold text-white text-lg bg-gray-700 rounded-md border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" defaultValue={field.name} onChange={(e) => {
                        fields[index] = {...fields[index], name: e.target.value }
                        setConfig({...config, embed: {...config.embed, fields: fields } })
                    }} placeholder={`Title for field ${index + 1}`}/>
                    <div className="col-span-2 sm:col-span-1 flex items-center justify-end gap-2">
                        <input className="w-[15px] h-[15px]" type="checkbox" defaultChecked={field.inline} onChange={(e) => {
                            fields[index] = {...fields[index], inline: e.target.value }
                            setConfig({...config, embed: {...config.embed, fields: fields } })
                        }}/>
                        <h1 className="font-medium text-white text-lg">Inline</h1>
                    </div>
                </div>
                <div className="grid grid-cols-7 sm:grid-cols-8">
                    <div className="col-span-7 w-full h-fit rounded-md my-3">
                        <textarea className="w-full min-h-[80px] max-h-[300px] bg-gray-700 rounded-md p-2 font-medium text-white text-lg border-2 border-black transition-all duration-75 focus:border-sky-300 focus:outline outline-4 outline-sky-600/50" placeholder={`Description for field ${index + 1}`} maxLength={4096} onChange={(e) => {
                            fields[index] = {...fields[index], value: e.target.value }
                            setConfig({...config, embed: {...config.embed, fields: fields } })
                        }} defaultValue={field.value}></textarea>
                    </div>
                    <div className="col-span-1 relative h-fit flex justify-center items-center group">
                        <div className="absolute right-0 left-0 -top-12 px-2 py-1 rounded-md bg-stone-800 transition-all duration-100 opacity-0 pointer-events-none group-hover:opacity-100">
                            <h1 className="font-bold text-white text-sm text-center">Remove Field</h1>
                        </div>
                        <FontAwesomeIcon className="px-2.5 py-2 rounded-md text-red-500 font-bold text-lg hover:text-red-300 hover:bg-red-600/40 cursor-pointer" icon={faX} onClick={() => {
                            var newFields = fields.filter((_,i) => i !== index)
                            setConfig({...config, embed: {...config.embed, fields: newFields } })
                        }}/>
                    </div>
                </div>
            </div>
        </>
    )
}