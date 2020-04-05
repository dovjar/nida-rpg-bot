import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { CriticalRollCommand, CriticalType } from '../../commands/roll/CriticalRollCommand';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CriticalRollCommand ))
      return null;

    const roll = context.rollOne();

    return new CommandResult(`**${command.type}** Roll 1D6 [${roll}] - ${result(roll,command.sum,command.type, context)}`);
  }
}

const result=(roll:number, sum:number, type:CriticalType,ctx:Context)=>{
  switch(type){
    case CriticalType.MagicFortune:
      return ctx.globalContext.getMagicFortune(roll,sum);
    case CriticalType.MagicMisfortune:
      return ctx.globalContext.getMagicMisfortune(roll,sum);
    case CriticalType.MeleeFortune:
      return ctx.globalContext.getMeleeFortune(roll,sum);
    case CriticalType.MeleeMisFortune:
      return ctx.globalContext.getMeleeMisfortune(roll,sum);
    case CriticalType.RangedFortune:
      return ctx.globalContext.getRangedFortune(roll,sum);
    case CriticalType.RangedMisFortune:
      return ctx.globalContext.getRangedMisfortune(roll,sum);
  }
}