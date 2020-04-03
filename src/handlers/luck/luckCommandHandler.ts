import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { SimpleRedirectResult } from "../../commandResults/SimpleRedirectResult";
import { LuckCommand } from '../../commands/luck/LuckCommand';
import { Context } from '../../context';
import { CombatRollCommand } from '../../commands/roll/CombatRollCommand';
import { LuckCommandCheckRerollResult } from '../../commands/luck/LuckCommandCheckRerollResult';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';
import { SpellResultEnum } from '../../commandResults/SpellRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof LuckCommand ){
        // find last roll
        const lastRoll = context.commandsHistory.reverse().find(t=>t.command instanceof CombatRollCommand || t.command instanceof SpellRollCommand);
        if (lastRoll.command instanceof CombatRollCommand){
          const oldRoll = lastRoll.command as CombatRollCommand;
          const newRoll = new CombatRollCommand(oldRoll.mod);
          return new SimpleRedirectResult(`spending 2 points of luck to reroll last combat roll`,
            [
              newRoll,
              new LuckCommandCheckRerollResult(oldRoll.result,newRoll)
            ]);
        }
        if (lastRoll.command instanceof SpellRollCommand){
          const oldRoll = lastRoll.command as SpellRollCommand;
          if (oldRoll.result.spellResult === SpellResultEnum.criticalFailure)
            return new CommandResult(`found spell roll [${oldRoll.result.roll}], cant spent luck on critical failure`);
          if (oldRoll.result.spellResult === SpellResultEnum.criticalSuccess)
            return new CommandResult(`found spell roll [${oldRoll.result.roll}], cant spent luck on critical success`);
          const newRoll = new SpellRollCommand();
          return new SimpleRedirectResult(`spending 2 points of luck to reroll last spell roll`,
            [
              newRoll,
              new LuckCommandCheckRerollResult(oldRoll.result,newRoll)
            ]);
        }
        return new CommandResult(`didn't found any suitable roll to spend luck`);
    }
    return null;
  }
}