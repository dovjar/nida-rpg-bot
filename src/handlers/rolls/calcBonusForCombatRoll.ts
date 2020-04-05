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

    // find npc
    const idx=command.name.indexOf('.');
    const npcName =idx>0? command.name.substr(0,idx): command.name;
    // try to search npc

    const npcSkillName = command.name.substr(idx+1,command.name.length - idx);
    const npc = context.globalContext.npc.find(t=>t.name === npcName);
    if (npc){
      const npcSkill = npc.skills.find(t=>t.name === npcSkillName);
      if (npcSkill){
        command.combatRollCommand.mod += npcSkill.lvl;
        switch(npcSkillName){
          case "d":
          case "evade":
          case "shield":
          case "parry":
          case "block":
            command.combatRollCommand.mode = CombatModeEnum.defense;
            break;
          case "bow":
          case "r":
            command.combatRollCommand.mode = CombatModeEnum.range;
            break;
          default:
            command.combatRollCommand.mode = CombatModeEnum.melee;
            break;
        }
        return new SimpleRedirectResult(`found npc ${npcName} skill ${npcSkillName}=${npcSkill.lvl} assuming it is ${command.combatRollCommand.mode} action **total mod**=${command.combatRollCommand.mod} rolling dices:`,
                                        [command.combatRollCommand]);
      } else {
        command.combatRollCommand.mod += npc.skills[0].lvl;
        return new SimpleRedirectResult(`found npc ${npcName} skill ${npc.skills[0].name}=${npc.skills[0].lvl} **total mod**=${command.combatRollCommand.mod} rolling dices:`,
                                        [command.combatRollCommand]);
      }
    }

    const char = await playersManager.getPlayer(context.userId).getChar();
    const skill =char.combat.find(t=>t.name === command.name);
    if (skill){
      command.combatRollCommand.mod += skill.lvl + char.attr[skill.attr];
      command.combatRollCommand.mode = CombatModeEnum[skill.mode];
      return new SimpleRedirectResult(`found combat skill ${skill.name}=${skill.lvl} using attack ${skill.attr}=${char.attr[skill.attr]} **total mod**=${command.combatRollCommand.mod} rolling dices:`,
                                      [command.combatRollCommand]);
    }
    return new SimpleRedirectResult(`error 404 - not found **${command.name}**, rolling dices`,
                                    [command.combatRollCommand]);
  }
}
