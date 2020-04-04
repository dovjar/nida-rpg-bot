import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { decorateSocialRoll } from '../../decorators';
import { Context } from '../../context';
import { SocialReRollCommand } from '../../commands/roll/SocialReRollCommand';
import { SocialReRollResult } from '../../commandResults/SocialReRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SocialReRollCommand ))
      return null;

    let roll = context.rollMany(command.dices);

    if (command.explode) {
      roll = [...roll, ...context.explode(roll)];
    }
    const successDice = roll.filter((el) => el >= command.effectiveness).length;
    return new SocialReRollResult(`Roll ${command.dices}D6 [effectiveness ${command.effectiveness}] [${decorateSocialRoll(roll,command.dices, command.effectiveness)}]=${successDice}`,
                                roll,command.effectiveness);
  }
}

