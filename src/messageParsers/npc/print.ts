import { IMessageParser, ICommand } from '../../interfaces';
import { NpcPrintCommand } from '../../commands/npc/NpcPrintCommand';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('npc print'))
      return [new NpcPrintCommand()];

    return null;
  }
}