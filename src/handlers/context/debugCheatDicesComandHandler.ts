import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { DebugCheatDicesCommand } from "../../commands/context/DebugCheatDicesCommand";

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof DebugCheatDicesCommand ))
      return null;

    context.setDebugDices(command.dices);
    return new CommandResult(`Cheat mode enabled, every dice roll will be pooled from ${command.dices}`);
  }
}
