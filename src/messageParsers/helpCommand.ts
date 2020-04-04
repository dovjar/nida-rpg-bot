import { IMessageParser, ICommand } from '../interfaces';
import { HelpCommand, HelpTypeEnum } from '../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('help'))
      return [new HelpCommand(HelpTypeEnum.Generic)];
    return null;
  }
}

