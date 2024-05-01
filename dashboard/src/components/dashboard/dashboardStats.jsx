import { useEffect,  } from "react"

export default function DashboardStats({ guild, guildConfig }) {
    let join1 = []
    let join2 = []
    let leaves1 = []
    let leaves2 = []

    useEffect(() => {
        guildConfig.joins.filter(j => {
            let x = Date.now() - j;
            let created = Math.floor(x / 86400000)
            if(7 > created) {
                join2.push(j)
            }
            if(1 > created) {
                join1.push(j)
            }
        })
    
        guildConfig.leaves.filter(l => {
            let x = Date.now() - l;
            let created = Math.floor(x / 86400000)
            if(7 > created) {
                leaves2.push(l)
            }
            if(1 > created) {
                leaves1.push(l)
            }
        })

    }, [])

    return (
        <div className="w-fit flex flex-row flex-wrap gap-20 justify-center rounded-lg mx-auto my-4 p-5 bg-neutral-900">
            <div className="grid grid-cols-subgrid sm:grid-cols-2 gap-4">
                <div className="w-[200px] h-[75px] bg-gradient-to-tr from-amber-700 via-amber-800 to-amber-500 rounded-lg shadow-xl">
                    <div className="p-3">
                        <h1 className="text-2xl text-gray-200 font-bold">{guild.memberCount}</h1>
                        <h1 className="text-sm text-gray-200 font-medium">Server Members</h1>
                    </div>
                </div>
                <div className="w-[200px] h-[75px] bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-500 rounded-lg shadow-xl">
                    <div className="p-3">
                        <h1 className="text-2xl text-gray-200 font-bold">{guild.channels.length}</h1>
                        <h1 className="text-sm text-gray-200 font-medium">Channels</h1>
                    </div>
                </div>
                <div className="w-[200px] h-[75px] bg-gradient-to-tr from-slate-700 via-slate-800 to-slate-500 rounded-lg shadow-xl">
                    <div className="p-3">
                        <h1 className="text-2xl text-gray-200 font-bold">{guild.roles.length}</h1>
                        <h1 className="text-sm text-gray-200 font-medium">Roles</h1>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-subgrid sm:grid-cols-2 gap-4">
                <div className="w-[200px] h-[75px] bg-gradient-to-tr from-green-700 via-green-800 to-green-500 rounded-lg shadow-xl">
                    <div className="p-3">
                        <h1 className="text-2xl text-gray-200 font-bold">{join1.length}</h1>
                        <h1 className="text-sm text-gray-200 font-medium">Joins Today</h1>
                    </div>
                </div>
                <div className="w-[200px] h-[75px] bg-gradient-to-tr from-lime-700 via-lime-800 to-lime-500 rounded-lg shadow-xl">
                    <div className="p-3">
                        <h1 className="text-2xl text-gray-200 font-bold">{join2.length}</h1>
                        <h1 className="text-sm text-gray-200 font-medium">Joins this Week</h1>
                    </div>
                </div>
                <div className="w-[200px] h-[75px] bg-gradient-to-tr from-red-700 via-red-800 to-red-500 rounded-lg shadow-xl">
                    <div className="p-3">
                        <h1 className="text-2xl text-gray-200 font-bold">{leaves1.length}</h1>
                        <h1 className="text-sm text-gray-200 font-medium">Leaves Today</h1>
                    </div>
                </div>
                <div className="w-[200px] h-[75px] bg-gradient-to-tr from-rose-700 via-rose-800 to-rose-500 rounded-lg shadow-xl">
                    <div className="p-3">
                        <h1 className="text-2xl text-gray-200 font-bold">{leaves2.length}</h1>
                        <h1 className="text-sm text-gray-200 font-medium">Leaves this Week</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}