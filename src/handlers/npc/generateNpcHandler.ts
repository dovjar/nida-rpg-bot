import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { NpcGenerateCommand } from '../../commands/npc/NpcGenerateCommand';
import { INpcSkill } from '../../INpc';
import { SimpleRedirectResult } from '../../commandResults/SimpleRedirectResult';
import { NpcPrintCommand } from '../../commands/npc/NpcPrintCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context):Promise<CommandResult>{
    if (!(command instanceof NpcGenerateCommand ))
      return null;

    const addOrUpdate=(name:string,skills:INpcSkill[])=>{
        let npc = context.globalContext.npc.find(t=>t.name === name);
        if(!npc){
            npc = {name, skills};
            context.globalContext.npc.push(npc);
        }else{
            for(const skill of skills){
                const npcSkill = npc.skills.find(t=>t.name === skill.name);
                if(!npcSkill)
                    npc.skills.push(skill)
                else
                    npcSkill.lvl = skill.lvl;
            }
        }
    }
    const modValue=(value, r) => {
        return value + Math.round(Math.random() * r * 2) - r;
      }
    if (command.quantity <= 1){
        addOrUpdate(command.name, command.skills.map(t=>{return {name: t.name, lvl: modValue(t.lvl,t.random)}}));
        return new SimpleRedirectResult(`Added new npc ${command.name}`,[new NpcPrintCommand()]);
    } else{
        for(let idx=1; idx<=command.quantity;idx++){
            addOrUpdate(`${command.name}${idx}`, command.skills.map(t=>{return {name: t.name, lvl: modValue(t.lvl,t.random)}}));
        }
        return new SimpleRedirectResult(`Added ${command.quantity} new npc ${command.name}`,[new NpcPrintCommand()]);
    }
  }
}