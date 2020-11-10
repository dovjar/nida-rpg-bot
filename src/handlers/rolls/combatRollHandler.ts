import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { CombatRollCommand } from "../../commands/roll/CombatRollCommand";
import { Context } from '../../context';
import { CombatRollResult, CombatRollOutcomeEnum } from '../../commandResults/CombatRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CombatRollCommand ))
      return null;

    const roll = context.rollMany(3,6);
    const initialSum= roll.reduce((a, b) => a + b, 0);
    const outcome = determineOutcome(initialSum,context.globalContext.autoFail);
    return new CombatRollResult(roll, command.mod, command.mode, outcome);
  }
}
const determineOutcome=(sum:number, autofail:number)=>{
  if (sum<=4)
    return CombatRollOutcomeEnum.CriticalFailure;
  if (sum<=autofail)
    return CombatRollOutcomeEnum.Autofail;
  if (sum>=17)
    return CombatRollOutcomeEnum.CriticalSuccess;
  return CombatRollOutcomeEnum.Success;
}