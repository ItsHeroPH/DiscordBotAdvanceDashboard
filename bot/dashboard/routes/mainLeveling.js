const Guild = require("../../schemas/settings/Guild");
const Leveling = require("../../schemas/settings/Leveling");

module.exports = (app, client, valid) => {
    app.get("/api/guild/:guildID/config/leveling", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const config = await Leveling.findOne({ guildId: guild.id }) || new Leveling({ guildId: guild.id }).save().catch(() => {})
        res.json({
            guild: guild.id,
            config: config
        })
    })
    app.post("/api/guild/:guildID/config/leveling", valid, async(req, res) => {
        const guild = await client.guilds.cache.get(req.params.guildID)
        const config = await Guild.findOne({ guildId: guild.id }) || new Guild({ guildId: guild.id })
        const level = await Leveling.findOne({ guildId: guild.id }) || new Leveling({ guildId: guild.id })

        if(req.body.enable) {
            if(req.body.enable !== level.enable) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling plugin from <>${level.enable ? "Enable": "Disable"}</> to <>${req.body.enable ? "Enable": "Disable"}</>`,
                    date: new Date()
                })
            }
            level.enable = req.body.enable
            if(!config.enablePlugin.includes("leveling")) {
                config.enablePlugin.push("leveling")
            }
        } else {
            if(req.body.enable !== level.enable) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling plugin from <>${level.enable ? "Enable": "Disable"}</> to <>${req.body.enable ? "Enable": "Disable"}</>`,
                    date: new Date()
                })
            }
            level.enable = req.body.enable
            if(config.enablePlugin.includes("leveling")) {
                config.enablePlugin.pull("leveling")
            }
        }

        if(req.body.anouncement.type) {
            if(req.body.anouncement.type !== level.anouncement.type) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement from <>${level.anouncement.type == 1 ? "Disabled" : (level.anouncement.type == 2 ? "Current Channel" : (level.anouncement.type == 3 ? "Private Message" : "Custom Channel"))}</> to <>${req.body.anouncement.type == 1 ? "Disabled" : (req.body.anouncement.type == 2 ? "Current Channel" : (req.body.anouncement.type == 3 ? "Private Message" : "Custom Channel"))}</>`,
                    date: new Date()
                })
            }
            level.anouncement.type = req.body.anouncement.type
        }

        if(req.body.anouncement.channel) {
            if(req.body.anouncement.channel !== level.anouncement.channel) {
                const c1 = await guild.channels.cache.get(level.anouncement.channel)
                const c2 = await guild.channels.cache.get(req.body.anouncement.channel)
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message channel from <>${c1 == null ? "None" : `#${c1.name}`}</> to <>#${c2.name}</>`,
                    date: new Date()
                })
            }
            level.anouncement.channel = req.body.anouncement.channel
        }

        if(req.body.anouncement.message) {
            if(req.body.anouncement.message !== level.anouncement.message) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message from <>${level.anouncement.message}</> to <>${req.body.anouncement.message}</> `,
                    date: new Date()
                })
            }
            level.anouncement.message = req.body.anouncement.message
        } else {
            if(level.anouncement.message !== "") {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message from <>${level.anouncement.message}</> to <></> `,
                    date: new Date()
                })
                level.anouncement.message = ""
            }
        }

        if(req.body.anouncement.messageEmbed) {
            if(req.body.anouncement.messageEmbed !== level.anouncement.messageEmbed) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed from <>${level.anouncement.messageEmbed? "Enable": "Disable"}</> to <>${req.body.anouncement.messageEmbed? "Enable": "Disable"}</> `,
                    date: new Date()
                })
            }
            level.anouncement.messageEmbed = req.body.anouncement.messageEmbed
        } else {
            if(req.body.anouncement.messageEmbed !== level.anouncement.messageEmbed) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed from <>${level.anouncement.messageEmbed ? "Enable": "Disable"}</> to <>${req.body.anouncement.messageEmbed? "Enable": "Disable"}</> `,
                    date: new Date()
                })
            }
            level.anouncement.messageEmbed = req.body.anouncement.messageEmbed
        }

        if(req.body.anouncement.embed.color) {
            if(req.body.anouncement.embed.color !== level.anouncement.embed.color) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed color from <>${level.anouncement.embed.color}</> to <>${req.body.anouncement.embed.color}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.color = req.body.anouncement.embed.color
        }

        if(req.body.anouncement.embed.author.url) {
            if(req.body.anouncement.embed.author.url !== level.anouncement.embed.author.url) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed author url from <>${level.anouncement.embed.author.url}</> to <>${req.body.anouncement.embed.author.url}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.author.url = req.body.anouncement.embed.author.url
        } else {
            if(req.body.anouncement.embed.author.url !== level.anouncement.embed.author.url) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed author url from <>${level.anouncement.embed.author.url}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.author.url = ""
        }

        if(req.body.anouncement.embed.author.icon) {
            if(req.body.anouncement.embed.author.icon !== level.anouncement.embed.author.icon) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed author icon from <>${level.anouncement.embed.author.icon}</> to <>${req.body.anouncement.embed.author.icon}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.author.icon = req.body.anouncement.embed.author.icon
        } else {
            if(req.body.anouncement.embed.author.icon !== level.anouncement.embed.author.icon) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed author icon from <>${level.anouncement.embed.author.icon}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.author.icon = ""
        }

        if(req.body.anouncement.embed.author.name) {
            if(req.body.anouncement.embed.author.name !== level.anouncement.embed.author.name) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed author name from <>${level.anouncement.embed.author.name}</> to <>${req.body.anouncement.embed.author.name}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.author.name = req.body.anouncement.embed.author.name
        } else {
            if(req.body.anouncement.embed.author.name !== level.anouncement.embed.author.name) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed author name from <>${level.anouncement.embed.author.name}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.author.name = ""
        }

        if(req.body.anouncement.embed.url) {
            if(req.body.anouncement.embed.url !== level.anouncement.embed.url) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed url from <>${level.anouncement.embed.url}</> to <>${req.body.anouncement.embed.url}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.url = req.body.anouncement.embed.url
        } else {
            if(req.body.anouncement.embed.url !== level.anouncement.embed.url) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed url from <>${level.anouncement.embed.url}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.url = ""
        }

        if(req.body.anouncement.embed.title) {
            if(req.body.anouncement.embed.title !== level.anouncement.embed.title) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed title from <>${level.anouncement.embed.title}</> to <>${req.body.anouncement.embed.title}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.title = req.body.anouncement.embed.title
        } else {
            if(req.body.anouncement.embed.title !== level.anouncement.embed.title) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed title from <>${level.anouncement.embed.title}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.title = ""
        }

        if(req.body.anouncement.embed.description) {
            if(req.body.anouncement.embed.description !== level.anouncement.embed.description) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed description from <>${level.anouncement.embed.description}</> to <>${req.body.anouncement.embed.description}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.description = req.body.anouncement.embed.description
        } else {
            if(req.body.anouncement.embed.description !== level.anouncement.embed.description) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed description from <>${level.anouncement.embed.description}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.description = ""
        }

        if(req.body.anouncement.embed.fields) {
            if(req.body.anouncement.embed.fields !== level.anouncement.embed.fields) {
                if(req.body.anouncement.embed.fields.length < level.anouncement.embed.fields.length) {
                    level.anouncement.embed.fields.map((field, i) => {
                        if(!req.body.anouncement.embed.fields.find((_,index) => i == index)) {
                            if(req.body.anouncement.embed.fields.length < (i + 1)) {
                                config.logs.push({user: {
                                        id: req.user.id,
                                        username: req.user.global_name,
                                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                    },
                                    message: `leveling anouncement message embed field #${i + 1} remove`,
                                    date: new Date()
                                })
                            }
                        } else {
                            const field1 = level.anouncement.embed.fields.find((_, index) => index == i)
                            if(field1 !== field) {
                                if(field1.name !== field.name) {
                                    config.logs.push({user: {
                                            id: req.user.id,
                                            username: req.user.global_name,
                                            icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                        },
                                        message: `change the leveling anouncement message embed field #${i + 1} name from <>${field1.name}</> to <>${field.name}</>`,
                                        date: new Date()
                                    })
                                }
                                if(field1.value !== field.value) {
                                    config.logs.push({user: {
                                            id: req.user.id,
                                            username: req.user.global_name,
                                            icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                        },
                                        message: `change the leveling anouncement message embed field #${i + 1} value from <>${field1.value}</> to <>${field.value}</>`,
                                        date: new Date()
                                    })
                                }
                                if(field1.inline !== field.inline) {
                                    config.logs.push({user: {
                                            id: req.user.id,
                                            username: req.user.global_name,
                                            icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                        },
                                        message: `change the leveling anouncement message embed field #${i + 1} inline from <>${field1.inline}</> to <>${field.inline}</>`,
                                        date: new Date()
                                    })
                                }
                            }
                        }
                    })
                } else {
                    req.body.anouncement.embed.fields.map((field, i) => {
                        if(!level.anouncement.embed.fields.find((_,index) => i == index)) {
                            if(level.anouncement.embed.fields.length < (i + 1)) {
                                config.logs.push({user: {
                                        id: req.user.id,
                                        username: req.user.global_name,
                                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                    },
                                    message: `leveling anouncement message embed field #${i + 1} added`,
                                    date: new Date()
                                })
                            }
                        } else {
                            const field1 = level.anouncement.embed.fields.find((_, index) => index == i)
                            if(field1 !== field) {
                                if(field1.name !== field.name) {
                                    config.logs.push({user: {
                                            id: req.user.id,
                                            username: req.user.global_name,
                                            icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                        },
                                        message: `change the leveling anouncement message embed field #${i + 1} name from <>${field1.name}</> to <>${field.name}</>`,
                                        date: new Date()
                                    })
                                }
                                if(field1.value !== field.value) {
                                    config.logs.push({user: {
                                            id: req.user.id,
                                            username: req.user.global_name,
                                            icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                        },
                                        message: `change the leveling anouncement message embed field #${i + 1} value from <>${field1.value}</> to <>${field.value}</>`,
                                        date: new Date()
                                    })
                                }
                                if(field1.inline !== field.inline) {
                                    config.logs.push({user: {
                                            id: req.user.id,
                                            username: req.user.global_name,
                                            icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                                        },
                                        message: `change the leveling anouncement message embed field #${i + 1} inline from <>${field1.inline}</> to <>${field.inline}</>`,
                                        date: new Date()
                                    })
                                }
                            }
                        }
                    })
                }
            }
            level.anouncement.embed.fields = req.body.anouncement.embed.fields
        } else {
            if(req.body.anouncement.embed.fields !== level.anouncement.embed.fields) {
                level.anouncement.embed.fields.map((_, i) => {
                    config.logs.push({user: {
                            id: req.user.id,
                            username: req.user.global_name,
                            icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                        },
                        message: `leveling anouncement message embed field #${i + 1} remove`,
                        date: new Date()
                    })
                })
            }
            level.anouncement.embed.fields = []
        }

        if(req.body.anouncement.embed.footer.icon) {
            if(req.body.anouncement.embed.footer.icon !== level.anouncement.embed.footer.icon) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed footer icon from <>${level.anouncement.embed.footer.icon}</> to <>${req.body.anouncement.embed.footer.icon}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.footer.icon = req.body.anouncement.embed.footer.icon
        } else {
            if(req.body.anouncement.embed.footer.icon !== level.anouncement.embed.footer.icon) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed footer icon from <>${level.anouncement.embed.footer.icon}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.footer.icon = ""
        }

        if(req.body.anouncement.embed.footer.text) {
            if(req.body.anouncement.embed.footer.text !== level.anouncement.embed.footer.text) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed footer text from <>${level.anouncement.embed.footer.text}</> to <>${req.body.anouncement.embed.footer.text}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.footer.text = req.body.anouncement.embed.footer.text
        } else {
            if(req.body.anouncement.embed.footer.text !== level.anouncement.embed.footer.text) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed footer text from <>${level.anouncement.embed.footer.text}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.footer.text = ""
        }

        if(req.body.anouncement.embed.timestamp) {
            if(req.body.anouncement.embed.timestamp !== level.anouncement.embed.timestamp) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed timestamp from <>${level.anouncement.embed.timestamp}</> to <>${req.body.anouncement.embed.timestamp}</> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.timestamp = req.body.anouncement.embed.timestamp
        } else {
            if(req.body.anouncement.embed.timestamp !== level.anouncement.embed.timestamp) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the leveling anouncement message embed timestamp from <>${level.anouncement.embed.timestamp}</> to <> </> `,
                    date: new Date()
                })
            }
            level.anouncement.embed.timestamp = req.body.anouncement.embed.timestamp
        }

        if(req.body.card.background) {
            if(req.body.card.background !== level.card.background) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the background of leveling card`,
                    date: new Date()
                })
            }
            level.card.background = req.body.card.background
        } else {
            if(req.body.card.background !== level.card.background) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the background of leveling card`,
                    date: new Date()
                })
            }
            level.card.background = ""
        }

        if(req.body.card.color.avatar) {
            if(req.body.card.color.avatar !== level.card.color.avatar) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change of avatar color of leveling card from <>${level.card.color.avatar}</> to <>${req.body.card.color.avatar}</> `,
                    date: new Date()
                })
            }
            level.card.color.avatar = req.body.card.color.avatar
        }

        if(req.body.card.color.username) {
            if(req.body.card.color.username !== level.card.color.username) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change of username color of leveling card from <>${level.card.color.username}</> to <>${req.body.card.color.username}</> `,
                    date: new Date()
                })
            }
            level.card.color.username = req.body.card.color.username
        }

        if(req.body.card.color.text) {
            if(req.body.card.color.text !== level.card.color.text) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change of text color of leveling card from <>${level.card.color.text}</> to <>${req.body.card.color.text}</> `,
                    date: new Date()
                })
            }
            level.card.color.text = req.body.card.color.text
        }

        if(req.body.card.color.overlay) {
            if(req.body.card.color.overlay !== level.card.color.overlay) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change of overlay color of leveling card from <>${level.card.color.overlay}</> to <>${req.body.card.color.overlay}</> `,
                    date: new Date()
                })
            }
            level.card.color.overlay = req.body.card.color.overlay
        }

        if(req.body.card.color.progressbar) {
            if(req.body.card.color.progressbar !== level.card.color.progressbar) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change of progress bar color of leveling card from <>${level.card.color.progressbar}</> to <>${req.body.card.color.progressbar}</> `,
                    date: new Date()
                })
            }
            level.card.color.progressbar = req.body.card.color.progressbar
        }

        if(req.body.card.overlay) {
            if(req.body.card.overlay !== level.card.overlay) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change of overlay opacity of leveling card from <>${level.card.overlay}</> to <>${req.body.card.overlay}</> `,
                    date: new Date()
                })
            }
            level.card.overlay = req.body.card.overlay
        }

        if(req.body.rewards.type) {
            if(req.body.rewards.type !== level.rewards.type) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change of rewards type from <>${level.rewards.type == 1 ? "Stacking Rewards" : "Remove Previous"}</> to <>${req.body.rewards.type == 1 ? "Stacking Rewards" : "Remove Previous"}</> `,
                    date: new Date()
                })
            }
            level.rewards.type = req.body.rewards.type
        }

        if(req.body.rewards.removeWhenLoseXP) {
            if(req.body.rewards.removeWhenLoseXP !== level.rewards.removeWhenLoseXP) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `set the remove rewards when lose XP from <>${level.rewards.removeWhenLoseXP}</> to <>${req.body.rewards.removeWhenLoseXP}</> `,
                    date: new Date()
                })
            }
            level.rewards.removeWhenLoseXP = req.body.rewards.removeWhenLoseXP
        } else {
            if(req.body.rewards.removeWhenLoseXP !== level.rewards.removeWhenLoseXP) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `set the remove rewards when lose XP from <>${level.rewards.removeWhenLoseXP}</> to <>${req.body.rewards.removeWhenLoseXP}</> `,
                    date: new Date()
                })
            }
            level.rewards.removeWhenLoseXP = req.body.rewards.removeWhenLoseXP
        }

        if(req.body.rewards.rewards) {
            if(req.body.rewards.rewards !== level.rewards.rewards) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `updated the rank role rewards`,
                    date: new Date()
                })
            }
            level.rewards.rewards = req.body.rewards.rewards
        } else {
            if(req.body.rewards.rewards !== level.rewards.rewards) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `updated the rank role rewards`,
                    date: new Date()
                })
            }
            level.rewards.rewards = req.body.rewards.rewards
        }

        if(req.body.xp.minimum) {
            if(req.body.xp.minimum !== level.xp.minimum) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the XP minimum rate from <>${level.xp.minimum}</> to <>${req.body.xp.minimum}</> `,
                    date: new Date()
                })
            }
            level.xp.minimum = req.body.xp.minimum
        }

        if(req.body.xp.maximum) {
            if(req.body.xp.maximum !== level.xp.maximum) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the XP maximum rate from <>${level.xp.maximum}</> to <>${req.body.xp.maximum}</> `,
                    date: new Date()
                })
            }
            level.xp.maximum = req.body.xp.maximum
        }

        if(req.body.xp.multiplier) {
            if(req.body.xp.multiplier !== level.xp.multiplier) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the XP multiplier rate from <>${level.xp.multiplier}x</> to <>${req.body.xp.multiplier}x</> `,
                    date: new Date()
                })
            }
            level.xp.multiplier = req.body.xp.multiplier
        }

        if(req.body.noXP_Channels.type) {
            if(req.body.noXP_Channels.type !== level.noXP_Channels.type) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the No XP Channel from <>${level.noXP_Channels.type == 2 ? "Allow for all channels excepts": "Deny for all channels excepts"}</> to <>${req.body.noXP_Channels.type == 2 ? "Allow for all channels excepts": "Deny for all channels excepts"}</> `,
                    date: new Date()
                })
            }
            level.noXP_Channels.type = req.body.noXP_Channels.type
        }

        if(req.body.noXP_Channels.channels) {
            if(req.body.noXP_Channels.channels !== level.noXP_Channels.channels) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the XP Channels list`,
                    date: new Date()
                })
            }
            level.noXP_Channels.channels = req.body.noXP_Channels.channels
        }

        if(req.body.noXP_Roles.type) {
            if(req.body.noXP_Roles.type !== level.noXP_Roles.type) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the No XP Roles from <>${level.noXP_Roles.type == 2 ? "Allow for all roles excepts": "Deny for all roles excepts"}</> to <>${req.body.noXP_Roles.type == 2 ? "Allow for all roles excepts": "Deny for all roles excepts"}</> `,
                    date: new Date()
                })
            }
            level.noXP_Roles.type = req.body.noXP_Roles.type
        }

        if(req.body.noXP_Roles.roles) {
            if(req.body.noXP_Roles.roles !== level.noXP_Roles.roles) {
                config.logs.push({user: {
                        id: req.user.id,
                        username: req.user.global_name,
                        icon: req.user.avatar ? `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/2.png"
                    },
                    message: `change the XP Roles list`,
                    date: new Date()
                })
            }
            level.noXP_Roles.roles = req.body.noXP_Roles.roles
        }

        config.save()
        level.save()
        res.sendStatus(200)
    })
}