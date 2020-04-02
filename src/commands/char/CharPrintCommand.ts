import { ICommand, ICommandResult } from '../../interfaces';
export class CharPrintCommand implements ICommand {
  constructor(subCommand: PrintCommandsEnum) {
    this.subCommand = subCommand;
  }
  subCommand: PrintCommandsEnum;
  result: ICommandResult;
}
export enum PrintCommandsEnum {
    attr = 'attr',
    combat = 'combat',
    help = 'help'
  }