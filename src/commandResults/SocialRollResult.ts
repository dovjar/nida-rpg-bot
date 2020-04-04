import { CommandResult } from "./CommandResult";
export class SocialRollResult extends CommandResult {
    constructor(message: string, roll: number[], effectiveness: number, isBotch: boolean,success:number, dices:number) {
        super(message);
        this.roll = roll;
        this.effectiveness = effectiveness;
        this.isBotch = isBotch;
        this.success = success;
        this.dices = dices;
    }
    roll: number[];
    effectiveness: number;
    isBotch: boolean;
    success:number;
    dices:number;
}
