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
        function NowThen() {
            var hour = new Date().getHours();
            var minute = new Date().getMinutes();
            console.log('minute = ' + minute);
            var d = new Date().getDate();
            hour = parseInt(hour) - 5;
            if (hour < 0) {
                hour = hour + 24;
            }
            var time = parseInt(hour, 10) + (parseInt(minute, 10)/60);
            time = time.toFixed(1);
            console.log('NowThen time is '+d+' '+hour+' '+minute+' '+time);
            // Saturday
            if (d == 6 && time >= 15.8 && time < 17) {
                ear = eat[0] + 'started at ' + eat[2] + 'watch live: ' + eat[3];
            }
            if (d > 8) {
                ear = eat[0] + 'has already performed, ' + eat[2] + 'you might find playback on twitch: ' + eat[3];
            }
            if (d == 8 && time > 14) {
                ear = eat[0] + 'has already performed, ' + eat[2] + 'you might find playback on twitch: ' + eat[3];
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
        //11-3-2018
        //const emojiex = /[\x{1F3F4}](?:\x{E0067}\x{E0062}\x{E0077}\x{E006C}\x{E0073}\x{E007F})|[\x{1F3F4}](?:\x{E0067}\x{E0062}\x{E0073}\x{E0063}\x{E0074}\x{E007F})|[\x{1F3F4}](?:\x{E0067}\x{E0062}\x{E0065}\x{E006E}\x{E0067}\x{E007F})|[\x{1F3F4}](?:\x{200D}\x{2620}\x{FE0F})|[\x{1F3F3}](?:\x{FE0F}\x{200D}\x{1F308})|[\x{0023}\x{002A}\x{0030}\x{0031}\x{0032}\x{0033}\x{0034}\x{0035}\x{0036}\x{0037}\x{0038}\x{0039}](?:\x{FE0F}\x{20E3})|[\x{1F415}](?:\x{200D}\x{1F9BA})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F467}\x{200D}\x{1F467})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F467}\x{200D}\x{1F466})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F467})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F466}\x{200D}\x{1F466})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F466})|[\x{1F468}](?:\x{200D}\x{1F468}\x{200D}\x{1F467}\x{200D}\x{1F467})|[\x{1F468}](?:\x{200D}\x{1F468}\x{200D}\x{1F466}\x{200D}\x{1F466})|[\x{1F468}](?:\x{200D}\x{1F468}\x{200D}\x{1F467}\x{200D}\x{1F466})|[\x{1F468}](?:\x{200D}\x{1F468}\x{200D}\x{1F467})|[\x{1F468}](?:\x{200D}\x{1F468}\x{200D}\x{1F466})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F469}\x{200D}\x{1F467}\x{200D}\x{1F467})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F469}\x{200D}\x{1F466}\x{200D}\x{1F466})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F469}\x{200D}\x{1F467}\x{200D}\x{1F466})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F469}\x{200D}\x{1F467})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F469}\x{200D}\x{1F466})|[\x{1F469}](?:\x{200D}\x{2764}\x{FE0F}\x{200D}\x{1F469})|[\x{1F469}\x{1F468}](?:\x{200D}\x{2764}\x{FE0F}\x{200D}\x{1F468})|[\x{1F469}](?:\x{200D}\x{2764}\x{FE0F}\x{200D}\x{1F48B}\x{200D}\x{1F469})|[\x{1F469}\x{1F468}](?:\x{200D}\x{2764}\x{FE0F}\x{200D}\x{1F48B}\x{200D}\x{1F468})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F9BD})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F9BC})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F9AF})|[\x{1F575}\x{1F3CC}\x{26F9}\x{1F3CB}](?:\x{FE0F}\x{200D}\x{2640}\x{FE0F})|[\x{1F575}\x{1F3CC}\x{26F9}\x{1F3CB}](?:\x{FE0F}\x{200D}\x{2642}\x{FE0F})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F692})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F680})|[\x{1F468}\x{1F469}](?:\x{200D}\x{2708}\x{FE0F})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F3A8})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F3A4})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F4BB})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F52C})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F4BC})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F3ED})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F527})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F373})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F33E})|[\x{1F468}\x{1F469}](?:\x{200D}\x{2696}\x{FE0F})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F3EB})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F393})|[\x{1F468}\x{1F469}](?:\x{200D}\x{2695}\x{FE0F})|[\x{1F471}\x{1F64D}\x{1F64E}\x{1F645}\x{1F646}\x{1F481}\x{1F64B}\x{1F9CF}\x{1F647}\x{1F926}\x{1F937}\x{1F46E}\x{1F482}\x{1F477}\x{1F473}\x{1F9B8}\x{1F9B9}\x{1F9D9}\x{1F9DA}\x{1F9DB}\x{1F9DC}\x{1F9DD}\x{1F9DE}\x{1F9DF}\x{1F486}\x{1F487}\x{1F6B6}\x{1F9CD}\x{1F9CE}\x{1F3C3}\x{1F46F}\x{1F9D6}\x{1F9D7}\x{1F3C4}\x{1F6A3}\x{1F3CA}\x{1F6B4}\x{1F6B5}\x{1F938}\x{1F93C}\x{1F93D}\x{1F93E}\x{1F939}\x{1F9D8}](?:\x{200D}\x{2640}\x{FE0F})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F9B2})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F9B3})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F9B1})|[\x{1F468}\x{1F469}](?:\x{200D}\x{1F9B0})|[\x{1F471}\x{1F64D}\x{1F64E}\x{1F645}\x{1F646}\x{1F481}\x{1F64B}\x{1F9CF}\x{1F647}\x{1F926}\x{1F937}\x{1F46E}\x{1F482}\x{1F477}\x{1F473}\x{1F9B8}\x{1F9B9}\x{1F9D9}\x{1F9DA}\x{1F9DB}\x{1F9DC}\x{1F9DD}\x{1F9DE}\x{1F9DF}\x{1F486}\x{1F487}\x{1F6B6}\x{1F9CD}\x{1F9CE}\x{1F3C3}\x{1F46F}\x{1F9D6}\x{1F9D7}\x{1F3C4}\x{1F6A3}\x{1F3CA}\x{1F6B4}\x{1F6B5}\x{1F938}\x{1F93C}\x{1F93D}\x{1F93E}\x{1F939}\x{1F9D8}](?:\x{200D}\x{2642}\x{FE0F})|[\x{1F441}](?:\x{FE0F}\x{200D}\x{1F5E8}\x{FE0F})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1E9}\x{1F1F0}\x{1F1F2}\x{1F1F3}\x{1F1F8}\x{1F1F9}\x{1F1FA}](?:\x{1F1FF})|[\x{1F1E7}\x{1F1E8}\x{1F1EC}\x{1F1F0}\x{1F1F1}\x{1F1F2}\x{1F1F5}\x{1F1F8}\x{1F1FA}](?:\x{1F1FE})|[\x{1F1E6}\x{1F1E8}\x{1F1F2}\x{1F1F8}](?:\x{1F1FD})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1EC}\x{1F1F0}\x{1F1F2}\x{1F1F5}\x{1F1F7}\x{1F1F9}\x{1F1FF}](?:\x{1F1FC})|[\x{1F1E7}\x{1F1E8}\x{1F1F1}\x{1F1F2}\x{1F1F8}\x{1F1F9}](?:\x{1F1FB})|[\x{1F1E6}\x{1F1E8}\x{1F1EA}\x{1F1EC}\x{1F1ED}\x{1F1F1}\x{1F1F2}\x{1F1F3}\x{1F1F7}\x{1F1FB}](?:\x{1F1FA})|[\x{1F1E6}\x{1F1E7}\x{1F1EA}\x{1F1EC}\x{1F1ED}\x{1F1EE}\x{1F1F1}\x{1F1F2}\x{1F1F5}\x{1F1F8}\x{1F1F9}\x{1F1FE}](?:\x{1F1F9})|[\x{1F1E6}\x{1F1E7}\x{1F1EA}\x{1F1EC}\x{1F1EE}\x{1F1F1}\x{1F1F2}\x{1F1F5}\x{1F1F7}\x{1F1F8}\x{1F1FA}\x{1F1FC}](?:\x{1F1F8})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1EA}\x{1F1EB}\x{1F1EC}\x{1F1ED}\x{1F1EE}\x{1F1F0}\x{1F1F1}\x{1F1F2}\x{1F1F3}\x{1F1F5}\x{1F1F8}\x{1F1F9}](?:\x{1F1F7})|[\x{1F1E6}\x{1F1E7}\x{1F1EC}\x{1F1EE}\x{1F1F2}](?:\x{1F1F6})|[\x{1F1E8}\x{1F1EC}\x{1F1EF}\x{1F1F0}\x{1F1F2}\x{1F1F3}](?:\x{1F1F5})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1E9}\x{1F1EB}\x{1F1EE}\x{1F1EF}\x{1F1F2}\x{1F1F3}\x{1F1F7}\x{1F1F8}\x{1F1F9}](?:\x{1F1F4})|[\x{1F1E7}\x{1F1E8}\x{1F1EC}\x{1F1ED}\x{1F1EE}\x{1F1F0}\x{1F1F2}\x{1F1F5}\x{1F1F8}\x{1F1F9}\x{1F1FA}\x{1F1FB}](?:\x{1F1F3})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1E9}\x{1F1EB}\x{1F1EC}\x{1F1ED}\x{1F1EE}\x{1F1EF}\x{1F1F0}\x{1F1F2}\x{1F1F4}\x{1F1F5}\x{1F1F8}\x{1F1F9}\x{1F1FA}\x{1F1FF}](?:\x{1F1F2})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1EC}\x{1F1EE}\x{1F1F2}\x{1F1F3}\x{1F1F5}\x{1F1F8}\x{1F1F9}](?:\x{1F1F1})|[\x{1F1E8}\x{1F1E9}\x{1F1EB}\x{1F1ED}\x{1F1F1}\x{1F1F2}\x{1F1F5}\x{1F1F8}\x{1F1F9}\x{1F1FD}](?:\x{1F1F0})|[\x{1F1E7}\x{1F1E9}\x{1F1EB}\x{1F1F8}\x{1F1F9}](?:\x{1F1EF})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1EB}\x{1F1EC}\x{1F1F0}\x{1F1F1}\x{1F1F3}\x{1F1F8}\x{1F1FB}](?:\x{1F1EE})|[\x{1F1E7}\x{1F1E8}\x{1F1EA}\x{1F1EC}\x{1F1F0}\x{1F1F2}\x{1F1F5}\x{1F1F8}\x{1F1F9}](?:\x{1F1ED})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1E9}\x{1F1EA}\x{1F1EC}\x{1F1F0}\x{1F1F2}\x{1F1F3}\x{1F1F5}\x{1F1F8}\x{1F1F9}\x{1F1FA}\x{1F1FB}](?:\x{1F1EC})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1EC}\x{1F1F2}\x{1F1F3}\x{1F1F5}\x{1F1F9}\x{1F1FC}](?:\x{1F1EB})|[\x{1F1E6}\x{1F1E7}\x{1F1E9}\x{1F1EA}\x{1F1EC}\x{1F1EE}\x{1F1EF}\x{1F1F0}\x{1F1F2}\x{1F1F3}\x{1F1F5}\x{1F1F7}\x{1F1F8}\x{1F1FB}\x{1F1FE}](?:\x{1F1EA})|[\x{1F1E6}\x{1F1E7}\x{1F1E8}\x{1F1EC}\x{1F1EE}\x{1F1F2}\x{1F1F8}\x{1F1F9}](?:\x{1F1E9})|[\x{1F1E6}\x{1F1E8}\x{1F1EA}\x{1F1EE}\x{1F1F1}\x{1F1F2}\x{1F1F3}\x{1F1F8}\x{1F1F9}\x{1F1FB}](?:\x{1F1E8})|[\x{1F1E7}\x{1F1EC}\x{1F1F1}\x{1F1F8}](?:\x{1F1E7})|[\x{1F1E7}\x{1F1E8}\x{1F1EA}\x{1F1EC}\x{1F1F1}\x{1F1F2}\x{1F1F3}\x{1F1F5}\x{1F1F6}\x{1F1F8}\x{1F1F9}\x{1F1FA}\x{1F1FB}\x{1F1FF}](?:\x{1F1E6})|[\x{00A9}\x{00AE}\x{203C}\x{2049}\x{2122}\x{2139}\x{2194}-\x{2199}\x{21A9}-\x{21AA}\x{231A}-\x{231B}\x{2328}\x{23CF}\x{23E9}-\x{23F3}\x{23F8}-\x{23FA}\x{24C2}\x{25AA}-\x{25AB}\x{25B6}\x{25C0}\x{25FB}-\x{25FE}\x{2600}-\x{2604}\x{260E}\x{2611}\x{2614}-\x{2615}\x{2618}\x{261D}\x{2620}\x{2622}-\x{2623}\x{2626}\x{262A}\x{262E}-\x{262F}\x{2638}-\x{263A}\x{2640}\x{2642}\x{2648}-\x{2653}\x{265F}-\x{2660}\x{2663}\x{2665}-\x{2666}\x{2668}\x{267B}\x{267E}-\x{267F}\x{2692}-\x{2697}\x{2699}\x{269B}-\x{269C}\x{26A0}-\x{26A1}\x{26AA}-\x{26AB}\x{26B0}-\x{26B1}\x{26BD}-\x{26BE}\x{26C4}-\x{26C5}\x{26C8}\x{26CE}-\x{26CF}\x{26D1}\x{26D3}-\x{26D4}\x{26E9}-\x{26EA}\x{26F0}-\x{26F5}\x{26F7}-\x{26FA}\x{26FD}\x{2702}\x{2705}\x{2708}-\x{270D}\x{270F}\x{2712}\x{2714}\x{2716}\x{271D}\x{2721}\x{2728}\x{2733}-\x{2734}\x{2744}\x{2747}\x{274C}\x{274E}\x{2753}-\x{2755}\x{2757}\x{2763}-\x{2764}\x{2795}-\x{2797}\x{27A1}\x{27B0}\x{27BF}\x{2934}-\x{2935}\x{2B05}-\x{2B07}\x{2B1B}-\x{2B1C}\x{2B50}\x{2B55}\x{3030}\x{303D}\x{3297}\x{3299}\x{1F004}\x{1F0CF}\x{1F170}-\x{1F171}\x{1F17E}-\x{1F17F}\x{1F18E}\x{1F191}-\x{1F19A}\x{1F201}-\x{1F202}\x{1F21A}\x{1F22F}\x{1F232}-\x{1F23A}\x{1F250}-\x{1F251}\x{1F300}-\x{1F321}\x{1F324}-\x{1F393}\x{1F396}-\x{1F397}\x{1F399}-\x{1F39B}\x{1F39E}-\x{1F3F0}\x{1F3F3}-\x{1F3F5}\x{1F3F7}-\x{1F3FA}\x{1F400}-\x{1F4FD}\x{1F4FF}-\x{1F53D}\x{1F549}-\x{1F54E}\x{1F550}-\x{1F567}\x{1F56F}-\x{1F570}\x{1F573}-\x{1F57A}\x{1F587}\x{1F58A}-\x{1F58D}\x{1F590}\x{1F595}-\x{1F596}\x{1F5A4}-\x{1F5A5}\x{1F5A8}\x{1F5B1}-\x{1F5B2}\x{1F5BC}\x{1F5C2}-\x{1F5C4}\x{1F5D1}-\x{1F5D3}\x{1F5DC}-\x{1F5DE}\x{1F5E1}\x{1F5E3}\x{1F5E8}\x{1F5EF}\x{1F5F3}\x{1F5FA}-\x{1F64F}\x{1F680}-\x{1F6C5}\x{1F6CB}-\x{1F6D2}\x{1F6D5}\x{1F6E0}-\x{1F6E5}\x{1F6E9}\x{1F6EB}-\x{1F6EC}\x{1F6F0}\x{1F6F3}-\x{1F6FA}\x{1F7E0}-\x{1F7EB}\x{1F90D}-\x{1F93A}\x{1F93C}-\x{1F945}\x{1F947}-\x{1F971}\x{1F973}-\x{1F976}\x{1F97A}-\x{1F9A2}\x{1F9A5}-\x{1F9AA}\x{1F9AE}-\x{1F9CA}\x{1F9CD}-\x{1F9FF}\x{1FA70}-\x{1FA73}\x{1FA78}-\x{1FA7A}\x{1FA80}-\x{1FA82}\x{1FA90}-\x{1FA95}]/u;

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

        // BASIC
        var startt = 'E3 starts on Saturday, June 8th, and goes till Tuesday, June 11th.';
        var eat = ['EA ','on Saturday, ','11:30AM CST - 6:30PM CEST ','https://twitch.tv/ea'];
        var microt;
        var digitalt;
        var bethesdat;
        var pcgamet;
        var ubisoftt;
        var squaret;
        var nintendot;
        var sonyt;

        // RESULT
        var ear = eat[0] + eat[1] + eat[2] + eat[3];

        // STARTS
        const starts = 'E3 starts on Saturday, June 8th, and goes till Tuesday, June 11th.';
        const eas = 'EA on Saturday, 9:30AM PT - 6:30PM CEST, https://www.twitch.tv/ea';
        const micros = 'Microsoft on Sunday, 1PM PT - 10PM CEST, https://www.twitch.tv/xbox';
        const digitals = 'Devolver Digital on Sunday, 7PM PT - 4AM CEST, https://www.twitch.tv/devolverdigital';
        const bethesdas = 'Bethesda on Sunday, 5:30PM PT - 3:30AM CEST, https://www.twitch.tv/bethesda';
        const pcgames = 'PC Gaming Show on Monday, 10AM PT - 7PM CEST, https://www.twitch.tv/pcgamer';
        const ubisofts = 'Ubisoft on Monday, 1PM PT - 10PM CEST, https://www.twitch.tv/bethesda';
        const squares = 'Square Enix on Monday, 6PM PT - 3AM CEST, https://www.twitch.tv/squareenix';
        const nintendos = 'Nintendo on Tuesday, 9AM PT - 6PM CEST, https://www.twitch.tv/nintendo';
        const sonys = 'Sony will not be at E3, instead they just did a bunch of directs\: https://www.youtube.com/playlist?list=PLol_ykYs3OQ5hs75PIl_si3Vk1709vDT0';


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
                        NowThen();
                        if (start.test(mText) || begin.test(mText)) {
                            return startt;
                        }
                        //if (emojiex.test(mText)) {
                        //    return 'What? You think this is fucking pictionary? I don\'t have eyes.'
                        //}
                        // DATE TESTS
                        if (sat.test(mText) || sun.test(mText) || mon.test(mText) || tues.test(mText) || today.test(mText) || tomorrow.test(mText)) {
                            if (sat.test(mText)) {
                                return ear;
                            }
                            if (sun.test(mText)) {
                                return microt+'\n\n'+bethesdat+'\n\n'+digitalt;
                            }
                            if (mon.test(mText)) {
                                return ubisoftt+'\n\n'+squaret+'\n\n'+pcgamet;
                            }
                            if (tues.test(mText)) {
                                return nintendot;
                            }
                            if (today.test(mText) || tomorrow.test(mText)) {
                                if (tomorrow.test(mText)) {
                                    date = date + 1;
                                }
                                if (date == 8) {
                                    return ear;
                                }
                                if (date == 9) {
                                    return microt+'\n\n'+bethesdat+'\n\n'+digitalt;
                                }
                                if (date == 10) {
                                    return ubisoftt+'\n\n'+squaret+'\n\n'+pcgamet;
                                }
                                if (date == 11) {
                                    return nintendot;
                                }
                                else {
                                    if (date > 11) {
                                        return 'All events have concluded'
                                    }
                                    return 'There are no events'
                                }
                            }
                        }
                        // COMPANY TESTS
                        else {
                            if (all.test(mText) || every.test(mText)) {
                                return ear+'\n\n'+microt+'\n\n'+bethesdat+'\n\n'+digitalt+'\n\n'+ubisoftt+'\n\n'+squaret+'\n\n'+pcgamet+'\n\n'+nintendot+'\n\n'+sonyt;
                            }
                            if (ea.test(mText)) {
                                return ear;
                            }
                            if (micro.test(mText) || xbox.test(mText)) {
                                return microt;
                            }
                            if (bethesda.test(mText)) {
                                return bethesdat;
                            }
                            if (digital.test(mText) || devolver.test(mText)) {
                                return digitalt;
                            }
                            if (ubisoft.test(mText)) {
                                return ubisoftt;
                            }
                            if (square.test(mText) || enix.test(mText)) {
                                return squaret;
                            }
                            if (pcgame.test(mText)) {
                                return pcgamet;
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
