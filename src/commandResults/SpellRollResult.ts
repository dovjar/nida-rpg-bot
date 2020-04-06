import { CommandResult } from "./CommandResult";
import { decorateCombatRoll } from "../decorators";
import { IHaveTheCommand, ICommand } from "../interfaces";
import { RulesCommandFromRoll } from "../commands/RulesCommandFromRoll";
export class SpellRollResult extends CommandResult implements IHaveTheCommand {
    constructor(roll: number[], spellResult: SpellRollOutcomeEnum,successValue:number) {
        super('');
        this.roll = roll;
        this.spellResult = spellResult;
        this.successValue = successValue;
        this.message = `Roll 3D6 [${decorateCombatRoll(roll)}] = ${successValue}; ${spellResult}`
        if(spellResult === SpellRollOutcomeEnum.CriticalFailure || spellResult === SpellRollOutcomeEnum.CriticalSuccess)
            this.commands = [ (spellResult===SpellRollOutcomeEnum.CriticalFailure)?
                    new RulesCommandFromRoll(`misfortunes.magic${this.initialRol()}`):
                    new RulesCommandFromRoll(`fortunes.magic${this.initialRol()}`)]

    }
    commands: ICommand[];
    roll: number[];
    spellResult: SpellRollOutcomeEnum;
    successValue:number;
    initialRol=()=>this.roll.reduce((a, b) => a + b, 0);

}
export enum SpellRollOutcomeEnum{
    Failure='failure',
    Success='success',
    CriticalSuccess='**critical success!!!**',
    CriticalFailure='**critical failure!!!**'
}