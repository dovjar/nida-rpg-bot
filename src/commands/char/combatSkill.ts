import { IMessageParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';
import { CharPrintCommand, PrintCommandsEnum } from './print';

export const commandParser:IMessageParser = {
  priority:10,
  createCommand(message:Message, cut:string):ICommand[]{
    const args = cut.match(/char\s+(combat|c)(\s+(add|a)*(remove|r)*\s*(\S+)\s*((\d+)?\s*(a=(\S+))*\s*(d=(\S+))*)*)*/i);
    if (args && (args[7] || args[3] || args[9] || args[11]) && (!args[4]))
      return [new CharAddCombatSkillCommand(message.member.user.id,message.member.displayName, args[5], parseInt(args[7], 10), args[9], args[11]),
              new CharPrintCommand(message.member.user.id,message.member.displayName, PrintCommandsEnum.combat)];
    else if (args && args[4] && !args[3])
      return [new CharRemoveCombatSkillCommand(message.member.user.id,message.member.displayName, args[5]),
              new CharPrintCommand(message.member.user.id,message.member.displayName, PrintCommandsEnum.combat)];
    return null;
  }
}
export class CharAddCombatSkillCommand implements ICommand{

  constructor(playerId:string, userName:string, name:string, lvl:number, attack:string, defense:string) {
    this.skillName = name;
    this.lvl = lvl;
    this.attack = attack;
    this.defense = defense;
    this.playerId = playerId;
    this.userName = userName;
  }
  playerId:string;
  skillName: string;
  lvl: number;
  userName: string;
  attack:string;
  defense:string;
}

// tslint:disable-next-line: max-classes-per-file
export class CharRemoveCombatSkillCommand implements ICommand{

  constructor(playerId:string, userName:string, name:string) {
    this.skillName = name;
    this.playerId = playerId;
    this.userName = userName;
  }
  playerId:string;
  skillName: string;
  userName: string;
}
