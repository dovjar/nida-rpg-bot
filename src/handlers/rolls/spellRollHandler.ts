import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { decorateCombatRoll } from '../../decorators';
import { Context } from '../../context';
import { SpellRollCommand } from '../../commands/roll/SpellRollCommand';
import { Rules } from '../../Rules';
import { SpellRollResult, SpellResultEnum } from '../../commandResults/SpellRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SpellRollCommand ))
      return null;

    const roll = context.rollMany(3);
    const initialRollSum = roll.reduce((a, b) => a + b, 0);
    const sum = roll.reduce((a, b) => a + b, 0);

    const successValue = roll.filter((el) => el > 3).length;
    const criticalRoll=context.rollOne();
    const fortune=()=>initialRollSum>=17? Rules.getMagicFortune(criticalRoll, initialRollSum):``;
    const misfortune=()=>initialRollSum<=4? Rules.getMagicMisfortune(criticalRoll, initialRollSum):``;
    const calcResult=():SpellResultEnum => {
      if( initialRollSum<=4)
        return SpellResultEnum.criticalFailure;
      if (initialRollSum >= 17)
        return SpellResultEnum.criticalSuccess;
      return sum > 7 ? SpellResultEnum.success : SpellResultEnum.failure;
    }
    const result = calcResult();
    return new SpellRollResult(`Roll 3D6 [${decorateCombatRoll(roll)}] = ${successValue}; ${result} ${fortune()} ${misfortune()}`,
                              roll,result, criticalRoll);
  }
}

