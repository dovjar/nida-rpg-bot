import { CommandResult } from "./CommandResult";
import { CombatModeEnum } from "../models/char";
import { decorateCombatRoll } from "../decorators";
import { IHaveTheCommand } from "../interfaces";
import { RulesCommandFromRoll } from "../commands/RulesCommandFromRoll";

export enum CombatRollOutcomeEnum{
    Autofail,
    CriticalSuccess,
    CriticalFailure,
    Success
}
export class CombatRollResult extends CommandResult implements IHaveTheCommand {
  constructor(roll: number[], mod: number, mode: CombatModeEnum, outcome:CombatRollOutcomeEnum) {
      super('');
      this.roll = roll;
      this.mod = mod;
      this.mode = mode;
      this.outcome = outcome;
      this.message = `Roll 3D6 [${decorateCombatRoll(roll)}]=${this.initialRol()} ${this.showMod()} ${this.showSuccess()}${this.showFailure()}${this.showAutoFail()}`;

      if(this.outcome === CombatRollOutcomeEnum.CriticalSuccess){
        if (this.mode === CombatModeEnum.melee)
          this.commands=[new RulesCommandFromRoll(`fortunes.melee${this.initialRol()}`)]
        if (this.mode === CombatModeEnum.ranged)
          this.commands=[new RulesCommandFromRoll(`fortunes.ranged${this.initialRol()}`)]
      }
      if(this.outcome === CombatRollOutcomeEnum.CriticalFailure){
        if (this.mode === CombatModeEnum.melee)
          this.commands=[new RulesCommandFromRoll(`misfortunes.melee${this.initialRol()}`)]
        if (this.mode === CombatModeEnum.ranged)
          this.commands=[new RulesCommandFromRoll(`misfortunes.ranged${this.initialRol()}`)]
      }
  }
  commands: import("../interfaces").ICommand[];
  outcome:CombatRollOutcomeEnum;
  roll: number[];
  mod: number;
  mode: CombatModeEnum;
  initialRol=()=>this.roll.reduce((a, b) => a + b, 0);
  total = () => this.initialRol() + this.mod;
  showMod=():string=>  this.mod!==0? `${this.mod>0?'+':''}${this.mod}=${this.initialRol()+this.mod}`:'';

  showSuccess=():string => this.outcome === CombatRollOutcomeEnum.CriticalSuccess?`**critical ${this.mode} success** ${determineCritType(this.mode, this.outcome)}`:'';
  showFailure=():string => this.outcome === CombatRollOutcomeEnum.CriticalFailure?`**critical ${this.mode} failure** ${determineCritType(this.mode, this.outcome)}`:'';
  showAutoFail=():string => this.outcome === CombatRollOutcomeEnum.Autofail?`**autofail**`:'';
}

const determineCritType=(mode:CombatModeEnum, outcome:CombatRollOutcomeEnum)=>{
    if (mode === CombatModeEnum.defense && outcome === CombatRollOutcomeEnum.CriticalFailure)
      return 'Defense action misfortune translates to attacker fortune. Roll critical manually.';
    if (mode === CombatModeEnum.defense && outcome === CombatRollOutcomeEnum.CriticalSuccess)
      return 'Defense action fortune translates to attacker misfortune. Roll critical manually.';
    if (mode === CombatModeEnum.unknown)
    return 'Unknown action. Roll critical manually.';
  return "";
}