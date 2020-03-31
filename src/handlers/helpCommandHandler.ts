import { ICommandHandler, ICommand, ICommandResult } from '../interfaces';
import { Message } from 'discord.js';
import { HelpCommand } from '../commands/helpCommand';

export const commandHandler:ICommandHandler = {
  handle(command:ICommand = {message:null }):ICommandResult{
    if (command instanceof HelpCommand )
      command.message.reply("cant't handle it");
    return null;
  }
}