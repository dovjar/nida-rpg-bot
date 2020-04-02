import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { playersManager } from '../../playersManager';
import { CharRemoveCombatSkillCommand } from "../../commands/char/CharRemoveCombatSkillCommand";
import { Context } from '../../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context):Promise<CommandResult>{
    if (!(command instanceof CharRemoveCombatSkillCommand ))
      return null;

    const player = playersManager.getPlayer(context.userId);
    await player.removeCombatSkill(command.skillName);
    return new CommandResult(`skill ${command.skillName} removed`);
  }
}