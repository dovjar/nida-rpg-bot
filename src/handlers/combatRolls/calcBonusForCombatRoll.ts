import { ICommandHandler, ICommand, CommandResult, SimpleRedirectResult } from '../../interfaces';
import { CalcBonusForCombatRollCommand } from '../../commands/combatRolls/roll';
import { decorateCombatRoll } from '../../decorators';
import { Context } from '../../context';
import { playersManager } from '../../playersManager';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CalcBonusForCombatRollCommand ))
      return null;

    const char = await playersManager.getPlayer(context.userId).getChar();
    const skill =char.combatSkills.find(t=>t.name === command.name);
    if (skill){
      command.combatRollCommand.mod += skill.lvl + char.attr[skill.attack];
      return new SimpleRedirectResult(`found combat skill ${skill.name}=${skill.lvl} using attack ${skill.attack}=${char.attr[skill.attack]} **total mod**=${command.combatRollCommand.mod} rolling dices:`,
      [command.combatRollCommand]);
    }
    return new SimpleRedirectResult(`404 not found **${command.name}**, rolling dices`, [command.combatRollCommand]);
  }
}
