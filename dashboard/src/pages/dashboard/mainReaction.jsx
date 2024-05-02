import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import CreateModal from "../../components/dashboard/mainReaction/CreateModal";
import EditModal from "../../components/dashboard/mainReaction/EditModal";
import submitForm from "../../utils/submitForm";
import { API_URL } from "../../utils/constants";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const NavigationBar = lazy(() => import('../../components/dashboard/NavigationBar'))

export default function MainReaction() {
    const { bot, user, guild, guilds, reactionRoles, channels, roles } = useLoaderData()
    if(user == null) return location.assign("/")
    if(guild == null) return location.assign("/")

    const [dropMenu, setDropMenu] = useState(true)

    const [openSideBar, setOpenSideBar] = useState(false)

    const [showCreate, setShowCreate] = useState(false)

    const [configEdit, setConfigEdit] = useState(null)

    const [reactionsConfig, setReactionsConfig] = useState([...reactionRoles])

    return (
        <HelmetProvider>
            <Helmet>
                <title>{bot.username}</title>
                <link rel="icon" type="image/png" href={bot.displayAvatarURL}/>
            </Helmet>
            <div className="w-screen h-screen bg-stone-800 flex flex-row grow fixed">
                <SideBar bot={bot} guild={guild} guilds={guilds} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
                <div className="w-full lg:w-[calc(100vh - 300px)] h-screen">
                    <NavigationBar bot={bot} user={user} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
                    <div className={`w-full h-full transition-all duration-300 ${openSideBar ? "blur-md" : "blur-0" } relative lg:blur-0 overflow-y-scroll no-scrollbar`}>
                        <div className="p-10 my-10">
                            <h1 className="text-4xl text-white font-bold">Reaction Roles</h1>
                            <div className="w-full px-10 py-5 rounded-lg bg-neutral-900 my-3">
                                <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setDropMenu((prev) => !prev)}>
                                    <div>
                                        <h1 className="text-xl text-white font-bold">Reaction Roles</h1>
                                        <p className="text-md text-gray-600 font-medium">Here you can setup the roles that user can get in reacting</p>
                                    </div>
                                    <i className={`text-2xl text-gray-600 font-black fa-solid fa-angle-up transition-all duration-300 ${dropMenu ? "rotate-0" : "rotate-180"}`}></i>
                                </div>
                                <div className={`mt-5 ${dropMenu ? "": "hidden"}`}>
                                    <div className="w-full h-[2px] bg-slate-400/25"></div>
                                    <div className="min-w-fit max-w-[280px] h-fit p-2 my-3 rounded-md bg-sky-600 font-bold text-white text-lg flex gap-2 items-center justify-center cursor-pointer"
                                        onClick={() => setShowCreate(true)}>
                                        <i className="text-xl fa-solid fa-plus"></i>
                                        Create New Reaction Role
                                    </div>
                                    <div className="w-full h-fit p-3 rounded-lg bg-neutral-800">
                                        { reactionRoles.length == 0 ? (
                                            <div className="flex flex-col">
                                                <h1 className="text-xl text-gray-400 font-bold text-center">There is no reaction roles yet!</h1>
                                                <h1 className="text-md text-gray-600 font-medium text-center">Once you add reaction roles,<br></br>You can see them here</h1>
                                            </div>
                                        ) : reactionsConfig.map((reaction, i) => (
                                            <ReactionRolesList reaction={reaction} channels={channels} roles={roles} setConfigEdit={setConfigEdit} setReactionsConfig={setReactionsConfig} key={i}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        showCreate &&
                        <CreateModal setShowCreate={setShowCreate} channels={channels} roles={roles} guildID={guild.id} setReactionsConfig={setReactionsConfig}/>
                    }
                    {
                        configEdit &&
                        <EditModal setConfigEdit={setConfigEdit} config={configEdit} channels={channels} roles={roles} guildID={guild.id} setReactionsConfig={setReactionsConfig} />
                    }
                </div>
            </div>
        </HelmetProvider>
    )
}

function ReactionRolesList({ reaction, channels, roles, setConfigEdit, setReactionsConfig }) {
    const [roleList, setRoleList] = useState([])
    useEffect(() => {
        setRoleList([])
        for(const reactionList of reaction.reactions) {
            for(const role of reactionList.roles) {
                const roleToPush = roles.find(r => r.id == role)
                setRoleList([...roleList, {
                    name: roleToPush.name,
                    color: roleToPush.color.toString(16).padStart(6,'0') == "000000" ? "#828282" : `#${roleToPush.color.toString(16).padStart(6,'0')}`
                }])
            }
        }
    }, [])
    return (
        <div className="w-full h-fit bg-neutral-950 rounded px-6 py-2 flex flex-wrap md:grid grid-cols-8 gap-16 items-center my-2">
            <div className="flex flex-col gap-2 col-span-3">
                <h1 className="text-md text-gray-500 font-medium">Channel Name:</h1>
                <h1 className="font-bold text-white text-lg">
                    <i className="font-black fa-solid fa-hashtag mr-3"></i>
                    {channels.find(ch => ch.id === reaction.channel)?.name}
                </h1>
            </div>
            <div className="flex flex-col gap-2 col-span-3">
                <h1 className="text-md text-gray-500 font-medium">Role List:</h1>
                <div className="w-fit h-fit flex flex-row flex-wrap gap-3">
                    {roleList.map(r => (
                        <div className="w-fit p-2 rounded-full flex flex-row gap-2 items-center bg-gray-700 border-2 border-dashed" style={{
                            borderColor: r.color
                        }}>
                            <div className="w-[15px] h-[15px] rounded-full" style={{
                                backgroundColor: r.color
                            }}/>
                            <h1 className="text-md font-bold" style={{
                                color: r.color
                            }}>{r.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2 col-span-2">
                <h1 className="text-md text-gray-500 font-medium">Actions:</h1>
                <div className="flex gap-4">
                    <div className="w-[40px] h-[40px] bg-gray-700 rounded-lg flex justify-center items-center font-black text-xl text-gray-400 cursor-pointer" onClick={() => {
                        setConfigEdit(reaction)
                    }}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </div>
                    <div className="w-[40px] h-[40px] bg-red-700 rounded-lg flex justify-center items-center font-black text-xl text-red-200 cursor-pointer" onClick={async() => {
                        const newReactionRole = await submitForm(`${API_URL}/guild/${reaction.guildId}/config/reactionroles/${reaction.messageId}/delete`, reaction)
                        setReactionsConfig(newReactionRole.config)
                    }}>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}