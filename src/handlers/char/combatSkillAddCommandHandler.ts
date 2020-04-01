import { ICommandHandler, ICommand, CommandResult } from '../../interfaces';
import { playersManager } from '../../playersManager';
import { CharAddCombatSkillCommand } from '../../commands/char/combatSkill';
import { Context } from '../../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand = {message:null }, context:Context):Promise<CommandResult>{
    if (!(command instanceof CharAddCombatSkillCommand ))
      return null;

    const player = playersManager.getPlayer(context.userId);
    const skill = await player.setCombatSkill(command.skillName, command.lvl, command.attack, command.defense);
    return new CommandResult(`skill ${skill.name} = ${skill.lvl} with defaults [a=${skill.attack}] [d=${skill.defense}]`);
  }
}