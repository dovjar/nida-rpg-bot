import { ICommand, ICommandResult } from '../../interfaces';
import { INpcSkillCommand } from '../../INpc';
export class NpcGenerateCommand implements ICommand {
    result: ICommandResult;
    name: string;
    quantity:number;
    skills:INpcSkillCommand[];
    constructor(name: string, quantity:number, skills:INpcSkillCommand[]) {
        this.name = name;
        this.quantity = quantity;
        this.skills = skills;
    }
}


