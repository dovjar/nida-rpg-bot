import { ICommand, ICommandResult } from '../../interfaces';
export class NpcKillCommand implements ICommand {
    result: ICommandResult;
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
