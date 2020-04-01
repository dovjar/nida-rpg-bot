import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { CharAttributeCommand } from '../../commands/char/attribute';
import { playersManager } from '../../playersManager';
import { Context } from '../../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand = {message:null }, context:Context):Promise<CommandResult>{
    if (!(command instanceof CharAttributeCommand ))
      return null;

    const player = playersManager.getPlayer(context.userId);
    await player.setAttr(command.attr, command.lvl);
    return new CommandResult(`char [${command.attr}] updated to ${command.lvl}`);
  }
}