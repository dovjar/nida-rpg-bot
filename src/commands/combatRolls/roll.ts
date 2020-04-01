import { IMessageParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';
import { playersManager } from '../../playersManager';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(message:Message, cut:string):Promise<ICommand[]>{
    const args = cut.match(/c\s+([a=zA-Z_0-9]*)?\s*(([+-])?(\d+))?/i);
    if (args){
        let mod = parseInt(args[4],10) * ((args[3] || '+') ==='+'? 1:-1) || 0;
        if (args[1]){
          // bonus specified
          const char = await playersManager.getPlayer(message.member.user.id).getChar();
          const skill =char.combatSkills.find(t=>t.name === args[1]);
          if (skill){
            message.reply(`found combat skill ${skill.name}=${skill.lvl} using attack ${skill.attack}=${char.attr[skill.attack]}`);
            mod += skill.lvl + char.attr[skill.attack];
          }
        }
        return [new CombatRollCommand(message.member.user.id, mod)];
    }
    return null;
  }
}
export class CombatRollCommand implements ICommand{

  constructor(playerId:string,  mod:number) {
    this.mod = mod;
    this.playerId = playerId;
  }
  playerId:string;
  mod: number;userName: string;
}
