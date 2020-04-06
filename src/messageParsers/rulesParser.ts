import { IMessageParser, ICommand } from '../interfaces';
import { RulesCommand } from '../commands/RulesCommand';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^rules\s*(\S+)?/i)
    if (args)
      return [new RulesCommand( rulesSubstitutions[args[1]] || args[1] || '')];
    return null;
  }
}

export const rulesSubstitutions={
  'l':'locations.random',
  'lh':'locations.head',
  'la':'locations.arm',
  'll':'locations.leg',
  'lb':'locations.body',
  'mm3':'misfortunes.melee3',
  'mm4':'misfortunes.melee4',
  'mr3':'misfortunes.ranged3',
  'mr4':'misfortunes.ranged4',
  'fm17':'fortunes.melee17',
  'fm18':'fortunes.melee18',
  'fr17':'fortunes.ranged17',
  'fr18':'fortunes.ranged18',
}