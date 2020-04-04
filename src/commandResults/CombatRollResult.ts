import { CommandResult } from "./CommandResult";
import { CombatModeEnum } from "../models/char";
export class CombatRollResult extends CommandResult {
    constructor(message: string, roll: number[], mod: number, mode: CombatModeEnum) {
        super(message);
        this.roll = roll;
        this.mod = mod;
        this.mode = mode;
    }
    roll: number[];
    mod: number;
    mode: CombatModeEnum;
    initialRol=()=>this.roll.reduce((a, b) => a + b, 0);
    total = () => this.initialRol() + this.mod;
}
