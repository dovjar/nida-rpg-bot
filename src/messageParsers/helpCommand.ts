import { IMessageParser, ICommand, ICommandResult } from '../interfaces';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut === 'help')
      return [new HelpCommand()];
    return null;
  }
}
export class HelpCommand implements ICommand{
  result: ICommandResult;
}
