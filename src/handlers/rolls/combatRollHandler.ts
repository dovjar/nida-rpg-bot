import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { CombatRollCommand } from "../../commands/roll/CombatRollCommand";
import { Context } from '../../context';
import { CombatRollResult, CombatRollOutcomeEnum } from '../../commandResults/CombatRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CombatRollCommand ))
      return null;

    const roll = context.rollMany(3);
    const initialSum= roll.reduce((a, b) => a + b, 0);
    const outcome = determineOutcome(initialSum,context.globalContext.autoFail);
    const criticalRoll=(outcome===CombatRollOutcomeEnum.CriticalFailure || outcome===CombatRollOutcomeEnum.CriticalSuccess)?context.rollOne():0;
    return new CombatRollResult(roll, command.mod, command.mode, outcome,criticalRoll );
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