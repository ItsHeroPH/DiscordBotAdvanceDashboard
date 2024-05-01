const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-discord").Strategy;
const http = require("http").createServer(app);
const MongoStore = require('connect-mongo');
const cors = require("cors")
const bodyParser = require("body-parser");
const { PermissionFlagsBits } = require("discord.js");
const Guild = require("../schemas/settings/Guild");
const mainLeveling = require("./routes/mainLeveling");
const mainConfiguration = require("./routes/mainConfiguration");

module.exports = (client) => {
    app.use(session({
        store: MongoStore.create({ mongoUrl: client.config.database, autoRemove: 'disabled' }),
        secret: client.config.session_secret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24
        }
    }));
    app.use(cors({ origin: [client.config.Domain], credentials: true, methods: ["GET", "PUT", "POST"], allowedHeaders: ['Content-Type', 'Authorization']}))
    
    // app.use(passport.authenticate('session'));
	app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    passport.use(new Strategy({
            clientID: `${client.config.client_id}`,
            clientSecret: `${client.config.client_secret}`,
            callbackURL: `${client.config.domain}/callback`,
            scope: ["identify", "guilds"]
        }, (accessToken, refreshToken, profile, done) => {
	        process.nextTick(() => done(null, profile))
	    }
    ));
    app.use(bodyParser.json({
		limit: '50mb'
	}));
    app.use(bodyParser.urlencoded({
            limit: '50mb',
        extended: true
    }));

    const checkAuth = (req, res, next) => {
        if(req.isAuthenticated()) return next();
        req.session.backURL = req.url;
        res.redirect("/login");
    }

    app.get("/api/login", (req, res, next) => {
            next();
        }, passport.authenticate("discord")
    );
    
    app.get("/api/callback", passport.authenticate("discord", {
            failWithError: true,
            failureFlash: "There was an error logging you in!",
            failureRedirect: client.config.Domain,
        }), async (req, res) => {
        try {
            res.redirect(client.config.Domain)
        } catch(err) {
            console.error(err)
            res.redirect(client.config.Domain)
        }
    })
    // Logout
    app.get("/api/logout", function(req, res, next) {
        if(req.isAuthenticated()) {
            req.logout()
            res.redirect(client.config.Domain)
        }
    })
    // API USER BOT
    app.get("/api/user/@bot", (req, res) => {
        res.json(client.user)
    })
    app.get("/api/user/@bot/guilds", (req, res) => {
        res.json({ guilds: client.guilds.cache })
    })
    // API USER DATA
    app.get("/api/user/@user", (req, res) => {
        if(!req.isAuthenticated()) return res.json({ user: null })
        res.json({ user: req.user })
    })
    app.get("/api/user/@user/guilds", (req, res) => {
        if(!req.isAuthenticated()) return res.json({ guilds: null })
        
        res.json({ guilds: req.user.guilds })
    })
    // API GUILD DATA
    const checkIfValid = async(req, res, next) => {
        const guild = client.guilds.cache.get(req.params.guildID)
        if(!req.isAuthenticated() || !guild) return res.json({ guild: null })
        let member = guild.members.cache.get(req.user.id)
		if(!member) {
			member = await guild.members.fetch(req.user.id)
		}
        if(!member) return res.json({guild: null})
        if(!member.permissions.has(PermissionFlagsBits.ManageGuild)) return res.json({guild: null})
        next()
    }
    app.get("/api/guild/:guildID", checkIfValid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        res.json({guild: guild})
    })
    app.get("/api/guild/:guildID/channels", checkIfValid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const channels = await guild.channels.cache
        res.json({channels: channels})
    })
    app.get("/api/guild/:guildID/roles", checkIfValid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const roles = await guild.roles.cache
        res.json({roles: roles})
    })
    // guild config
    mainConfiguration(app, client, checkIfValid)
    // guild leveling
    mainLeveling(app, client, checkIfValid)
	
    http.listen(client.config.port, () => {
        client.logger.info("DASHBOARD","Dashboard is Ready!")
		client.logger.info("DASHBAORD",`Dashboard is listening to ${client.config.port}`)
    });
}
