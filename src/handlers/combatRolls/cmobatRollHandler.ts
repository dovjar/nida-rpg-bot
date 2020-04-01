import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { CombatRollCommand } from '../../commands/combatRolls/roll';
import { rollMany,decorateCombatRoll } from '../../diceRoll';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand ):Promise<CommandResult>{
    if (!(command instanceof CombatRollCommand ))
      return null;

    const roll = rollMany(3);
    const initialSum= roll.reduce((a, b) => a + b, 0);

    return new CommandResult(`[${decorateCombatRoll(roll)}]=${initialSum} ${command.mod!==0? `${command.mod>0?'+':''}${command.mod}=${initialSum+command.mod}`:''}`);
  }
}
