import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { CombatRollCommand } from '../../commands/combatRolls/roll';
import { decorateCombatRoll } from '../../decorators';
import { Context } from '../../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CombatRollCommand ))
      return null;

    const roll = context.rollMany(3);
    const initialSum= roll.reduce((a, b) => a + b, 0);
    const isSuccess=initialSum>=17;
    const isFailure=initialSum<=4;
    const isAutofail =!isFailure && !isSuccess && initialSum<=context.globalContext.autofail;
    const showMod=():string=>  command.mod!==0? `${command.mod>0?'+':''}${command.mod}=${initialSum+command.mod}`:'';
    const showSuccess=():string => isSuccess?`**critical success**`:'';
    const showFailure=():string => isFailure?`**critical failure**`:'';
    const showAutofail=():string => isAutofail?`**autofail**`:'';
    return new CommandResult(`[${decorateCombatRoll(roll)}]=${initialSum} ${showMod()} ${showSuccess()}${showFailure()}${showAutofail()}`);
  }
}

