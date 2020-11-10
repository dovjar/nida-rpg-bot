import { ICommandHandler, ICommand } from "../interfaces";
import { CommandResult } from "../commandResults/CommandResult";
import { Context } from "../context";
import { RulesCommandFromRoll } from "../commands/RulesCommandFromRoll";
import { SimpleRedirectResult } from "../commandResults/SimpleRedirectResult";
import { RulesCommand } from "../commands/RulesCommand";

export const commandHandler:ICommandHandler = {
    async handle(command:ICommand , context:Context):Promise<CommandResult>{
      if (command instanceof RulesCommandFromRoll){
        if (command.sides === 0){
          command.sides = context.globalContext.dSides;
        }

        const roll = context.rollOne(command.sides);
        return new SimpleRedirectResult(`Roll 1D${command.sides}=[${roll}]`,[new RulesCommand(command.chapter, roll)])
      }
      return null;
    }
}
