import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { CombatRollCommand } from "../../commands/roll/CombatRollCommand";
import { decorateCombatRoll } from '../../decorators';
import { Context } from '../../context';
import { CombatRollResult } from '../../commandResults/CombatRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CombatRollCommand ))
      return null;

    const roll = context.rollMany(3);
    const initialSum= roll.reduce((a, b) => a + b, 0);
    const isSuccess=initialSum>=17;
    const isFailure=initialSum<=4;
    const isAutoFail =!isFailure && !isSuccess && initialSum<=context.globalContext.autoFail;
    const showMod=():string=>  command.mod!==0? `${command.mod>0?'+':''}${command.mod}=${initialSum+command.mod}`:'';
    const showSuccess=():string => isSuccess?`**critical success**`:'';
    const showFailure=():string => isFailure?`**critical failure**`:'';
    const showAutoFail=():string => isAutoFail?`**autofail**`:'';
    return new CombatRollResult(`Roll 3D6 [${decorateCombatRoll(roll)}]=${initialSum} ${showMod()} ${showSuccess()}${showFailure()}${showAutoFail()}`, roll, command.mod);
  }
}

