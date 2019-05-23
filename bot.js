'use strict';
require('dotenv').config();
var fs = require('fs');
const https = require('https');
console.log('Loaded... ');
var date = new Date().getDate();
var groupid;

class Bot {
    /**
     * Called when the bot receives a message.
     *
     * @static
     * @param {Object} message The message data incoming from GroupMe
     * @return {string}
     */
    static checkMessage(message) {
        const mText = message.text;
        const messageName = message.name;
        groupid = message.group_id;

        // BASIC EXPRESSIONS
        const e3ex = /e3/i;
        const name = /info/i;
        const nameex = /E3 Kiosk/;
        const thanks = /thank/i;

        // COMPANY EXPRESSIONS
        const ea = /ea/i;
        const micro = /micro/i;
        const xbox = /xbox/i;
        const bethesda = /bethesda/i;
        const ubisoft = /ubisoft/i;
        const square = /square/i;
        const enix = /enix/i;
        const nintendo = /nintendo/i;
        const sony = /sony/i;

        // DATE EXPRESSIONS
        const start = /start/i;
        const begin = /begin/i;
        const sat = /saturday/i;
        const sun = /sunday/i;
        const mon = /monday/i;
        const tues = /tuesday/i;
        const today = /today/i;
        const tomorrow = /tomorrow/i;
        const all = /all/i;
        const every = /every/i;

        // SCHEDULINGS
        const startt = 'E3 starts on Saturday, June 8th, and goes till Tuesday, June 11th.'
        const eat = 'EA on Saturday, time unknown, https://www.twitch.tv/ea'
        const microt = 'Microsoft on Sunday, 1PM PT, https://www.twitch.tv/xbox'
        const bethesdat = 'Bethesda on Sunday, 5:30PM PT, https://www.twitch.tv/bethesda'
        const ubisoftt = 'Ubisoft on Monday, 1PM PT, https://www.twitch.tv/bethesda'
        const squaret = 'Square Enix on Monday, 6PM PT, https://www.twitch.tv/squareenix'
        const nintendot = 'Nintendo on Tuesday, 9AM PT, https://www.twitch.tv/nintendo'
        const sonyt = 'Sony will not be at E3, instead they just did a bunch of directs\: https://www.youtube.com/playlist?list=PLol_ykYs3OQ5hs75PIl_si3Vk1709vDT0'

        // Checks if message is posted by bot, to prevent spam, then processes bot logic.
        if (mText)
        {
            if (nameex.test(messageName)) {
                console.log('bot trigger by bot... ignoring.')
                return null;
            }
            else {
                if (name.test(mText)) {
                    if (e3ex.test(mText)) {
                        if (start.test(mText) || begin.test(mText)) {
                            return startt;
                        }
                        // DATE TESTS
                        if (sat.test(mText) || sun.test(mText) || mon.test(mText) || tues.test(mText) || today.test(mText) || tomorrow.test(mText)) {
                            if (sat.test(mText)) {
                                return eat;
                            }
                            if (sun.test(mText)) {
                                return microt+' '+bethesdat;
                            }
                            if (mon.test(mText)) {
                                return ubisoftt+' '+squaret;
                            }
                            if (tues.test(mText)) {
                                return nintendot;
                            }
                            if (today.test(mText) || tomorrow.test(mText)) {
                                if (tomorrow.test(mText)) {
                                    date = date + 1;
                                }
                                if (date == 8) {
                                    return eat;
                                }
                                if (date == 9) {
                                    return microt+' '+bethesdat;
                                }
                                if (date == 10) {
                                    return ubisoftt+' '+squaret;
                                }
                                if (date == 11) {
                                    return nintendot;
                                }
                                else {
                                    return 'There are no events'
                                }
                            }
                        }
                        // COMPANY TESTS
                        else {
                            if (all.test(mText) || every.test(mText)) {
                                console.log('all or every');
                                console.log(eat+' '+microt+' '+bethesdat+' '+ubisoftt+' '+squaret+' '+nintendot+' '+sonyt);
                                return eat+' '+microt+' '+bethesdat+' '+ubisoftt+' '+squaret+' '+nintendot+' '+sonyt;
                            }
                            if (ea.test(mText)) {
                                return eat;
                            }
                            if (micro.test(mText) || xbox.test(mText)) {
                                return microt;
                            }
                            if (bethesda.test(mText)) {
                                return bethesdat;
                            }
                            if (ubisoft.test(mText)) {
                                return ubisoftt;
                            }
                            if (square.test(mText) || enix.test(mText)) {
                                return squaret;
                            }
                            if (nintendo.test(mText)) {
                                return nintendot;
                            }
                            if (sony.test(mText)) {
                                return sonyt;
                            }
                            else {
                                return 'You can ask for "all", "every", "today", "tomorrow", or a specific day of the week, or company.'
                            }
                        }
                    }
                }
            }
        }
        return null;
    };
    static sendMessage(mText) {

        var botId = "4720a34d2e45e88a60406cfa7e";

        if (/41279538/.test(groupid)) {
            botId = '26950a2d98969fcfb30ca4a3e5';
        }

        const options = {
            hostname: 'api.groupme.com',
            path: '/v3/bots/post',
            method :'POST'
        };
        const body = {
            bot_id: botId,
            text: mText
        };
        const botReq = https.request(options, function(response) {
            if (response.statusCode !== 202) {
                console.log('Bad status '+response.statusCode);
            }
        });

        botReq.on('error', function(err) {
            console.log('Error '+JSON.stringify(err));
        });

        botReq.on('timeout', function(err) {
            console.log('Timeout '+JSON.stringify(err));
        });
        botReq.end(JSON.stringify(body));
    };
};
module.exports = Bot;
