import { IMessageParser, ICommand } from '../../interfaces';
import { CharPrintCommand, PrintCommandsEnum } from '../../commands/char/CharPrintCommand';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/p\s+(attr|combat)\s*/i);
    if (args){
      const subCommand = args[1];
      return [new CharPrintCommand(PrintCommandsEnum[subCommand])];
    }


    return null;
  }
}
