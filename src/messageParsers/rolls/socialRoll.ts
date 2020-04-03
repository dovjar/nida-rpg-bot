import { IMessageParser, ICommand } from '../../interfaces';
import { SocialRollCommand } from '../../commands/roll/SocialRollCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^s\s*(\d+)\s*(\d)?/i);
    if (args){
        const dices = parseInt(args[1],10);
        const effectiveness = parseInt(args[2],10) || 4;
        const cmd=new SocialRollCommand(dices, effectiveness);
        return [cmd]
    }
    return null;
  }
}

