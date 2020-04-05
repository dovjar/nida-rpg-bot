import { ICommand, ICommandResult } from '../interfaces';
export class RulesCommandFromRoll implements ICommand {
  result: ICommandResult;
  chapter: string;
  dices: number;
  sides: number;
  constructor(chapter: string,dices: number,sides: number) {
    this.chapter = chapter;
    this.dices=dices;
    this.sides = sides;
  }
}
