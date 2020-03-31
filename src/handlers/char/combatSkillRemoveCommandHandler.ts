import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { playersManager } from '../../playersManager';
import { CharRemoveCombatSkillCommand } from '../../commands/char/combatSkill';
import * as printHandler from './printCommandHandler';
import { CharPrintCommand } from '../../commands/char/print';
export const commandHandler:ICommandHandler = {
  async handle(command:ICommand = {message:null }):Promise<CommandResult>{
    if (!(command instanceof CharRemoveCombatSkillCommand ))
      return null;

    const player = playersManager.getPlayer(command.playerId);
    await player.removeCombatSkill(command.skillName);
    return printHandler.commandHandler.handle(new CharPrintCommand(command.playerId, command.userName, 'c'));
  }
}