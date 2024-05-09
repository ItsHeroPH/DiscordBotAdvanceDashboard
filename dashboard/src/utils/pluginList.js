import { faCog, faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";

export default [
    {
        name: "Configuration",
        description: "Configure the bot settings.",
        url: "/dashboard/{guildId}/config",
        icon: faCog
    },
    {
        name: "Reaction Roles",
        description: "Allow them to easily give themselves a roles via reaction",
        url: "/dashboard/{guildId}/reactionroles",
        icon: faFaceLaughBeam
    }
]