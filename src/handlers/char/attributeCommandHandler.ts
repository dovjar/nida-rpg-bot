import { ICommandHandler, ICommand, ICommandResult } from '../../interfaces';
import { CharAttributeCommand } from '../../commands/char/attribute';
import { playersManager } from '../../playersManager';

export const commandHandler:ICommandHandler = {
  handle(command:ICommand = {message:null }):ICommandResult{
    if (!(command instanceof CharAttributeCommand ))
      return null;

    const player = playersManager.getPlayer(command.playerId);
    player.setAttr(command.attr, command.lvl).then(()=>{
      command.message.reply(`char [${command.attr}] updated to ${command.lvl}`).catch(reason=>{
        command.message.reply(`Error occured: ${reason}`);
      });
    });
  }
}