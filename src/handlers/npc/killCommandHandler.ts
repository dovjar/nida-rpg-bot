import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { NpcKillCommand } from '../../commands/npc/NpcKillCommand';
import { SimpleRedirectResult } from '../../commandResults/SimpleRedirectResult';
import { NpcPrintCommand } from '../../commands/npc/NpcPrintCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof NpcKillCommand ))
      return null;

    if (command.name ==='all'){
      context.globalContext.npc = [];
      return new CommandResult(`All npc killed`);
    }

    const npcIndex = context.globalContext.npc.findIndex(t=>t.name === command.name);
    if(npcIndex===-1)
      return new CommandResult(`404 - not found`);

    context.globalContext.npc.splice(npcIndex,1);
    return new SimpleRedirectResult(`npc ${command.name} killed`,[new NpcPrintCommand()]);
  }
}
