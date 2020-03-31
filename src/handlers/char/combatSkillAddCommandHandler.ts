import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { playersManager } from '../../playersManager';
import { CharAddCombatSkillCommand } from '../../commands/char/combatSkill';
import * as printHandler from './printCommandHandler';
import { CharPrintCommand } from '../../commands/char/print';
export const commandHandler:ICommandHandler = {
  async handle(command:ICommand = {message:null }):Promise<CommandResult>{
    if (!(command instanceof CharAddCombatSkillCommand ))
      return null;

    const player = playersManager.getPlayer(command.playerId);
    await player.setCombatSkill(command.skillName, command.lvl, command.attack, command.defense);
    return printHandler.commandHandler.handle(new CharPrintCommand(command.playerId, command.userName, 'c'));
    // return new CommandResult(`skill ${skill.name} = ${skill.lvl} with defaults [a=${skill.attack}] [d=${skill.defense}]`);
  }
}