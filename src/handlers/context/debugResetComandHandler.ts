import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { DebugResetCommand } from "../../commands/context/DebugResetCommand";

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof DebugResetCommand ))
      return null;

    context.resetDices();
    return new CommandResult(`Cheat mode disabled`);
  }
}
