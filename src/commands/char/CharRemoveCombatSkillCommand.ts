import { ICommand, ICommandResult } from '../../interfaces';
// tslint:disable-next-line: max-classes-per-file
export class CharRemoveCombatSkillCommand implements ICommand {
  constructor(name: string) {
    this.skillName = name;
  }
  skillName: string;
  result: ICommandResult;
}
