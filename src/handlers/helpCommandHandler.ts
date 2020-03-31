import { ICommandHandler, ICommand, CommandResult } from '../interfaces';
import { Message } from 'discord.js';
import { HelpCommand } from '../commands/helpCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand = {message:null }):Promise<CommandResult>{
    if (command instanceof HelpCommand )
      return new CommandResult("cant't handle it");
    return null;
  }
}