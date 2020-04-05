import { CommandResult } from "./CommandResult";
import { decorateSocialRoll } from "../decorators";
export class SocialReRollResult extends CommandResult {
    constructor(roll: number[],dices:number, effectiveness: number, successDices:number) {
        super('');
        this.roll = roll;
        this.effectiveness = effectiveness;
        this.dices = dices;
        this.successDices = successDices;
        this.message = `Roll ${this.dices}D6 [effectiveness ${this.effectiveness}] [${decorateSocialRoll(roll,this.dices, this.effectiveness)}]=${this.successDices}`
    }
    roll: number[];
    effectiveness: number;
    dices:number;
    successDices:number;
}
