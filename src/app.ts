import { MessageHandler } from './handler';
import Discord = require('discord.js');
import mongoose from 'mongoose';
import { CharModel } from './models/char';

// tslint:disable-next-line:no-var-requires
const CONFIG = require('./../config.json');
const BOT = new Discord.Client();

mongoose.connect("mongodb://root:rootpassword@10.10.10.190:27017/discord?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Mongo Connected');
});

BOT.login(CONFIG.token)
   .then(() => console.log('Successfully logged as', BOT.user.username))
   .catch((error) => console.log(error));

const HANDLER= new MessageHandler();
HANDLER.subscribe(BOT);



