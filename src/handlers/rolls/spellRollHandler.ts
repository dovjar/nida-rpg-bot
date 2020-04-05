import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';
import { SpellRollResult, SpellRollOutcomeEnum } from '../../commandResults/SpellRollResult';
import { CriticalRollCommand, CriticalType } from '../../commands/roll/CriticalRollCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SpellRollCommand ))
      return null;

    const roll = context.rollMany(3);
    const initialRollSum = roll.reduce((a, b) => a + b, 0);
    const sum = roll.reduce((a, b) => a + b, 0);

    const successValue = roll.filter((el) => el > 3).length;

    const calcResult=():SpellRollOutcomeEnum => {
      if( initialRollSum<=4)
        return SpellRollOutcomeEnum.CriticalFailure;
      if (initialRollSum >= 17)
        return SpellRollOutcomeEnum.CriticalSuccess;
      return sum > 7 ? SpellRollOutcomeEnum.Success : SpellRollOutcomeEnum.Failure;
    }
    const outcome = calcResult();

    return new SpellRollResult(roll,outcome, successValue);
  }
}

