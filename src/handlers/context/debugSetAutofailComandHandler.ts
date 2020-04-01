import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { Context } from '../../context';
import { DebugSetAutofailComand } from '../../commands/context/setAutofail';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof DebugSetAutofailComand ))
      return null;

    context.globalContext.autofail = command.autofail;
    return new CommandResult(`Autofail will be ${command.autofail}`);
  }
}
