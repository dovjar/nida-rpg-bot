import { ICommand, ICommandResult } from '../../interfaces';
import { DamageEffectEnum } from '../../Rules';
export class DamageRollCommand implements ICommand {
  result: ICommandResult;
  dices:number;
  effects:DamageEffectEnum[];
  additionalEffects:DamageEffectEnum[];
  constructor(dices:number,effects:DamageEffectEnum[],additionalEffects:DamageEffectEnum[]) {
      this.dices=dices;
      this.effects=effects;
      this.additionalEffects =additionalEffects;
  }
}
