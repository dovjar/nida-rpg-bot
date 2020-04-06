import { IMessageParser, ICommand } from '../../interfaces';
import { CharAttributeCommand } from '../../commands/char/CharAttributeCommand';
import { CharPrintCommand, PrintCommandsEnum } from '../../commands/char/CharPrintCommand';

export const commandParser:IMessageParser = {
  priority:100,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/p\s+attr\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*/i);
    if (args)
      return [
        new CharAttributeCommand('str', parseInt(args[1], 10)),
        new CharAttributeCommand('sta', parseInt(args[2], 10)),
        new CharAttributeCommand('ref', parseInt(args[3], 10)),
        new CharAttributeCommand('dex', parseInt(args[4], 10)),
        new CharAttributeCommand('per', parseInt(args[5], 10)),
        new CharAttributeCommand('will', parseInt(args[6], 10)),
        new CharPrintCommand(PrintCommandsEnum.attr)
    ];
    return null;
  }
}

