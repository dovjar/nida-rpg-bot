import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import WordTable from 'word-table';
import { Context } from '../../context';
import { NpcPrintCommand } from '../../commands/npc/NpcPrintCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof NpcPrintCommand ))
      return null;

    const maxSkills = context.globalContext.npc.map((npc)=>{ return npc.skills.length }).reduce((a,b)=>{return Math.max(a,b)}) || 0;
    const header=['npc',...new Array(maxSkills).map(()=>{return 'skill'})];
    const rows = context.globalContext.npc.map((npc)=>{ return [npc.name, ...npc.skills.map(t=>`${t.name}=${t.lvl}`)]});
    const wt = new WordTable(header, rows);
    return new CommandResult(`**NPC**\n\`\`\`asciidoc\n${wt.string()}\n\`\`\``);

  }
}
