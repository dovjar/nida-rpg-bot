import { IMessageParser, ICommand } from '../../interfaces';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/context\s+autofail\s*([0-9]+)/i);
    if (args){
        return [new DebugSetAutofailComand(parseInt(args[1], 10))];
    }
    return null;
  }
}
export class DebugSetAutofailComand implements ICommand{

    constructor(autofail:number) {
        this.autofail = autofail;
    }
    autofail:number;
}
