import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { LuckCommandCheckRerollResult as LuckCheckRerollResultCommand } from '../../commands/luck/LuckCommandCheckRerollResult';

const sentences = [`You are lucky man`,`leprechaun envy you`, `good karma`, `streak of luck`, `lady Luck smiles`, `wheel of fortune`];

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof LuckCheckRerollResultCommand ){
        // find last combat roll
        if ((command.newCommand.result.initialRol() <= command.prevResult.initialRol()))
          return new CommandResult(`Luck well spent`);
        return new CommandResult(`${sentences[Math.floor(Math.random() * sentences.length)]}`);
    }
    return null;
  }
}