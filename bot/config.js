module.exports = {
    prefix: "?",
    database: process.env.database,
    token: process.env.token,
    client_secret: process.env.client_secret,
    client_id: process.env.client_id,
    session_secret: process.env.session_secret,
    port: 3001,
    support: "https://discord.gg/s8r3Nm857M",
    domain: "http://localhost:3001/api",
	Domain: "http://localhost:3000",
    emojis: {
		success: "✅",
		failed: "❌",
	    error: "⚠",
	    stop: "🛑",
	    goodbye: "👋",
	    music: "🎶",
	  	radio: "🔘",
	    volume: "🔊",
	    loop: "🔄",
		categories: {
			information: "📰",
			music: "🎶",
			economy: "💵",
			leveling: "🏆"
		},
	},
    colors: {
		success: "#00db58",
		default: "#212121",
		error: "#c40f02"
	}
}