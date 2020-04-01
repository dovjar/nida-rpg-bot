import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { Context } from '../../context';
import { DebugResetComand } from '../../commands/context/debugReset';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof DebugResetComand ))
      return null;

    context.resetDices();
    return new CommandResult(`Cheat mode disabled`);
  }
}
