import { ICommand, ICommandResult } from '../../interfaces';
export class LuckCommandCheckRerollResult implements ICommand {
    prevResult: ICommandResult;
    newCommand: ICommand;
    constructor(prev: ICommandResult, newCommand: ICommand) {
        this.prevResult= prev;
        this.newCommand = newCommand;
    }
    result: ICommandResult;
}
