import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

const SideBar = lazy(() => import('../../components/dashboard/SideBar'))
const NavigationBar = lazy(() => import('../../components/dashboard/NavigationBar'))
const ReactionRolesList = lazy(() => import('../../components/dashboard/mainReaction/ReactionRolesList'))
const CreateModal = lazy(() => import("../../components/dashboard/mainReaction/CreateModal"))
const EditModal = lazy(() => import("../../components/dashboard/mainReaction/EditModal"))
const DeleteNotification = lazy(() => import("../../components/dashboard/mainReaction/DeleteNotification"))

export default function MainReaction() {
    const { bot, user, guild, guilds, reactionRoles, channels, roles } = useLoaderData()
    if(user == null) return location.assign("/")
    if(guild == null) return location.assign("/")

    const [dropMenu, setDropMenu] = useState(true)

    const [openSideBar, setOpenSideBar] = useState(false)

    const [showCreate, setShowCreate] = useState(false)

    const [configEdit, setConfigEdit] = useState(null)

    const [reactionsConfig, setReactionsConfig] = useState([...reactionRoles])
    const [noConfigs, setNoConfigs] = useState(true)

    const [deleteNotif, setDeleteNotif] = useState(null)

    useEffect(() => {
        if(reactionsConfig.length == 0) {
            setNoConfigs(true)
        } else {
            setNoConfigs(false)
        }
    }, [reactionsConfig])
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
                                        { noConfigs ? (
                                            <div className="flex flex-col">
                                                <h1 className="text-xl text-gray-400 font-bold text-center">There is no reaction roles yet!</h1>
                                                <h1 className="text-md text-gray-600 font-medium text-center">Once you add reaction roles,<br></br>You can see them here</h1>
                                            </div>
                                        ) : reactionsConfig.map((reaction, i) => (
                                            <ReactionRolesList reaction={reaction} channels={channels} roles={roles} setConfigEdit={setConfigEdit} setReactionsConfig={setReactionsConfig} setDeleteNotif={setDeleteNotif} key={i}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        showCreate &&
                        <Suspense fallback={
                            <div className="w-screen h-screen bg-stone-950/45 fixed top-0 left-0 right-0 z-20 p-10 flex justify-center items-center">
                                <div className="w-[500px] h-[570px] relative rounded-xl bg-zinc-900 shadow-lg border-2 border-gray-700/50 animate-pulse">
                                </div>
                            </div>
                        }>
                            <CreateModal setShowCreate={setShowCreate} channels={channels} roles={roles} guildID={guild.id} setReactionsConfig={setReactionsConfig}/>
                        </Suspense>
                    }
                    {
                        configEdit &&
                        <Suspense fallback={
                            <div className="w-screen h-screen bg-stone-950/45 fixed top-0 left-0 right-0 z-20 p-10 flex justify-center items-center">
                                <div className="w-[500px] h-[770px] relative rounded-xl bg-zinc-900 shadow-lg border-2 border-gray-700/50 animate-pulse">
                                </div>
                            </div>
                        }>
                            <EditModal setConfigEdit={setConfigEdit} config={configEdit} channels={channels} roles={roles} guildID={guild.id} setReactionsConfig={setReactionsConfig} />
                        </Suspense>
                    }
                    {
                        deleteNotif &&
                        <Suspense fallback={
                            <div className="w-screen h-screen bg-stone-950/45 fixed top-0 left-0 right-0 z-20 p-10 flex justify-center items-center">
                                <div className="w-[500px] h-[50px] relative rounded-xl bg-neutral-900 shadow-lg animate-pulse">
                                </div>
                            </div>
                        }>
                            <DeleteNotification data={deleteNotif} setDeleteNotif={setDeleteNotif} setReactionsConfig={setReactionsConfig} />
                        </Suspense>
                    }
                </div>
            </div>
        </HelmetProvider>
    )
}
