'use strict';
require('dotenv').config();
var fs = require('fs');
const https = require('https');
console.log('Loaded... ');
var h = new Date().getHours();
var d = new Date().getDate();
h = parseInt(h) - 5;
if (h < 0) {
    d = parseInt(d) - 1;
    h = parseInt(h) + 24;
}
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
        function NowThen(eventd) {
            var started = 'started at ';
            var watch = 'watch live: ';
            var already = 'already presented, ';
            var find = 'playback: ';
            var minute = new Date().getMinutes();
            var length = parseInt(eventd[6])+2;
            if (eventd[7]) {
                length = eventd[7];
            }
            var time = parseInt(h, 10) + (parseInt(minute, 10)/60);
            time = time.toFixed(1);
            
            if (d == eventd[5] && time >= eventd[6] && time < length) {
                return eventd[0] + started + eventd[2] + watch + '\n' + eventd[3];
            }
            if ((d == eventd[5] && time > length) || d > eventd[5]) {
                return eventd[0] + already + eventd[2] + find + '\n' + eventd[4];
            }
            if ((d == eventd[5] && time < eventd[6]) || d < eventd[5]) {
                return eventd[0] + eventd[1] + eventd[2] + '\n' + eventd[3];
            }
        }
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
        const digital = /digital/i;
        const devolver = /devolver/i;
        const bethesda = /bethesda/i;
        const pcgame = /pc/i;
        const ubisoft = /ubisoft/i;
        const square = /square/i;
        const enix = /enix/i;
        const nintendo = /nintendo/i;
        const google = /google/i;
        const stadia = /stadia/i;
        const sony = /sony/i;

        // DAY EXPRESSIONS
        const start = /start/i;
        const begin = /begin/i;
        const thurs = /thursday/i;
        const sat = /saturday/i;
        const sun = /sunday/i;
        const mon = /monday/i;
        const tues = /tuesday/i;
        const today = /today/i;
        const tomorrow = /tomorrow/i;
        const all = /all/i;
        const every = /every/i;

        // INFO ARRAY SETUP: [0. COMPANY NAME,    1. DAY OF THE WEEK,     2. START TIME,      3. URL FOR LIVE STREAM,     4. YOUTUBE URL FOR REPLAY (AFTER PRESENTATION),     5. DAY OF MONTH (1-30),     6. START TIME (0-24, MINUTES REPRESENTED AS DECIMAL EX. 9:15 -> 9.3),     7. END TIME (OPTIONAL {DEFAULT = 2 HOURS AFTER START})]
        // include spaces after every entry or formatting will be squashed.
        var startt = 'E3 starts on Saturday, June 8th, and goes till Tuesday, June 11th.';
        var eat = ['EA ','on Saturday, ','11:30AM CST/6:30PM CEST ','https://twitch.tv/ea','https://www.youtube.com/user/EA',8,11.5,2];
        var microt = ['Microsoft ','on Sunday, ','3PM CST/10PM CEST ','https://www.twitch.tv/xbox','https://www.youtube.com/user/xbox',9,15];
        var digitalt = ['Devolver Digitial ','on Sunday, ','9PM CST/4AM CEST ','https://www.twitch.tv/devolverdigital','https://www.youtube.com/user/DevolverDigital',9,21];
        var bethesdat = ['Bethesda ','on Sunday, ','7:30PM CST/3:30AM CEST ','https://www.twitch.tv/bethesda','https://www.youtube.com/user/BethesdaSoftworks',9,19.5];
        var pcgamet = ['PC Gaming Show ','on Monday, ','12PM CST/7PM CEST ','https://www.twitch.tv/pcgamer','https://www.youtube.com/user/pcgamer',10,12];
        var ubisoftt = ['Ubisoft ','on Monday ','3PM CST/10PM CEST ','https://www.twitch.tv/bethesda','https://www.youtube.com/channel/UCBMvc6jvuTxH6TNo9ThpYjg',10,15];
        var squaret = ['Square Enix ','on Monday, ','8PM CST/3AM CEST ','https://www.twitch.tv/squareenix','https://www.youtube.com/user/SQEXMembersNA',10,20];
        var nintendot = ['Nintendo ','on Tuesday, ','11AM CST/6PM CEST, ','https://www.twitch.tv/nintendo','https://www.youtube.com/user/Nintendo',11,11];
        var googlet = ['Google Stadia ','on Thursday, ','11AM CST/6PM CEST, ','https://www.youtube.com/watch?v=k-BbW6zAjL0','https://www.youtube.com/watch?v=k-BbW6zAjL0',6,11];
        var sonyt = 'Sony just did a bunch of directs\: https://www.youtube.com/playlist?list=PLol_ykYs3OQ5hs75PIl_si3Vk1709vDT0';

        // VAR REFERENCES
        var ear;
        var micror;
        var digitalr;
        var bethesdar;
        var pcgamer;
        var ubisoftr;
        var squarer;
        var nintendor;
        var googler;

        // Checks if message is posted by bot, to prevent spam, then processes bot logic.
        if (mText)
        {
            if (nameex.test(messageName)) {
                console.log('bot triggered by bot... ignoring.')
                return null;
            }
            else {
                if (name.test(mText)) {
                    if (e3ex.test(mText)) {

                        // FORMATS AND ADJUSTS FOR TIME - its after e3test to prevent function spam everytime a message to the groupme is sent.
                        ear = NowThen(eat);
                        micror = NowThen(microt);
                        digitalr = NowThen(digitalt);
                        bethesdar = NowThen(bethesdat);
                        pcgamer = NowThen(pcgamet);
                        ubisoftr = NowThen(ubisoftt);
                        squarer = NowThen(squaret);
                        nintendor = NowThen(nintendot);
                        googler = NowThen(googlet);

                        if (start.test(mText) || begin.test(mText)) {
                            return startt;
                        }

                        // DATE TESTS
                        if (sat.test(mText) || sun.test(mText) || mon.test(mText) || tues.test(mText) || today.test(mText) || tomorrow.test(mText) || thurs.test(mText)) {
                            if (thurs.test(mText)) {
                                return googler;
                            }
                            if (sat.test(mText)) {
                                return ear;
                            }
                            if (sun.test(mText)) {
                                return micror+'\n\n'+bethesdar+'\n\n'+digitalr;
                            }
                            if (mon.test(mText)) {
                                return ubisoftr+'\n\n'+squarer+'\n\n'+pcgamer;
                            }
                            if (tues.test(mText)) {
                                return nintendor;
                            }

                            if (today.test(mText) || tomorrow.test(mText)) {
                                if (/33073287/.test(message.user_id)) {
                                    h = parseInt(h) + 7;
                                    if (h > 24) {
                                        d = parseInt(d) + 1;
                                        h = parseInt(h) - 24;
                                    }
                                }
                                if (tomorrow.test(mText)) {
                                    d = parseInt(d) + 1;
                                }
                                if (d == 6) {
                                    return googler;
                                }
                                if (d == 8) {
                                    return ear;
                                }
                                if (d == 9) {
                                    return micror+'\n\n'+bethesdar+'\n\n'+digitalr;
                                }
                                if (d == 10) {
                                    return ubisoftr+'\n\n'+squarer+'\n\n'+pcgamer;
                                }
                                if (d == 11) {
                                    return nintendor;
                                }
                                else {
                                    var req = null;
                                    if (d > 11) {
                                        return 'All events have concluded'
                                    }
                                    if (today.test(mText)) {
                                        req = ' today.'
                                    }
                                    if (tomorrow.test(mText)) {
                                        req = ' tomorrow.'
                                    }
                                    return 'There are no events'+req;
                                }
                            }
                        }

                        // COMPANY TESTS
                        else {
                            if (all.test(mText) || every.test(mText)) {
                                return ear+'\n\n'+micror+'\n\n'+bethesdar+'\n\n'+digitalr+'\n\n'+ubisoftr+'\n\n'+squarer+'\n\n'+pcgamer+'\n\n'+nintendor+'\n\n'+sonyt+'\n\n'+googler;
                            }

                            if (ea.test(mText)) {
                                return ear;
                            }
                            if (micro.test(mText) || xbox.test(mText)) {
                                return micror;
                            }
                            if (bethesda.test(mText)) {
                                return bethesdar;
                            }
                            if (digital.test(mText) || devolver.test(mText)) {
                                return digitalr;
                            }
                            if (ubisoft.test(mText)) {
                                return ubisoftr;
                            }
                            if (square.test(mText) || enix.test(mText)) {
                                return squarer;
                            }
                            if (pcgame.test(mText)) {
                                return pcgamer;
                            }
                            if (nintendo.test(mText)) {
                                return nintendor;
                            }
                            if (sony.test(mText)) {
                                return sonyt;
                            }
                            if (google.test(mText) || stadia.test(mText)) {
                                return googler;
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

        // get botid from dev.groupme.com
        var botId = "[botid]";

        // get groupid from dev.groupme.com
        // insert like this:
        // const groupidex = /groupid/;
        const groupidex;

        if (groupidex) {
            if (groupidex.test(groupid)) {
                botId = '[botid2]';
            }
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
                console.log(mText);
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
