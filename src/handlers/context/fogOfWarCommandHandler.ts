import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { FogOfWarCommand } from '../../commands/context/FogOfWarCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof FogOfWarCommand ))
      return null;
    context.globalContext.fogOfWarUserId = context.userId;
    return new CommandResult(`Fog of war for set. All rolls from user ${context.userId} will be hided. Npc will be shown only to this user.`);
  }
}
