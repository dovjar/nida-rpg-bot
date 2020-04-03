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
    initialRol=()=>this.roll.reduce((a, b) => a + b, 0);
}
export enum SpellResultEnum{
    failure='failure',
    success='success',
    criticalSuccess='**critical success!!!**',
    criticalFailure='**critical failure!!!**'
}