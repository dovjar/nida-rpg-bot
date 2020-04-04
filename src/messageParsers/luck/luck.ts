import { IMessageParser, ICommand } from '../../interfaces';
import { LuckCommand } from '../../commands/luck/LuckCommand';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args=cut.match(/^luck\s*([123])?$/i);
    if (args)
      return [new LuckCommand(parseInt(args[1],10))];


    if (cut === 'luck help')
      return [new HelpCommand(HelpTypeEnum.Luck)];


    return null;
  }
}
