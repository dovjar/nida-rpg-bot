import { IMessageParser, ICommand } from '../../interfaces';
import { CharPrintCommand, PrintCommandsEnum } from '../../commands/char/CharPrintCommand';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('p help'))
      return [new HelpCommand(HelpTypeEnum.Player)];

    return null;
  }
}
