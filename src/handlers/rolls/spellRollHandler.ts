import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';
import { SpellRollResult, SpellRollOutcomeEnum } from '../../commandResults/SpellRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SpellRollCommand ))
      return null;

    const roll =context.rollMany(3);

    const expRoll  = [...roll, ...context.explode(roll)];
    const rollSum = roll.reduce((a, b) => a + b, 0);
    const sum = expRoll.reduce((a, b) => a + b, 0);

    const successValue = expRoll.filter((el) => el > 3).length;

    const calcResult=():SpellRollOutcomeEnum => {
      if( rollSum<=4)
        return SpellRollOutcomeEnum.CriticalFailure;
      if (rollSum >= 17)
        return SpellRollOutcomeEnum.CriticalSuccess;
      return sum > 7 ? SpellRollOutcomeEnum.Success : SpellRollOutcomeEnum.Failure;
    }

    const outcome = calcResult();

    return new SpellRollResult(expRoll,outcome, successValue);
  }
}

