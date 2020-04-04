import { CommandResult } from "./CommandResult";
export class SocialRollResult extends CommandResult {
    constructor(message: string, roll: number[], effectiveness: number, isBotch: boolean) {
        super(message);
        this.roll = roll;
        this.effectiveness = effectiveness;
        this.isBotch = isBotch;
    }
    roll: number[];
    effectiveness: number;
    isBotch: boolean;
}
