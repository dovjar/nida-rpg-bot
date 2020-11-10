import { CommandResult } from "./CommandResult";
import { decorateSocialRollAfterLuck } from "../decorators";
import { SocialRollOutcomeEnum } from "./SocialRollResult";
import { runInThisContext } from "vm";
export class SocialAggregateRollResult extends CommandResult {
    constructor(roll: number[],rollWithLuck: string[], effectiveness: number, outcome: SocialRollOutcomeEnum, successDices: number, dices: number, sides:number) {
        super('');
        this.roll = roll;
        this.effectiveness = effectiveness;
        this.outcome = outcome;
        this.successDices = successDices;
        this.dices = dices;
        this.sides = sides;
        this.rollWithLuck = rollWithLuck;
        this.message = `After luck:${this.dices}D${sides} [effectiveness ${this.effectiveness}] [${decorateSocialRollAfterLuck(this.rollWithLuck,this.dices, this.effectiveness)}]=${this.successDices} ${this.showBotchFail()}${this.showSkillIncrease()}`;
    }
    roll: number[];
    rollWithLuck: string[];
    effectiveness: number;
    outcome: SocialRollOutcomeEnum;
    successDices: number;
    dices: number;
    sides:number;
    showSkillIncrease = () => this.outcome === SocialRollOutcomeEnum.SkillIncrease ? '***skill increase!***' : '';
    showBotchFail = (): string => this.outcome === SocialRollOutcomeEnum.Botch ? `**botch**` : '';
}
