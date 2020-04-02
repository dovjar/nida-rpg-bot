import { ICommand } from '../../interfaces';
export class CharAddCombatSkillCommand implements ICommand {
  constructor(name: string, lvl: number, attack: string, defense: string) {
    this.skillName = name;
    this.lvl = lvl;
    this.attack = attack;
    this.defense = defense;
  }
  skillName: string;
  lvl: number;
  attack: string;
  defense: string;
}
