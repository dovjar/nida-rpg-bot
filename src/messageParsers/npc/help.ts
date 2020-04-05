import { IMessageParser, ICommand } from '../../interfaces';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('npc help'))
      return [new HelpCommand(HelpTypeEnum.Npc)];

    return null;
  }
}