import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { SocialRollAggregateCommand } from '../../commands/roll/SocialRollAggregateCommand';
import { SocialRollResult } from '../../commandResults/SocialRollResult';
import { Rules } from '../../Rules';
import { decorateSocialRoll, decorateSocialRollAfterLuck } from '../../decorators';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SocialRollAggregateCommand ))
      return null;
    let originalRoll=command.originalRoll.result.roll.map(t=>t.toString());
    let orgRollNumber = [...command.originalRoll.result.roll];
    for(const dice of command.rerollDices){
      const idx = originalRoll.findIndex(t=>t===dice.toString());
      originalRoll[idx]='?';
      orgRollNumber.splice(idx,1);
    }
    orgRollNumber = [...orgRollNumber, ...command.luckRoll.result.roll];
    originalRoll = [...originalRoll, ...command.luckRoll.result.roll.map(t=>t.toString())]
    if (command.originalRoll.result.isBotch && !Rules.socialIsBotch(orgRollNumber, command.originalRoll.effectiveness)){
      // after luck not a botch, explode
      originalRoll = [...originalRoll, ...context.explode(orgRollNumber).map(t=>t.toString())]
      orgRollNumber = [...orgRollNumber, ...context.explode(orgRollNumber)];
    }


    const successDice = Rules.socialSuccessNum(orgRollNumber, command.originalRoll.effectiveness);
    const isBotch = Rules.socialIsBotch(orgRollNumber, command.originalRoll.effectiveness);
    const showSkillIncrease =()=>successDice >= command.originalRoll.dices ? '***skill increase!***' : '';
    const showBotchFail=():string => isBotch?`**botch**`:'';

    return new SocialRollResult(`After luck:${command.originalRoll.dices}D6 [effectiveness ${command.originalRoll.effectiveness}] [${decorateSocialRollAfterLuck(originalRoll,command.originalRoll.dices, command.originalRoll.effectiveness)}]=${successDice} ${showBotchFail()}${showSkillIncrease()}`,
                    orgRollNumber, command.originalRoll.effectiveness,isBotch, successDice, command.originalRoll.dices);
  }
}
