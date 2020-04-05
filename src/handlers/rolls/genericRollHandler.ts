import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { GenericRollCommand } from '../../commands/roll/GenericRollCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof GenericRollCommand ))
      return null;

    const roll = context.rollMany(command.dices, command.sides);
    return new CommandResult(`Roll ${command.dices}D${command.sides} [${roll}]`);
  }
}

