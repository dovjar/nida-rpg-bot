import { Client, Message } from 'discord.js';
import { IHandlerOptions, ICommandParser, ICommandHandler } from './interfaces';

import fs from 'fs';
import path from 'path';

const defaultOptions:IHandlerOptions={
  prefix:"!",
  commandsPath:__dirname +"/commands",
  handlersPath:__dirname +"/handlers"
}

const getAllFiles = (dirPath:string, arrayOfFiles:string[]=null) => {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles( dirPath + "/" + file, arrayOfFiles )
    } else {
      arrayOfFiles.push(path.join( dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

export class MessageHandler{
  constructor(options:IHandlerOptions = defaultOptions) {
    this.options=options;
    const commands= new Array<ICommandParser>();
    getAllFiles(options.commandsPath).filter(file => file.slice(-3) === '.js').forEach((file) => {
      try {
        const command = require(file).commandParser;

        commands.push(command);
        console.log(`command ${file} loaded`);
      } catch (err) {
          console.warn(file + " command failed to load.\n", err.stack);
      }
    });

    this.commandParsers = commands.sort((a, b)=> a.priority - b.priority);

    getAllFiles(options.handlersPath).filter(file =>file.slice(-3) === '.js').forEach((file) => {
      try {
        const handler = require(file).commandHandler;

        this.handlers.push(handler);
        console.log(`handler ${file} loaded`);
      } catch (err) {
          console.warn(file + ' handler failed to load.\n', err.stack);
      }
    });

  }
  private options:IHandlerOptions;
  private commandParsers:ICommandParser[] = new Array<ICommandParser>();
  private handlers:ICommandHandler[] = new Array<ICommandHandler>();
  public subscribe(bot: Client){
    bot.on('message', async (message:Message) => {
      if(message.content.startsWith(this.options.prefix)){
        // console.log(message.content);
        const cut = message.content.substring(this.options.prefix.length).trim();

        for (const parser of this.commandParsers) {
          const cmd=parser.createCommand(message,cut);
          if(cmd!=null)
          {
            console.log(`command ${cmd.constructor.name} was created`);
            const results= this.handlers
              .map(t=>{
                const result=t.handle(cmd);
                if (result) console.log(`command was handled by ${t.constructor.name}`);
                return result;
              })
              .filter(t=>t!=null);
            break;
          }

        }
      }

    });
  }
}