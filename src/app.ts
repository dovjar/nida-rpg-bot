import { MessageHandler } from './handler';
import Discord = require('discord.js');
import mongoose from 'mongoose';
const CONFIG = require('./../config.json') || {DISCORD_API_KEY:process.env.DISCORD_API_KEY, MONGODB_URL:process.env.MONGODB_URL};

const BOT = new Discord.Client();

mongoose.connect(CONFIG.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((e)=> console.error(e));
mongoose.set('bufferCommands', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Mongo Connected');
});

BOT.login(CONFIG.DISCORD_API_KEY)
   .then(() => console.log('Successfully logged as', BOT.user.username))
   .catch((error) => console.log(error));

const HANDLER= new MessageHandler();
HANDLER.subscribe(BOT);




