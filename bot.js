'use strict';
require('dotenv').config();
var fs = require('fs');
const https = require('https');
console.log('Loaded... ');
var date = new Date().getDate();

class Bot {
    /**
     * Called when the bot receives a message.
     *
     * @static
     * @param {Object} message The message data incoming from GroupMe
     * @return {string}
     */
    static checkMessage(message) {
        const messageText = message.text;
        const messageName = message.name;

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

        groupid = message.group_id;

        // Checks if message is posted by bot, to prevent spam, then processes bot logic.
        if (messageText)
        {
            if (nameex.test(messageName)) {
                console.log('bot trigger by bot... ignoring.')
                return null;
            }
            else {
                if (name.test(messageText)) {
                    if (e3ex.test(messageText)) {
                        if (messageText.test(start) || messageText.test(begin)) {
                            return startt;
                        }
                        // DATE TESTS
                        if (messageText.test(sat) || messageText.test(sun) || messageText.test(mon) || messageText.test(tues) || messageText.test(today) || messageText.test(tomorrow) || messageText.test(all) || messageText.test(every)) {
                            if (messageText.test(sat)) {
                                return eat;
                            }
                            if (messageText.test(sun)) {
                                return microt+' '+bethesdat;
                            }
                            if (messageText.test(mon)) {
                                return ubisoftt+' '+squaret;
                            }
                            if (messageText.test(tues)) {
                                return nintendot;
                            }
                            if (messageText.test(today) || messageText.test(tomorrow)) {
                                if (messageText.test(tomorrow)) {
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
                            if (messageText.test(all) || messageText.test(every)) {
                                return eat+' '+microt+' '+bethesdat+' '+ubisoftt+' '+squaret+' '+nintendo+' '+sonyt;
                            }
                            if (messageText.test(ea)) {
                                return eat;
                            }
                            if (messageText.test(micro) || messageText.test(xbox)) {
                                return microt;
                            }
                            if (messageText.test(bethesda)) {
                                return bethesdat;
                            }
                            if (messageText.test(ubisoft)) {
                                return ubisoftt;
                            }
                            if (messageText.test(square) || messageText.test(enix)) {
                                return squaret;
                            }
                            if (messageText.test(nintendo)) {
                                return nintendot;
                            }
                            if (messageText.test(sony)) {
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

        if (/41279538/.test(mText.group_id)) {
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
