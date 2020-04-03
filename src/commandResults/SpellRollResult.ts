import { CommandResult } from "./CommandResult";
export class SpellRollResult extends CommandResult {
    constructor(message: string, roll: number[], spellResult: SpellResultEnum, criticalRoll:number) {
        super(message);
        this.roll = roll;
        this.spellResult = spellResult;
        this.criticalRoll = criticalRoll;
    }
    roll: number[];
    spellResult: SpellResultEnum;
    criticalRoll:number;
}
export enum SpellResultEnum{
    failure='failure',
    success='success',
    criticalSuccess='**critical success!!!**',
    criticalFailure='**critical failure!!!**'
}