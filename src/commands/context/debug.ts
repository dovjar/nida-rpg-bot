import { IMessageParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';
import { isNull } from 'util';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/debug\s+([0-9]+)/i);
    if (args){
        return [new DebugCheatDicesComand(Array.from(args[1]).map((d) => parseInt(d, 10)))];
    }
    return null;
  }
}
export class DebugCheatDicesComand implements ICommand{

    constructor(dices:number[]) {
        this.dices = dices;
    }
    dices:number[];
}
