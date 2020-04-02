import { ICommandHandler, ICommand, CommandResult } from '../interfaces';
import { HelpCommand } from '../messageParsers/helpCommand';
import { Context } from '../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand = {message:null }, context:Context):Promise<CommandResult>{
    if (command instanceof HelpCommand )
      return new CommandResult("cant't handle it");
    return null;
  }
}