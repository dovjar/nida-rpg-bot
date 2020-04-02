import { ICommandHandler, ICommand } from '../interfaces';
import { CommandResult } from "../commandResults/CommandResult";
import { HelpCommand } from '../messageParsers/helpCommand';
import { Context } from '../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof HelpCommand )
      return new CommandResult("can't handle it");
    return null;
  }
}