import { CommandResult } from "./CommandResult";
export class CombatRollResult extends CommandResult {
    constructor(message: string, roll: number[], mod: number) {
        super(message);
        this.roll = roll;
        this.mod = mod;
    }
    roll: number[];
    mod: number;
    initialRol=()=>this.roll.reduce((a, b) => a + b, 0);
    total = () => this.initialRol() + this.mod;
}
