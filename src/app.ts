import { MessageHandler } from './handler';
import Discord = require('discord.js');
import mongoose from 'mongoose';
import express from 'express';

const BOT = new Discord.Client();

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((e)=> console.error(e));
mongoose.set('bufferCommands', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Mongo Connected');
});

BOT.login(process.env.DISCORD_API_KEY)
   .then(() => console.log('Successfully logged as', BOT.user.username))
   .catch((error) => console.log(error));

const HANDLER= new MessageHandler();
HANDLER.subscribe(BOT);

const app = express();
app.get('/', (req, res) => res.send('Kill all humans! all bots unite!!'));

app.get('*', (_req, res) => {
  res.status(404).send('ERROR 404');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}!`));




