import { IMessageParser, ICommand } from '../../interfaces';
import { NpcGenerateCommand } from '../../commands/npc/NpcGenerateCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^npc\s+([a-zA-Z0-9_]+)(\[(\d+)\])?/i);
    if (args){
        const name=args[1];
        const quantity = parseInt(args[3],10)|| 0;
        const matches = (cut as any).matchAll(/(\s*((\S+)=(\d+)(\+\-(\d+))*)*)/gi);

        const skills = [...matches].filter(t=>t[0].trim()!=='')
            .map(t=>{return {
                        name:t[3], lvl:parseInt(t[4],10),random:parseInt(t[6],10) || 0
                    }
            });
        return [new NpcGenerateCommand(name,quantity, skills)];

    }


    return null;
  }
}