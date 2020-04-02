import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { Context } from '../../context';
import { DebugCheatDicesComand } from "../../commands/context/DebugCheatDicesComand";

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof DebugCheatDicesComand ))
      return null;

    context.setDebugDices(command.dices);
    return new CommandResult(`Cheat mode enabled, every dice roll will be pooled from ${command.dices}`);
  }
}
