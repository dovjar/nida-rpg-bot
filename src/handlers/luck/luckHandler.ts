import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { SimpleRedirectResult } from "../../commandResults/SimpleRedirectResult";
import { LuckCommand } from '../../commands/luck/LuckCommand';
import { Context } from '../../context';
import { CombatRollCommand } from '../../commands/roll/CombatRollCommand';
import { LuckCommandCheckRerollResult } from '../../commands/luck/LuckCommandCheckRerollResult';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';
import { SpellResultEnum } from '../../commandResults/SpellRollResult';
import { SocialRollCommand } from '../../commands/roll/SocialRollCommand';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';
import { SocialRollAggregateCommand } from '../../commands/roll/SocialRollAggregateCommand';
import { SocialReRollCommand } from '../../commands/roll/SocialReRollCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof LuckCommand ){
        // find last roll
        const lastRoll = context.commandsHistory.reverse().find(t=>
          t.command instanceof CombatRollCommand ||
          t.command instanceof SpellRollCommand ||
          t.command instanceof SocialRollCommand ||
          t.command instanceof LuckCommandCheckRerollResult);

        if (!lastRoll)
          return new CommandResult(`didn't found any suitable roll to spend luck`);
        if(lastRoll.command instanceof LuckCommandCheckRerollResult)
            return new CommandResult(`sorry, luck can be spent once per action`);

        if (lastRoll.command instanceof CombatRollCommand){
          const oldRoll = lastRoll.command as CombatRollCommand;
          return handleCombatLuck(oldRoll);
        }
        if (lastRoll.command instanceof SpellRollCommand){
          const oldRoll = lastRoll.command as SpellRollCommand;
          return handleSpellLuck(oldRoll);
        }
        if (lastRoll.command instanceof SocialRollCommand){
          if(!command.dices)
            return new SimpleRedirectResult(`found social roll, but was not specified how many dices needs to be to rerolled.`,
              [
                new HelpCommand(HelpTypeEnum.Luck)
              ]);
              const oldRoll = lastRoll.command as SocialRollCommand;
          return handleSocialLuck(oldRoll, command.dices);
        }

    }
    return null;
  }
}

const handleCombatLuck=(oldRoll: CombatRollCommand ):CommandResult=>{
    const newRoll = new CombatRollCommand(oldRoll.mod);
    if (oldRoll.result.total() <=4)
      return new CommandResult(`found spell roll [${oldRoll.result.roll}], cant spent luck on critical failure`);
    if (oldRoll.result.total() >=17)
      return new CommandResult(`found spell roll [${oldRoll.result.roll}], cant spent luck on critical success`);
    return new SimpleRedirectResult(`spending 2 points of luck to reroll last combat roll`,
      [
        newRoll,
        new LuckCommandCheckRerollResult(oldRoll.result,newRoll)
      ]);
}

const handleSpellLuck=(oldRoll:SpellRollCommand):CommandResult=>{
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
const handleSocialLuck=(oldCommand: SocialRollCommand, dices:number ):CommandResult=>{
  const roll=[...oldCommand.result.roll];
  const minDices = roll.sort().slice(0, dices);
  // on reroll do not explode if botch was rolled
  const newCommand = new SocialReRollCommand(dices,oldCommand.effectiveness, !oldCommand.result.isBotch);
  const aggregateResult = new SocialRollAggregateCommand(oldCommand, newCommand, minDices);
  return new SimpleRedirectResult(`spending ${dices>1?2:1} points of luck to reroll last social roll, picked [${minDices}]`,
  [
    newCommand,
    aggregateResult,
    new LuckCommandCheckRerollResult(oldCommand.result,aggregateResult)
  ]);

}