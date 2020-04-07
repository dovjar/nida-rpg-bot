import { IMessageParser, ICommand } from '../../interfaces';
import { HelpCommand, HelpTypeEnum } from '../../commands/HelpCommand';
import { GenericRollCommand } from '../../commands/roll/GenericRollCommand';
import { RulesCommandFromRoll } from '../../commands/RulesCommandFromRoll';

export const commandParser:IMessageParser = {
  priority:-500,
  async createCommand(cut:string):Promise<ICommand[]>{
    if (cut.startsWith('r help'))
      return [new HelpCommand(HelpTypeEnum.GenericRoll)];

    const args = cut.match(/^((\d*)?[dD])?(\d*)?\s*(\S+)?$/i);
    if (args){
      const d=parseInt(args[2],10) || 1;
      const s=parseInt(args[3],10) || 6;
      if (args[4]){
        return [new RulesCommandFromRoll(args[4],d,s)]
      }

      return [new GenericRollCommand(d,s)]
    }
    return null;
  }
}

