import { Suspense, useMemo } from "react";

export default function EmbedPreview({ bot, config }) {
    const date = new Date(Date.now())
    const formatedDate = useMemo(() => `Today at ${(date.getHours() % 12) == 0 ? 12 : (date.getHours() % 12)}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`} ${(date.getHours()/12) > 1 ? "PM": "AM"}`, [date])
    const formatedDate2 = useMemo(() => `${date.toDateString()} ${(date.getHours() % 12) == 0 ? 12 : (date.getHours() % 12)}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`} ${(date.getHours()/12) > 1 ? "PM": "AM"}`, [date])
    return (
        <div className="w-full h-fit drop-shadow-xl border-2 border-black rounded-lg col-span-1">
            <div className="w-full px-5 py-3 rounded-t-lg border-b-2 border-b-black bg-zinc-800">
                <h1 className="font-bold text-white text-md">
                    Embed Preview
                </h1>
            </div>
            <div className="w-full py-3 rounded-b-lg bg-zinc-700">
                <div className="w-full px-5 py-2 flex gap-3 hover:bg-gray-800/40">
                    <Suspense fallback={
                        <div className="w-[38px] h-[38px] bg-zinc-900 rounded-full cursor-pointer hover:shadow-lg"></div>
                    }>
                        <img className="w-[38px] h-[38px] rounded-full cursor-pointer hover:shadow-lg" src={bot.displayAvatarURL}/>
                    </Suspense>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-1 items-center">
                            <h1 className="text-white text-md cursor-pointer hover:underline">{bot.username}</h1>
                            <div className="px-1.5 py-0.5 text-white font-bold text-[10px] rounded-md bg-indigo-600">BOT</div>
                            <div className="flex jusify-center group">
                                <p className="text-gray-400 font-medium text-[11px]">{formatedDate}</p>
                                <div className="px-2 py-1 text-sm text-gray-300 font-medium rounded-md bg-zinc-900 absolute -translate-x-1/4 -translate-y-full hidden group-hover:block">{formatedDate2}</div>
                            </div>
                        </div>
                        <div className="px-3 py-2 border-l-4 rounded-md bg-zinc-800" style={{
                            borderColor: config.embedColor
                        }}>
                            <h1 className="font-bold text-white text-md mb-3">Embed Sample Title</h1>
                            <p className="font-thin text-gray-400 text-sm">This is the Embed Sample Description</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}