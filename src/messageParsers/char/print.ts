import { IMessageParser, ICommand } from '../../interfaces';
import { CharPrintCommand, PrintCommandsEnum } from '../../commands/char/CharPrintCommand';

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
