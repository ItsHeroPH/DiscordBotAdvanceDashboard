import { useEffect } from "react"
import { useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

export default function RankRewards({ config, setConfig, roles }) {
    const [dropMenu, setDropMenu] = useState(true)
    return (
        <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
            <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                <div>
                    <h1 className="text-xl text-white font-bold">Rank Reward</h1>
                    <p className="text-md text-gray-600 font-medium">Here you can customize the rewards will be given to the user when they level up</p>
                </div>
                <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
            </div>
            <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                <div className="w-full h-[2px] bg-slate-400/25"></div>
                <div className="my-4 mx-4">
                    <h1 className="text-md text-gray-300 font-medium">Rewards</h1>
                    <div className="w-full rounded-lg bg-zinc-800 border-2 border-sky-600 border-dashed py-3 text-center font-bold text-sky-600 cursor-pointer my-2" onClick={() => {
                        setConfig({...config, rewards: {...config.rewards, rewards: [...config.rewards.rewards, { level: 1, roles: [] }]}})
                    }}>Add Reward</div>
                    <div className="w-full bg-zinc-800 rounded-xl p-1 md:p-5">
                        {config.rewards.rewards.length > 0 ? (
                            config.rewards.rewards.map((reward, i) => (
                                <Rewards config={config} setConfig={setConfig} reward={reward} index={i} roles={roles} key={i}/>
                            ))
                        ) : (
                            <div className="flex flex-col">
                                <h1 className="text-xl text-gray-400 font-bold text-center">There is no rewards yet!</h1>
                                <h1 className="text-md text-gray-600 font-medium text-center">Once you add rewards per level,<br></br>You can see them here</h1>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-row flex-wrap gap-2">
                            <div className={`w-[20px] h-[20px] flex rounded-full ${config.rewards.type == 1 ? "bg-sky-500" : "bg-zinc-800"} items-center justify-center cursor-pointer`} onClick={() => setConfig({...config, rewards: {...config.rewards, type: 1}})}>
                                <span className={`w-1/2 h-1/2 bg-white rounded-full ${config.rewards.type == 1 ? "" : "hidden"}`}></span>
                            </div>
                            <div>
                                <h1 className="text-md text-gray-300 font-medium">Stack previous rewards</h1>
                                <p className="text-md text-gray-500 font-medium">Members can have a multiple rewards at once</p>
                            </div>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2">
                            <div className={`w-[20px] h-[20px] flex rounded-full ${config.rewards.type == 2 ? "bg-sky-500" : "bg-zinc-800"} items-center justify-center cursor-pointer`} onClick={() => setConfig({...config, rewards: {...config.rewards, type: 2}})}>
                                <span className={`w-1/2 h-1/2 bg-white rounded-full ${config.rewards.type == 2 ? "" : "hidden"}`}></span>
                            </div>
                            <div>
                                <h1 className="text-md text-gray-300 font-medium">Remove previous rewards</h1>
                                <p className="text-md text-gray-500 font-medium">Members can only have the highest reward</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-2 flex flex-wrap gap-2 items-center">
                        <label className={`w-[60px] h-[30px] ${config.rewards.removeWhenLoseXP ? "bg-sky-500" : "bg-gray-600"} transition-all duration-200 ease-out transform inline-block relative rounded-full shadow-inner cursor-pointer`} onClick={() => 
                            setConfig({...config, rewards: {...config.rewards, removeWhenLoseXP: !config.rewards.removeWhenLoseXP}})
                            }>
                            <span className={`w-[25px] h-[25px] rounded-full bg-white absolute transition-all duration-200 ease-out transform ${config.rewards.removeWhenLoseXP ? "translate-x-[120%]" : "translate-x-[20%]"} top-0.5 bottom-0.5`}/>
                        </label>
                        <div>
                            <h1 className="text-md text-gray-300 font-medium">Remove rewards after memeber loses XP</h1>
                            <p className="text-sm text-gray-500 font-medium">Remove the rewards if the level doesn't meet the required level</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Rewards({ config, setConfig, reward, index, roles }) {
    const rewards = config.rewards.rewards
    const [dropMenu, setDropMenu] = useState(false)
    const ref = useRef(null)
    const [filter, setFilter] = useState("")
    useEffect(() => {
        if(dropMenu) {
            ref.current.focus()
        } else {
            setFilter("")
            ref.current.blur()
            ref.current.value = ""
        }
    }, [dropMenu])

    const [Ref, inView] = useInView({
        threshold: 0
    })
    const [view, setView] = useState(false)

    useEffect(() => {
        if(inView) setView(true)
    }, [inView])

    return (
        <div className={`w-full p-5 bg-zinc-900 rounded-md my-2 flex flex-wrap justify-center items-center gap-7 transition-all duration-300 transform ${view ? "transform-none opacity-100" : "scale-50 opacity-0"}`} ref={Ref}>
            <div className="flex flex-row flex-wrap items-center gap-2">
                <h1 className="text-xl text-white font-bold">Level</h1>
                <div className="min-w-fit max-w-[200px] h-[45px] rounded-lg bg-neutral-950">
                    <input className="w-full h-full relative bg-transparent outline-none text-lg text-gray-300 px-3 py-1 font-semibold" type="number" min={1} defaultValue={reward.level} required={true}  onChange={(e) => {
                        rewards[index] = {...rewards[index], level: e.target.value }
                        setConfig({...config, rewards: {...config.rewards, rewards: [...rewards]}})
                    }}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-2">
                <h1 className="text-xl text-white font-bold">Role Rewards</h1>
                <div className="flex flex-col relative">
                    <div className="min-w-fit max-w-[500px] min-h-[45px] max-h-fit flex flex-row flex-wrap justify-start gap-2 rounded-lg bg-neutral-950 p-2">
                        { reward.roles.map((role, i) => (
                            <div className="w-fit p-1 rounded-md bg-neutral-800 border-2 border-dashed flex flex-row flex-wrap gap-2 items-center" style={{
                                borderColor: `#${roles.find(r => r.id == role).color.toString(16).padStart(6,'0') == "000000" ? "828282" : roles.find(r => r.id == role).color.toString(16).padStart(6,'0') }`
                            }} key={role}>
                                <div className="w-[20px] h-[20px] rounded-full" style={{
                                    backgroundColor: `#${roles.find(r => r.id == role).color.toString(16).padStart(6,'0') == "000000" ? "828282" : roles.find(r => r.id == role).color.toString(16).padStart(6,'0') }`
                                }}></div>
                                <h1 className="font-medium block" style={{
                                    color: `#${roles.find(r => r.id == role).color.toString(16).padStart(6,'0') == "000000" ? "828282" : roles.find(r => r.id == role).color.toString(16).padStart(6,'0') }`
                                }}>{roles.find(r => r.id == role).name}</h1>
                                <i className="font-bold text-gray-500 fa-regular fa-circle-xmark cursor-pointer" onClick={() => {
                                    rewards[index] =  {...rewards[index], roles: [...rewards[index].roles.filter((_, Index) => Index !== i)]}
                                    setConfig({...config, rewards: {...config.rewards, rewards: [...rewards] }})
                                }}></i>
                            </div>
                        ))}
                        <h1 className="text-white font-bold px-2 py-1 rounded-full w-[32px] h-[32px] bg-zinc-700" onClick={() => setDropMenu((prev) => !prev)}><i className="fa-solid fa-plus"></i></h1>
                        <div className={`w-[100px] h-[30px] ${dropMenu ? "opacity-100 pointer-events-auto": "opacity-0 pointer-events-none"}`}>
                            <input className="w-full h-full outline-none bg-transparent font-bold text-white" ref={ref}
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Search Role"></input>
                        </div>
                    </div>
                    <div className={`w-[500px] min-h-fit max-h-[200px] rounded-lg absolute bottom-0 bg-neutral-950 p-2 z-10 transition-all duration-100 transform ${dropMenu ? "opacity-100 translate-y-full pointer-events-auto" : "opacity-0 translate-y-[100% - 10px] pointer-events-none"} flex flex-col gap-2 overflow-y-scroll`}>
                        { roles.filter(r => !reward.roles.includes(r.id) && r.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((r) => (
                            <div className="w-full p-2 rounded-lg hover:bg-neutral-900 cursor-pointer font-medium" style={{
                                color: `#${r.color.toString(16).padStart(6,'0') == "000000" ? "828282" : r.color.toString(16).padStart(6,'0') }`
                            }} onClick={() => {
                                rewards[index] = {...rewards[index], roles: [...rewards[index].roles, r.id] }
                                setConfig({...config, rewards: {...config.rewards, rewards: [...rewards]}})
                            }} key={r.id} ><i className="fa-solid fa-hashtag mr-2"></i>{r.name}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center bg-red-700 rounded-md w-[30px] h-[30px] cursor-pointer" onClick={() => {
                setConfig({...config, rewards: {...config.rewards, rewards: [...rewards.filter((_, i) => i !== index)]}})
            }}>
                <i className="font-bold text-red-200 fa-solid fa-trash-can"></i>
            </div>
        </div>
    )
}