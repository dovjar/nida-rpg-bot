import { ICommand, ICommandResult } from '../../interfaces';
export class CharAttributeCommand implements ICommand {
  constructor(attr: string, lvl: number) {
    this.attr = attr;
    this.lvl = lvl;
  }
  lvl: number;
  attr: string;
  result: ICommandResult;
}
