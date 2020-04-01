import { IMessageParser, ICommand } from '../../interfaces';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/char\s+print\s*(attr|combat|c)?\s*/i);
    if (args){
      let subCommand = args[1] || 'help';
      if(subCommand === 'c')
        subCommand = 'combat';
      return [new CharPrintCommand(PrintCommandsEnum[subCommand])];
    }


    return null;
  }
}
export class CharPrintCommand implements ICommand{

  constructor(subcommand:PrintCommandsEnum) {
    this.subcommand = subcommand;

  }
  subcommand: PrintCommandsEnum;

}

export enum PrintCommandsEnum {
  attr='attr',
  combat='combat',
  help ='help'
}