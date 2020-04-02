import { ICommand, ICommandResult } from '../../interfaces';
export class DebugSetAutoFailCommand implements ICommand {
  constructor(autoFail: number) {
    this.autoFail = autoFail;
  }
  autoFail: number;
  result: ICommandResult;
}
