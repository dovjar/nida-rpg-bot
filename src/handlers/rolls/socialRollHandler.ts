import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { SocialRollCommand } from '../../commands/roll/SocialRollCommand';
import { SocialRollResult, SocialRollOutcomeEnum } from '../../commandResults/SocialRollResult';
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
    const successDices = Rules.socialSuccessNum(roll, command.effectiveness);
    const outcome = isBotch? SocialRollOutcomeEnum.Botch:(successDices>=command.dices?SocialRollOutcomeEnum.SkillIncrease:SocialRollOutcomeEnum.Success);
    return new SocialRollResult(roll,command.effectiveness, outcome, successDices, command.dices);
  }
}

