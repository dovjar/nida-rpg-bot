import { ICommand } from '../../interfaces';
// tslint:disable-next-line: max-classes-per-file
export class CombatRollCommand implements ICommand {
  constructor(mod: number) {
    this.mod = mod;
  }
  mod: number;
  userName: string;
}
