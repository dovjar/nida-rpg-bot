import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { LuckCommandCheckRerollResult as LuckCheckRerollResultCommand } from '../../commands/luck/LuckCommandCheckRerollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof LuckCheckRerollResultCommand ){
        // find last combat roll
        if ((command.newCommand.result.initialRol() <= command.prev.initialRol()))
          return new CommandResult(`Luck well spent ${command.newCommand.result.initialRol()} <= ${command.prev.initialRol()} `);
        return new CommandResult(`You are lucky man ${command.newCommand.result.initialRol()} > ${command.prev.initialRol()}`);
    }
    return null;
  }
}