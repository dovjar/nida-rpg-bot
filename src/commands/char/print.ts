import { IMessageParser, ICommand } from '../../interfaces';
import { Message } from 'discord.js';

export const commandParser:IMessageParser = {
  priority:10,
  async createCommand(message:Message, cut:string):Promise<ICommand[]>{
    const args = cut.match(/char\s+print\s*(attr|combat|c)?\s*/i);
    if (args){
      let subCommand = args[1] || 'help';
      if(subCommand === 'c')
        subCommand = 'combat';
      return [new CharPrintCommand(message.member.user.id,message.member.displayName,PrintCommandsEnum[subCommand])];
    }


    return null;
  }
}
export class CharPrintCommand implements ICommand{

  constructor(playerId:string, userName:string, subcommand:PrintCommandsEnum) {
    this.subcommand = subcommand;
    this.playerId = playerId;
    this.userName = userName;
  }
  playerId:string;
  subcommand: PrintCommandsEnum;
  userName: string;
}

export enum PrintCommandsEnum {
  attr='attr',
  combat='combat',
  help ='help'
}