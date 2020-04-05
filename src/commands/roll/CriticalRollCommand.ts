import { ICommand, ICommandResult } from '../../interfaces';
export class CriticalRollCommand implements ICommand {
  constructor(type: CriticalType, sum:number) {
    this.type = type;
    this.sum = sum;
  }
  type: CriticalType;
  result: ICommandResult;
  sum:number;
}
export enum CriticalType{
    MagicFortune ='magic fortune',
    MagicMisfortune='magic misfortune',
    MeleeFortune='melee fortune',
    MeleeMisFortune= 'melee misfortune',
    RangedFortune='ranged fortune',
    RangedMisFortune = 'ranged misfortune'
}