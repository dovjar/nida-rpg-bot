import { CommandResult } from "./CommandResult";
export class SocialReRollResult extends CommandResult {
    constructor(message: string, roll: number[], effectiveness: number) {
        super(message);
        this.roll = roll;
        this.effectiveness = effectiveness;
    }
    roll: number[];
    effectiveness: number;
}
