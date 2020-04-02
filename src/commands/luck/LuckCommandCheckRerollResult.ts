import { ICommand, ICommandResult } from '../../interfaces';
import { CombatRollResult } from '../../commandResults/CombatRollResult';
import { CombatRollCommand } from '../roll/CombatRollCommand';
export class LuckCommandCheckRerollResult implements ICommand {
    prev: CombatRollResult;
    newCommand: CombatRollCommand;
    constructor(prev: CombatRollResult, newCommand: CombatRollCommand) {
        this.prev= prev;
        this.newCommand = newCommand;
    }
    result: ICommandResult;
}
