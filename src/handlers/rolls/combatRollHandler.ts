import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { CombatRollCommand } from "../../commands/roll/CombatRollCommand";
import { decorateCombatRoll } from '../../decorators';
import { Context } from '../../context';
import { CombatRollResult } from '../../commandResults/CombatRollResult';
import { CombatModeEnum } from '../../models/char';
import { Rules } from '../../Rules';

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

    const showSuccess=():string => isSuccess?`**critical ${command.mode} success** ${determineCritType(command.mode,initialSum, context)}`:'';
    const showFailure=():string => isFailure?`**critical ${command.mode} failure** ${determineCritType(command.mode,initialSum, context)}`:'';
    const showAutoFail=():string => isAutoFail?`**autofail**`:'';
    return new CombatRollResult(`Roll 3D6 [${decorateCombatRoll(roll)}]=${initialSum} ${showMod()} ${showSuccess()}${showFailure()}${showAutoFail()}`, roll, command.mod, command.mode);
  }
}

const determineCritType=(mode:CombatModeEnum,total:number, ctx:Context)=>{
  const r = ctx.rollOne();
  if (total === 3){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack misfortune [${r}]=${Rules.meleeMisfortune3[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack misfortune [${r}]=${Rules.rangedMisfortune3[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action misfortune translates to attacker fortune';
  }
  if (total === 4){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack misfortune [${r}]=${Rules.meleeMisfortune4[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack misfortune [${r}]=${Rules.rangedMisfortune4[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action misfortune translates to attacker fortune';
  }
  if (total === 17){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack fortune [${r}]=${Rules.meleeFortune17[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack fortune [${r}]=${Rules.rangedFortune17[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action fortune translates to attacker misfortune';
  }
  if (total === 18){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack fortune [${r}]=${Rules.meleeFortune18[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack fortune [${r}]=${Rules.rangedFortune18[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action fortune translates to attacker misfortune';
  }

  return "";
}