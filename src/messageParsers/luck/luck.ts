import { IMessageParser, ICommand } from '../../interfaces';
import { LuckCommand } from '../../commands/luck/LuckCommand';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut === 'luck')
      return [new LuckCommand()];
    if (cut === 'luck help')
      return [new HelpCommand(HelpTypeEnum.Luck)];
    return null;
  }
}
