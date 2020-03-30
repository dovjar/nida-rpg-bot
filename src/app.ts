import { MessageHandler } from './handler';
import Discord = require('discord.js');
// tslint:disable-next-line:no-var-requires
const CONFIG = require('./../config.json');
const BOT = new Discord.Client();


BOT.login(CONFIG.token)
    .then(() => console.log('Successfully logged as', BOT.user.username))
    .catch((error) => console.log(error));

const HANDLER= new MessageHandler();
HANDLER.subscribe(BOT);

