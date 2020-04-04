import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { decorateSocialRoll } from '../../decorators';
import { Context } from '../../context';
import { SocialRollCommand } from '../../commands/roll/SocialRollCommand';
import { SocialRollResult } from '../../commandResults/SocialRollResult';

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
    return new SocialRollResult(`Roll ${command.dices}D6 [${decorateSocialRoll(roll,command.dices, command.effectiveness)}]=${successDice}`,
                                roll,command.effectiveness, isBotch);
  }
}

