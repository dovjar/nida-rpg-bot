import { CommandResult } from "./CommandResult";
import { decorateCombatRoll } from "../decorators";
import { Rules } from "../Rules";
export class SpellRollResult extends CommandResult {
    constructor(roll: number[], spellResult: SpellRollOutcomeEnum, criticalRoll:number, successValue:number) {
        super('');
        this.roll = roll;
        this.spellResult = spellResult;
        this.criticalRoll = criticalRoll;
        this.successValue = successValue;
        this.message = `Roll 3D6 [${decorateCombatRoll(roll)}] = ${successValue}; ${spellResult} ${this.fortune()}${this.misfortune()}`
    }
    roll: number[];
    spellResult: SpellRollOutcomeEnum;
    criticalRoll:number;
    successValue:number;
    initialRol=()=>this.roll.reduce((a, b) => a + b, 0);

    fortune=()=>this.spellResult=== SpellRollOutcomeEnum.CriticalSuccess? Rules.getMagicFortune(this.criticalRoll, this.initialRol()):``;
    misfortune=()=>this.spellResult=== SpellRollOutcomeEnum.CriticalFailure? Rules.getMagicMisfortune(this.criticalRoll, this.initialRol()):``;
}
export enum SpellRollOutcomeEnum{
    Failure='failure',
    Success='success',
    CriticalSuccess='**critical success!!!**',
    CriticalFailure='**critical failure!!!**'
}