import { IMessageParser, ICommand } from '../../interfaces';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/char\s+(str|sta|dex|ref|per|will)\s*(\d+)/i);
    if (args)
      return [new CharAttributeCommand(args[1], parseInt(args[2], 10))];
    return null;
  }
}
export class CharAttributeCommand implements ICommand{

  constructor(attr:string, lvl:number) {
    this.attr = attr;
    this.lvl = lvl;
  }
  lvl: number;
  attr: string;
}
