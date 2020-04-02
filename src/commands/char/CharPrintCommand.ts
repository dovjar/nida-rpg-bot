import { ICommand } from '../../interfaces';
export class CharPrintCommand implements ICommand {
  constructor(subcommand: PrintCommandsEnum) {
    this.subcommand = subcommand;
  }
  subcommand: PrintCommandsEnum;
}
export enum PrintCommandsEnum {
    attr = 'attr',
    combat = 'combat',
    help = 'help'
  }