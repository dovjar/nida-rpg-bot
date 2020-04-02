import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { SimpleRedirectResult } from "../../commandResults/SimpleRedirectResult";
import { LuckCommand } from '../../commands/luck/LuckCommand';
import { Context } from '../../context';
import { CombatRollCommand } from '../../commands/roll/CombatRollCommand';
import { LuckCommandCheckRerollResult } from '../../commands/luck/LuckCommandCheckRerollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof LuckCommand ){
        // find last combat roll
        const combatRoll = context.commandsHistory.reverse().find(t=>t.command instanceof CombatRollCommand);
        if(combatRoll){
            const oldRoll = combatRoll.command as CombatRollCommand;
            const newRoll = new CombatRollCommand(oldRoll.mod);
            return new SimpleRedirectResult(`spending 2 points of luck to reroll last combat roll`,
              [
                newRoll,
                new LuckCommandCheckRerollResult(oldRoll.result,newRoll)
              ]);
        }else{
            return new CommandResult(`didn't found any suitable roll to spend luck`);
        }
    }
    return null;
  }
}