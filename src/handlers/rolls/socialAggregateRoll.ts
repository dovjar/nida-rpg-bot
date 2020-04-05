import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { SocialRollAggregateCommand } from '../../commands/roll/SocialRollAggregateCommand';
import {  SocialRollOutcomeEnum } from '../../commandResults/SocialRollResult';
import { Rules } from '../../Rules';
import { SocialAggregateRollResult } from '../../commandResults/SocialAggregateRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SocialRollAggregateCommand ))
      return null;
    let originalRoll=command.originalRoll.result.roll.map(t=>t.toString());
    let orgRollNumber = [...command.originalRoll.result.roll].sort().reverse().splice(0,command.originalRoll.result.roll.length - command.rerollDices.length);
    for(const dice of command.rerollDices){
      const idx = originalRoll.findIndex(t=>t===dice.toString());
      originalRoll[idx]='?';
    }

    orgRollNumber = [...orgRollNumber, ...command.luckRoll.result.roll];
    originalRoll = [...originalRoll, ...command.luckRoll.result.roll.map(t=>t.toString())]
    if (command.originalRoll.result.outcome === SocialRollOutcomeEnum.Botch && !Rules.socialIsBotch(orgRollNumber, command.originalRoll.effectiveness)){
      // after luck not a botch, explode
      originalRoll = [...originalRoll, ...context.explode(orgRollNumber).map(t=>t.toString())]
      orgRollNumber = [...orgRollNumber, ...context.explode(orgRollNumber)];
    }


    const successDices = Rules.socialSuccessNum(orgRollNumber, command.originalRoll.effectiveness);
    const isBotch = Rules.socialIsBotch(orgRollNumber, command.originalRoll.effectiveness);
    const outcome = isBotch? SocialRollOutcomeEnum.Botch:(successDices>=command.originalRoll.dices?SocialRollOutcomeEnum.SkillIncrease:SocialRollOutcomeEnum.Success);
    return new SocialAggregateRollResult( orgRollNumber, originalRoll, command.originalRoll.effectiveness,outcome, successDices, command.originalRoll.dices);
  }
}
