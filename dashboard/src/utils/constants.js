export const API_URL = "http://localhost:3001/api"

export const PermissionFlags = {
    CREATE_INSTANT_INVITE: 1,
    KICK_MEMBERS: 2,
    BAN_MEMBERS: 4,
    ADMINISTRATOR: 8,
    MANAGE_CHANNELS: 10,
    MANAGE_GUILD: 20,
    ADD_REACTIONS: 40,
    VIEW_AUDIT_LOG: 80,
    PRIORITY_SPEAKER: 100,
    STREAM: 200,
    VIEW_CHANNEL: 400,
    SEND_MESSAGES: 800,
    SEND_TTS_MESSAGES: 1000,
    MANAGE_MESSAGES: 2000,
    EMBED_LINKS: 4000,
    ATTACH_FILES: 8000,
    READ_MESSAGE_HISTORY: 10000,
    MENTION_EVERYONE: 20000,
    USE_EXTERNAL_EMOJIS: 40000,
    VIEW_GUILD_INSIGHTS: 80000,
    CONNECT: 100000,
    SPEAK: 200000,
    MUTE_MEMBERS: 400000,
    DEAFEN_MEMBERS: 800000,
    MOVE_MEMBERS: 1000000,
    USE_VAD: 2000000,
    CHANGE_NICKNAME: 4000000,
    MANAGE_NICKNAMES: 8000000,
    MANAGE_ROLES: 10000000,
    MANAGE_WEBHOOKS: 20000000,
    MANAGE_GUILD_EXPRESSIONS: 40000000,
    USE_APPLICATION_COMMANDS: 80000000,
    REQUEST_TO_SPEEK: 100000000,
    MANAGE_EVENTS: 200000000,
    MANAGE_THREADS: 400000000,
    CREATE_PUBLIC_THREADS: 800000000,
    CREATE_PRIVATE_THREADS: 1000000000,
    USE_EXTERNAL_STICKERS: 2000000000,
    SEND_MESSAGES_IN_THREADS: 4000000000,
    USE_EMBEDDED_ACTIVITIES: 8000000000,
    MODERATE_MEMBERS: 10000000000,
    VIEW_CREATOR_MONETIZATION_ANALYTICS: 20000000000,
    USE_SOUNDBOARD: 40000000000,
    CREATE_GUILD_EXPRESSIONS: 80000000000,	
    CREATE_EVENTS: 100000000000,
    USE_EXTERNAL_SOUNDS: 200000000000,
    SEND_VOICE_MESSAGES: 400000000000,
    SEND_POLLS: 2000000000000,
}

export const ReactionRolesTypes = [
    {
        name: "Normal",
        description: "Reacting gives the role, Unreacting removes the role",
        type: 1
    },
    {
        name: "Unique",
        description: "Only one role can be obtain",
        type: 2
    },
    {
        name: "Verify",
        description: "Reacting gives the role, Unreacting doesn't remove the role",
        type: 3
    },
    {
        name: "Drop",
        description: "Reacting removes the role, Unreacting doesn't give the role",
        type: 4
    },
    {
        name: "Reversed",
        description: "Reacting removes the role, Unreacting give the role",
        type: 5
    },
    {
        name: "Binding",
        description: "Gives the role, but doesn't swap to the other role",
        type: 6
    }
]