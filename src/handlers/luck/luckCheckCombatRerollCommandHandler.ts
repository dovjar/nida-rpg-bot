import { ICommandHandler, ICommand, ICommandResult } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { LuckCommandCheckRerollResult as LuckCheckRerollResultCommand } from '../../commands/luck/LuckCommandCheckRerollResult';
import { CombatRollResult } from '../../commandResults/CombatRollResult';
import { SpellRollResult } from '../../commandResults/SpellRollResult';

const sentences = [`You are lucky man`,`leprechaun envy you`, `good karma`, `streak of luck`, `lady Luck smiles`, `wheel of fortune`];

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof LuckCheckRerollResultCommand ){
        if (getRollResult(command.newCommand.result) <=getRollResult( command.prevResult))
          return new CommandResult(`Luck well spent`);
        return new CommandResult(`${sentences[Math.floor(Math.random() * sentences.length)]}`);
    }
    return null;
  }
}

const getRollResult=(result:ICommandResult)=>{
  if (result instanceof CombatRollResult)
    return result.initialRol();
  if (result instanceof SpellRollResult)
    return result.initialRol();
}