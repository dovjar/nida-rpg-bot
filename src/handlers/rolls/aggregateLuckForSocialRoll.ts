import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { Context } from '../../context';
import { SocialRollAggregateCommand } from '../../commands/roll/SocialRollAggregateCommand';
import { SocialRollResult } from '../../commandResults/SocialRollResult';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof SocialRollAggregateCommand ))
      return null;
    const originalRoll=command.originalRoll.result.roll.map(t=>t.toString());
    const orgRollNumber = [...command.originalRoll.result.roll];
    for(const dice of command.rerollDices){
      const idx = originalRoll.findIndex(t=>t===dice.toString());
      originalRoll[idx]='?';
      orgRollNumber.splice(idx,1);
    }
    const aggregatedRoll =[...originalRoll, ...command.luckRoll.result.roll];
    const successDice = aggregatedRoll.filter((el) => el >= command.originalRoll.effectiveness).length;
    return new SocialRollResult(`After luck: [${aggregatedRoll}]=${successDice}`,[...orgRollNumber, ...command.luckRoll.result.roll],command.originalRoll.effectiveness,false );
  }
}
