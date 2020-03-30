import { Client, Message } from 'discord.js';
import { IHandlerOptions, ICommandParser, ICommandHandler } from './interfaces';
import { commandHandler } from './handlers/helpCommandHandler';

const fs = require('fs');

const defaultOptions:IHandlerOptions={ 
  prefix:"!", 
  commandsPath:__dirname +"/commands", 
  handlersPath:__dirname +"/handlers"
}

export class MessageHandler{
  constructor(options:IHandlerOptions = defaultOptions) {
    this.options=options;
    const commands= new Array<ICommandParser>();
    fs.readdirSync(options.commandsPath).filter(file => (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js')).forEach((file) => {
      try {
        let command = require(options.commandsPath + '/' + file)['commandParser'];
            
        commands.push(command);
        console.log(`command ${file} loaded`);
      } catch (err) {
        if (!err.message.startsWith('Cannot find module'))
          console.warn(file + ' command failed to load.\n', err.stack);
      }
    });
    
    this.commandParsers = commands.sort((a, b)=> a.priority - b.priority);

    fs.readdirSync(options.handlersPath).filter(file => (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js')).forEach((file) => {
      try {
        let handler = require(options.handlersPath + '/' + file)['commandHandler'];
            
        this.handlers.push(handler);
        console.log(`handler ${file} loaded`);
      } catch (err) {
        if (!err.message.startsWith('Cannot find module'))
          console.warn(file + ' handler failed to load.\n', err.stack);
      }
    });
    
   

  }
  private options:IHandlerOptions;
  private commandParsers:Array<ICommandParser> = new Array<ICommandParser>();
  private handlers:Array<ICommandHandler> = new Array<ICommandHandler>();
  public subscribe(bot: Client){
    bot.on('message', async (message) => {
      if(message.content.startsWith(this.options.prefix)){
        console.log(message.content);
        let cut = message.content.substring(this.options.prefix.length).trim();
        
        for (let index = 0; index < this.commandParsers.length; index++) {
          const cmd=this.commandParsers[index].createCommand(message,cut);
          if(cmd!=null)
          {
            const results= this.handlers.map(t=>t.handle(cmd)).filter(t=>t!=null);
            break;
          }
          
        }
      }
      
    });
  }
}