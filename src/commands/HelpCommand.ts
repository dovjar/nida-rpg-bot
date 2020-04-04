import { ICommand, ICommandResult } from '../interfaces';
export class HelpCommand implements ICommand {
  result: ICommandResult;
  type:HelpTypeEnum;
  constructor(type:HelpTypeEnum) {
    this.type = type;
  }
}

export enum HelpTypeEnum {
  Generic,
  Combat,
  Player,
  Damage,
  Spell,
  Social,
  Luck,
  Location
}
