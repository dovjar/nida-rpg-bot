import { Client, Message } from 'discord.js';
import { IHandlerOptions, IMessageParser, ICommandHandler, CommandResult, isIHaveTheCommand, IHaveTheCommand } from './interfaces';

import fs from 'fs';
import path from 'path';
import { contextManager } from './context';

const defaultOptions:IHandlerOptions={
  prefix:"!",
  commandsPath:__dirname +"/messageParsers",
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
    const commands= new Array<IMessageParser>();
    getAllFiles(options.commandsPath).filter(file => file.slice(-3) === '.js').forEach((file) => {
      try {
        const command = require(file).commandParser;

        commands.push(command);
        console.log(`command ${file} loaded`);
      } catch (err) {
          console.warn(file + " command failed to load.\n", err.stack);
      }
    });

    this.messageParsers = commands.sort((a, b)=> -a.priority + b.priority);

    getAllFiles(options.handlersPath).filter(file =>file.slice(-3) === '.js').forEach((file) => {
      try {
        const handler = require(file).commandHandler;

        this.handlerDescriptors.push({handler, file } as IHandlerDesciptor);
        console.log(`handler ${file} loaded`);
      } catch (err) {
          console.warn(file + ' handler failed to load.\n', err.stack);
      }
    });

  }
  private options:IHandlerOptions;
  private messageParsers:IMessageParser[] = new Array<IMessageParser>();
  private handlerDescriptors:IHandlerDesciptor[] = new Array<IHandlerDesciptor>();
  public subscribe(bot: Client){
    bot.on('message', async (message:Message) => {
      if(message.content.startsWith(this.options.prefix)){
        const context = contextManager.getContext(message.member.user.id);
        console.log(message.content);
        const cut = message.content.substring(this.options.prefix.length).trim();

        for (const parser of this.messageParsers) {
          const commands=await parser.createCommand(cut);
          if(commands!=null)
          {
            const results= new Array<CommandResult>();
            let idx=0;
            while(idx<commands.length){
              const cmd = commands[idx];
              console.log(`command received: ${cmd.constructor.name}= ${JSON.stringify(cmd)}`);
              for(const hndl of this.handlerDescriptors){
                try{
                  const result = await hndl.handler.handle(cmd,context);
                  if (result){
                    console.log(`command was handled by ${hndl.file}`);
                    message.reply(`${context.cheatsEnabled? '**CHEATER** ':''}${result.message}`);
                    results.push(result);
                    if (isIHaveTheCommand(result)){
                      (result as IHaveTheCommand).commands.forEach(t=>{
                        console.log(`new command ${t.constructor.name} was produced by ${hndl.file}`);
                        commands.push(t);
                      });
                    }
                  }
                }
                catch(exception){
                  console.log(exception);
                  message.reply(`:unamused: something goes wrong\n${exception.message}`);
                }
              }
              idx++;
            }
            break;
          }

        }
      }

    });
  }
}

interface IHandlerDesciptor{
  handler: ICommandHandler,
  file:string
}