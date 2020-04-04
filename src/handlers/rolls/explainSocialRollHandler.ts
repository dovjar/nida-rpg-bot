import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { ExplainSocialRollCommand } from '../../commands/roll/ExplainSocialRollCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof ExplainSocialRollCommand ))
      return null;

    const roll = command.socialRollCommand.result.roll;
    const botchNum = roll.filter((el) => el === 1).length;
    const successNum = roll.filter((el) => el >= command.socialRollCommand.effectiveness).length;
    const isBotch = botchNum >= successNum;

    const successDice = roll.filter((el) => el >= command.socialRollCommand.effectiveness).length;
    const showSkillIncrease =()=>successDice >= command.socialRollCommand.dices ? '***skill increase!***' : '';
    const showBotchFail=():string => isBotch?`**botch**`:'';
    return new CommandResult(`${showBotchFail()}${showSkillIncrease()}`);
  }
}

