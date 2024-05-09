import { faFaceLaughBeam, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lazy } from "react";

const ReactionRolesList = lazy(() => import('./ReactionRoleList'))
export default function ReactionRoles({ config, setConfig, channels, roles, setCreateReaction }) {
    return (
        <div className="w-full h-fit drop-shadow-xl border-2 border-black rounded-lg col-span-1">
            <div className="w-full px-5 py-3 rounded-t-lg border-b-2 border-b-black bg-zinc-800">
                <h1 className="font-bold text-white text-md">
                    <FontAwesomeIcon className="mr-2" icon={faFaceLaughBeam}/>
                    Reaction Roles
                </h1>
            </div>
            <div className="w-full px-5 py-3 rounded-b-lg bg-zinc-700">
                <button className="px-2 py-1 rounded-md bg-green-600 font-bold text-white text-lg hover:bg-green-700 focus:outline-8 focus:outline outline-green-400/40 my-5" onClick={() => setCreateReaction(true)}>
                    <FontAwesomeIcon className="mr-2" icon={faPlus}/>
                    Create new Reaction Roles
                </button>
                <ReactionRolesList config={config} channels={channels} roles={roles}/>
            </div>
        </div>
    )
}