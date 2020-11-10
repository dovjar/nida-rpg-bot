import { ICommand, ICommandResult } from '../../interfaces';
export class ChangeRulesCommand implements ICommand {
  constructor(public rules: string) {
  }
  result: ICommandResult;
}
