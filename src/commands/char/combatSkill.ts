import { IMessageParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';
import { CharPrintCommand, PrintCommandsEnum } from './print';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/char\s+(combat|c)(\s+(add|a)*(remove|r)*\s*(\S+)\s*((\d+)?\s*(a=(\S+))*\s*(d=(\S+))*)*)*/i);
    if (args && (args[7] || args[3] || args[9] || args[11]) && (!args[4]))
      return [new CharAddCombatSkillCommand(args[5], parseInt(args[7], 10), args[9], args[11]),
              new CharPrintCommand(PrintCommandsEnum.combat)];
    else if (args && args[4] && !args[3])
      return [new CharRemoveCombatSkillCommand(args[5]),
              new CharPrintCommand(PrintCommandsEnum.combat)];
    return null;
  }
}
export class CharAddCombatSkillCommand implements ICommand{

  constructor( name:string, lvl:number, attack:string, defense:string) {
    this.skillName = name;
    this.lvl = lvl;
    this.attack = attack;
    this.defense = defense;
  }

  skillName: string;
  lvl: number;

  attack:string;
  defense:string;
}

// tslint:disable-next-line: max-classes-per-file
export class CharRemoveCombatSkillCommand implements ICommand{

  constructor(name:string) {
    this.skillName = name;
  }

  skillName: string;
}
