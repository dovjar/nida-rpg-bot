import { IMessageParser, ICommand } from '../../interfaces';
import { NpcKillCommand } from '../../commands/npc/NpcKillCommand';

export const commandParser:IMessageParser = {
  priority:100,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^npc kill\s+([a-zA-Z0-9_]+)/i);
    if (args){
        const name=args[1];
        return [new NpcKillCommand(name)];
    }
    return null;
  }
}