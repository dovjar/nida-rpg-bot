import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { decorateSocialRoll } from '../../decorators';
import { Context } from '../../context';
import { SocialRollCommand } from '../../commands/roll/SocialRollCommand';
import { SocialRollResult } from '../../commandResults/SocialRollResult';
import { Rules } from '../../Rules';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SocialRollCommand ))
      return null;

    let roll = context.rollMany(command.dices);
    const isBotch = Rules.socialIsBotch(roll, command.effectiveness);

    if (!isBotch) {
      roll = [...roll, ...context.explode(roll)];
    }
    const successDice = Rules.socialSuccessNum(roll, command.effectiveness);
    const showSkillIncrease =()=>successDice >= command.dices ? '***skill increase!***' : '';
    const showBotchFail=():string => isBotch?`**botch**`:'';

    return new SocialRollResult(`Roll ${command.dices}D6 [effectiveness ${command.effectiveness}] [${decorateSocialRoll(roll,command.dices, command.effectiveness)}]=${successDice} ${showBotchFail()}${showSkillIncrease()}`,
                                roll,command.effectiveness, isBotch, successDice, command.dices);
  }
}

