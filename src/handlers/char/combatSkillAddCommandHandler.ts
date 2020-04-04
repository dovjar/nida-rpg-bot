import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { playersManager } from '../../playersManager';
import { CharAddCombatSkillCommand } from "../../commands/char/CharAddCombatSkillCommand";
import { Context } from '../../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context):Promise<CommandResult>{
    if (!(command instanceof CharAddCombatSkillCommand ))
      return null;

    const player = playersManager.getPlayer(context.userId);
    const skill = await player.setCombatSkill(command.skillName, command.lvl, command.attack, command.mode);
    return new CommandResult(`skill ${skill.name} = ${skill.lvl} with defaults [${skill.attr}]`);
  }
}