module.exports = function(bot, connection, stuff, auth) {
    var SelfReloadJSON = require('self-reload-json');

    const modulename = "swearfilter"

    var statuslog = bot.channels.get("450444337357258772")
    var logchannel = bot.channels.get("399688995283533824")
    var serverlistchannel = bot.channels.get("413831069117186078")
    var botowner = bot.users.get("142408079177285632")
    var byp = new SelfReloadJSON('./priv/filter.json');


    bot.on('message', async(message) => {
        if (!message.guild) return;
        if (message.channel.nsfw) return;
        if (message.guild.id == "264445053596991498") return;
        if (message.guild.id == "110373943822540800") return;
        if (message.author.bot) return;
        if (message.channel.id == "463137032177451008") return;
        if (message.channel.id == "362693179033649152" || message.channel.id == "410475762257494016" || message.channel.id == "362689481586901002" || message.channel.id == "467069321768730624") return;
        if (message.guild.id == "446519010935439371") {
            if (message.content.match(/slut/)) return;
        }
        if (message.guild.id == "468235532497977355") {
            if (message.content.match(/porn/)) return;
        }
        if (message.guild.id == "430410558681120768") {
            if (message.content.match(/frigger/)) stopped();
            if (message.content.match(/twat/)) stopped();
        }


        async function stopped(arg, words) {
            connection.query("SELECT * FROM censorbot WHERE serverid = " + message.guild.id, async function(err, rows) {
                if (rows && rows[0] && rows[0].censor == 0) {
                    return;
                } else {
                    connection.query("SELECT * FROM roleandlog WHERE serverid = " + message.guild.id, async function(err, rows) {
                        if (rows && rows[0]) {
                            let roleid = rows[0].roleid
                            let roleobject = message.guild.roles.get(roleid)
                            if (roleobject) {
                                if (message.guild.member(message.author.id).roles.has(roleid)) return;
                            }
                        }


                        message.delete().catch(err => {
                            console.log(`${message.guild.name} ${message.guild.id} Missing perms`)
                        })
                        const popnomsg = await message.reply("You're not allowed to say that... | Mistake? Do: +ticket word")
                        setTimeout(function() {
                            popnomsg.delete()
                        }, 3000);

                        console.log(`Deleted message from ${message.author} ${message.author.username}: ${message.content}`)
                        const logchannel = bot.channels.get("399688995283533824")
                        let oml = {
                            "embed": {
                                "title": message.content + "",
                                "footer": {},
                                "fields": [{
                                    "name": "User",
                                    "value": message.author + ""
                                }, {
                                    "name": "Match site + Swear Array Match",
                                    "value": arg + " + " + words
                                }]
                            }
                        }
                        logchannel.send(`Deleted message from ${message.author.tag} ${message.author.username}: | Server: ${message.guild.name} ${message.guild.id} | Channel: ${message.channel.name} ${message.channel.id}`)
                        logchannel.send(oml)
                        const logchannelxd = message.guild.channels.find(c => c.name === "log");
                        if (!logchannelxd) {
                            message.channel.send("error! no log channel found! Be sure to create a #log chat so I can log the curses!")
                        }
                        if (logchannelxd) {
                            let yas = {
                                "embed": {
                                    "title": "Deleted Message",
                                    "color": 16452296,
                                    "timestamp": "",
                                    "footer": {
                                        "icon_url": bot.user.avatarURL + "",
                                        "text": "If you believe this was a mistake run +ticket word"
                                    },
                                    "thumbnail": {
                                        "url": message.author.avatarURL
                                    },
                                    "fields": [{
                                        "name": "User",
                                        "value": message.author + "",
                                        "inline": true
                                    }, {
                                        "name": "Channel",
                                        "value": message.channel + "",
                                        "inline": true
                                    }, {
                                        "name": "Time",
                                        "value": Date() + ""
                                    }, {
                                        "name": "Message",
                                        "value": message.content + ""
                                    }]
                                }
                            }
                            logchannelxd.send(yas)
                        }

                    })
                };
            });
        }

        if (message.content.match(/(f uck|fu ck|penis|Pu.ssy|P.ussy|Puss.y|d l c|dlck|c u n t|n l g|n!g|fa g|f4g|f 4 g|f a g |f @ g|f u c k|f u k|ðŸ‡«ðŸ‡ºðŸ‡¨|ðŸ‡«.+ðŸ‡¨|ðŸ‡« ðŸ‡º ðŸ‡¨|ðŸ‡¦ðŸ‡¸ðŸ‡¸|ðŸ‡¦ ðŸ‡¸ ðŸ‡¸|ðŸ‡§ðŸ‡®ðŸ‡¹ðŸ‡¨|ðŸ‡§ ðŸ‡® ðŸ‡¹ ðŸ‡¨|ðŸ‡©ðŸ‡®ðŸ‡¨|ðŸ‡© ðŸ‡® ðŸ‡¨|ðŸ‡¨ðŸ‡ºðŸ‡³ðŸ‡¹|ðŸ‡¨ ðŸ‡º ðŸ‡³ ðŸ‡¹|ðŸ‡³ðŸ‡®ðŸ‡¬|ðŸ‡³ ðŸ‡® ðŸ‡¬|ðŸ‡¸ðŸ‡­ðŸ‡®ðŸ‡¹|ðŸ‡¸ ðŸ‡­ ðŸ‡® ðŸ‡¹|ðŸ‡«ðŸ‡¦ðŸ‡¬|ðŸ‡« ðŸ‡¦ ðŸ‡¬|ðŸ‡µðŸ‡´ðŸ‡·ðŸ‡³|ðŸ‡µ ðŸ‡´ ðŸ‡· ðŸ‡³|ðŸ‡¹ðŸ‡®ðŸ‡¹|ðŸ‡¹ ðŸ‡® ðŸ‡¹|ðŸ‡¨ðŸ‡´ðŸ‡¨|ðŸ‡¨ ðŸ‡´ ðŸ‡¨|ðŸ‡§ðŸ‡¦ðŸ‡¸ðŸ‡¹|ðŸ‡§ ðŸ‡¦ ðŸ‡¸ ðŸ‡¹|ðŸ‡¸ðŸ‡±ðŸ‡ºðŸ‡¹|ðŸ‡¸ ðŸ‡± ðŸ‡º ðŸ‡¹|ðŸ‡·ðŸ‡ªðŸ‡¹ðŸ‡¦ðŸ‡·ðŸ‡©|ðŸ‡· ðŸ‡ª ðŸ‡¹ ðŸ‡¦ ðŸ‡· ðŸ‡©|ðŸ‡µðŸ‡ºðŸ‡¸ðŸ‡¸ðŸ‡¾|ðŸ‡µ ðŸ‡º ðŸ‡¸ ðŸ‡¸ ðŸ‡¾|ðŸ‡¨ðŸ‡ºðŸ‡²|ðŸ‡¨ ðŸ‡º ðŸ‡²)/gi)) {
            stopped("general stopped", "general stopped");
        }
        let RemoveAccents = require('../priv/removeaccents.js')

        const arg = RemoveAccents(message.content.replace(/[.]/g, '')).slice().trim().split(/ +/g)
        const words = Object.keys(byp)

        const arrays = byp

        let okaytt = []
        let okayy = []
        let stop = false
        arg.forEach(arg => {
            words.forEach(words => {
                let word = new RegExp(words, 'gi')
                if (arg.match(word)) {
                    const array = arrays[words.toLowerCase()]
                    if (array[0]) {
                        let sio1 = new RegExp(array[0], 'gi')
                        if (arg.match(sio1)) return;
                    }
                    if (array[1]) {
                        let sio2 = new RegExp(array[1], 'gi')
                        if (arg.match(sio2)) return;
                    }
                    if (array[2]) {
                        let sio3 = new RegExp(array[2], 'gi')
                        if (arg.match(sio3)) return;
                    }
                    if (array[3]) {
                        let sio4 = new RegExp(array[3], 'gi')
                        if (arg.match(sio4)) return;
                    }
                    if (array[4]) {
                        let sio5 = new RegExp(array[4], 'gi')
                        if (arg.match(sio5)) return;
                    }
                    if (array[5]) {
                        let sio6 = new RegExp(array[5], 'gi')
                        if (arg.match(sio6)) return;
                    }
                    if (array[6]) {
                        let sio7 = new RegExp(array[6], 'gi')
                        if (arg.match(sio7)) return;
                    }
                    if (array[7]) {
                        let sio8 = new RegExp(array[7], 'gi')
                        if (arg.match(sio8)) return;
                    }
                    if (array[8]) {
                        let sio9 = new RegExp(array[8], 'gi')
                        if (arg.match(sio9)) return;
                    }
                    if (array[9]) {
                        let sio10 = new RegExp(array[9], 'gi')
                        if (arg.match(sio10)) return;
                    }
                    if (array[10]) {
                        let sio11 = new RegExp(array[10], 'gi')
                        if (arg.match(sio11)) return;
                    }
                    if (array[11]) {
                        let sio12 = new RegExp(array[11], 'gi')
                        if (arg.match(sio12)) return;
                    }
                    if (array[12]) {
                        let sio13 = new RegExp(array[12], 'gi')
                        if (arg.match(sio13)) return;
                    }
                    if (array[13]) {
                        let sio14 = new RegExp(array[13], 'gi')
                        if (arg.match(sio14)) return;
                    }
                    if (array[14]) {
                        let sio15 = new RegExp(array[14], 'gi')
                        if (arg.match(sio15)) return;
                    }
                    if (array[15]) {
                        let sio16 = new RegExp(array[15], 'gi')
                        if (arg.match(sio16)) return;
                    }
                    if (array[16]) {
                        let sio17 = new RegExp(array[16], 'gi')
                        if (arg.match(sio17)) return;
                    }
                    if (array[17]) {
                        let sio18 = new RegExp(array[17], 'gi')
                        if (arg.match(sio18)) return;
                    }
                    if (array[18]) {
                        let sio19 = new RegExp(array[18], 'gi')
                        if (arg.match(sio19)) return;
                    }
                    if (array[19]) {
                        let sio20 = new RegExp(array[19], 'gi')
                        if (arg.match(sio20)) return;
                    }
                    if (array[20]) {
                        let sio21 = new RegExp(array[20], 'gi')
                        if (arg.match(sio21)) return;
                    }
                    if (array[21]) {
                        let sio22 = new RegExp(array[21], 'gi')
                        if (arg.match(sio22)) return;
                    }
                    if (array[22]) {
                        let sio23 = new RegExp(array[22], 'gi')
                        if (arg.match(sio23)) return;
                    }
                    if (array[23]) {
                        let sio24 = new RegExp(array[23], 'gi')
                        if (arg.match(sio24)) return;
                    }
                    if (array[24]) {
                        let sio25 = new RegExp(array[24], 'gi')
                        if (arg.match(sio25)) return;
                    }
                    if (array[25]) {
                        let sio26 = new RegExp(array[25], 'gi')
                        if (arg.match(sio26)) return;
                    }
                    if (array[26]) {
                        let sio27 = new RegExp(array[26], 'gi')
                        if (arg.match(sio27)) return;
                    }
                    if (array[27]) {
                        let sio28 = new RegExp(array[27], 'gi')
                        if (arg.match(sio28)) return;
                    }
                    if (array[28]) {
                        let sio29 = new RegExp(array[28], 'gi')
                        if (arg.match(sio29)) return;
                    }
                    if (array[29]) {
                        let sio30 = new RegExp(array[29], 'gi')
                        if (arg.match(sio30)) return;
                    }
                    if (array[30]) {
                        let sio31 = new RegExp(array[30], 'gi')
                        if (arg.match(sio31)) return;
                    }
                    let linkreg = new RegExp(".com", 'gi')
                    if (arg.match(linkreg)) return;
                    stop = true
                    okaytt = word
                    okayaa = arg
                }
            })
        })
        if (stop) {
            stopped(okayaa, okaytt);
        }


    });
}