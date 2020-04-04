import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { SimpleRedirectResult } from "../../commandResults/SimpleRedirectResult";
import { CalcBonusForCombatRollCommand } from "../../commands/roll/CalcBonusForCombatRollCommand";
import { Context } from '../../context';
import { playersManager } from '../../playersManager';
import { CombatModeEnum } from '../../models/char';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CalcBonusForCombatRollCommand ))
      return null;

    const char = await playersManager.getPlayer(context.userId).getChar();
    const skill =char.combat.find(t=>t.name === command.name);
    if (skill){
      command.combatRollCommand.mod += skill.lvl + char.attr[skill.attr];
      command.combatRollCommand.mode = CombatModeEnum[skill.mode];
      return new SimpleRedirectResult(`found combat skill ${skill.name}=${skill.lvl} using attack ${skill.attr}=${char.attr[skill.attr]} **total mod**=${command.combatRollCommand.mod} rolling dices:`,
      [command.combatRollCommand]);
    }
    return new SimpleRedirectResult(`error 404 - not found **${command.name}**, rolling dices`, [command.combatRollCommand]);
  }
}
