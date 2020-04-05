import { CommandResult } from "./CommandResult";
import { decorateSocialRoll } from "../decorators";
export class SocialRollResult extends CommandResult {
    constructor(roll: number[], effectiveness: number, outcome: SocialRollOutcomeEnum,successDices:number, dices:number) {
        super('');
        this.roll = roll;
        this.effectiveness = effectiveness;
        this.outcome = outcome;
        this.successDices = successDices;
        this.dices = dices;

        this.message =`Roll ${this.dices}D6 [effectiveness ${this.effectiveness}] [${decorateSocialRoll(this.roll,this.dices, this.effectiveness)}]=${this.successDices} ${this.showBotchFail()}${this.showSkillIncrease()}`;
    }
    roll: number[];
    effectiveness: number;
    outcome: SocialRollOutcomeEnum;
    successDices:number;
    dices:number;
    showSkillIncrease =()=>this.outcome=== SocialRollOutcomeEnum.SkillIncrease ? '***skill increase!***' : '';
    showBotchFail=():string => this.outcome=== SocialRollOutcomeEnum.Botch?`**botch**`:'';
}
export enum SocialRollOutcomeEnum{
    Botch,
    Success,
    SkillIncrease
}