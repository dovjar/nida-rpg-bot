import { ICommandHandler, ICommand, ICommandResult } from '../interfaces';
import { Message } from 'discord.js';

export const commandHandler:ICommandHandler = {
  handle(command:ICommand = {type:'', message:null }):ICommandResult{
    if (command.type ==='helpCommand' )
      command.message.reply("cant't handle it");
    return null;
  }
}