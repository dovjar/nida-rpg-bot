import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { DebugSetAutoFailCommand } from "../../commands/context/DebugSetAutofailCommand";

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof DebugSetAutoFailCommand ))
      return null;

    context.globalContext.autoFail = command.autoFail;
    return new CommandResult(`AutoFail will be ${command.autoFail}`);
  }
}
