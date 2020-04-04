import { ICommand, ICommandResult } from '../../interfaces';
export class LuckCommand implements ICommand {
    result: ICommandResult;
    dices:number;
    constructor(dice: number) {
        this.dices = dice
    }
}

