import { ICommand, ICommandResult } from '../../interfaces';
import { DamageEffectEnum } from '../../Rules';
export class DamageRollCommand implements ICommand {
  result: ICommandResult;
  dices:number;
  effects:DamageEffectEnum[];
  constructor(dices:number,effects:DamageEffectEnum[]) {
      this.dices=dices;
      this.effects=effects;
  }
}
