import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { contextManager } from '../../context';
import { ChangeRulesCommand } from "../../commands/context/ChangeRulesCommand";

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand ):Promise<CommandResult>{
    if (!(command instanceof ChangeRulesCommand ))
      return null;

    contextManager.changeRules(command.rules);
    
    return new CommandResult(`using ${command.rules} rules`);
  }
}
