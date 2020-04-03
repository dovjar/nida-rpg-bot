import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { decorateCombatRoll } from '../../decorators';
import { Context } from '../../context';
import { LocationRollCommand } from '../../commands/roll/LocationRollCommand';
import { LocationEnum, Rules } from '../../Rules';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof LocationRollCommand ))
      return null;

    const roll = context.rollOne();
    const location=Rules.getLocation(command.location, roll);
    return new CommandResult(`location **${LocationEnum[command.location]}** roll: [${decorateCombatRoll([roll])}]=${location}`);
  }
}
