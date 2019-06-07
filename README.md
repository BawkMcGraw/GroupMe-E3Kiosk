# GroupMe Bot Starter

This bot provides E3 2019 information to chat requests. Includes bot name, so it doesn't spam everytime you talk about e3.... hopefully. It lets you check times using the following commands:

* today
* tomorrow
* saturday
* sunday
* monday
* tuesday
* xbox or microsoft
* sony
* nintendo
* ea
* square enix
* bethesda
* google
* stadia

You must include its name in the request:

* E3 Info

I've already included this years schedule. in CST time (because that's relavent to my group) and CEST time, for my friend. I've also programed it to check the date and time, and change its response if an event is on-going or passed.

If also super simplified updating this information year to year. You'll still have to stack the events per day (mon, tues, etc) yourself every year. But now its just updating 2 places instead of like 5. I've included notes so you know which array sections represent what information.

## To-do

* Write a way to pull this information from E3's website (if possible) or maybe incorporate a website with forms for easy input.
* add handlers for requests that have no events, such as wednesday or friday.
* add handler for request by date (8th, 9th, 10th, 6/6, etc).
* add handler for emojis. Will definitely be sarcastic responses, no helpful emoji support.
* add more event and publisher support such as Pokemon's event on Wednesday.

## License

[GNU GPLv3 License](LICENSE.txt)
