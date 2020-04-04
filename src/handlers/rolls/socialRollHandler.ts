import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { decorateSocialRoll } from '../../decorators';
import { Context } from '../../context';
import { SocialRollCommand } from '../../commands/roll/SocialRollCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SocialRollCommand ))
      return null;

    let roll = context.rollMany(command.dices);
    const botchNum = roll.filter((el) => el === 1).length;
    const successNum = roll.filter((el) => el >= command.effectiveness).length;
    const isBotch = botchNum >= successNum;

    if (!isBotch) {
      roll = [...roll, ...context.explode(roll)];
    }
    const successDice = roll.filter((el) => el >= command.effectiveness).length;
    const showSkillIncrease =()=>successDice >= command.dices ? '***skill increase!***' : '';
    const showBotchFail=():string => isBotch?`**botch**`:'';
    return new CommandResult(`Roll ${command.dices}D6 [${decorateSocialRoll(roll,command.dices, command.effectiveness)}]=${successDice}; ${showBotchFail()}${showSkillIncrease()}`);
  }
}

