import { CommandResult } from "./CommandResult";
import { CombatModeEnum } from "../models/char";
import { Rules } from "../Rules";
import { decorateCombatRoll } from "../decorators";

export enum CombatRollOutcomeEnum{
    Autofail,
    CriticalSuccess,
    CriticalFailure,
    Success
}
export class CombatRollResult extends CommandResult {
    constructor(roll: number[], mod: number, mode: CombatModeEnum, outcome:CombatRollOutcomeEnum, criticalRoll:number) {
        super('');
        this.roll = roll;
        this.mod = mod;
        this.mode = mode;
        this.outcome = outcome;
        this.criticalRoll = criticalRoll;
        this.message = `Roll 3D6 [${decorateCombatRoll(roll)}]=${this.initialRol()} ${this.showMod()} ${this.showSuccess()}${this.showFailure()}${this.showAutoFail()}`;
    }
    outcome:CombatRollOutcomeEnum;
    roll: number[];
    mod: number;
    mode: CombatModeEnum;
    criticalRoll:number;
    initialRol=()=>this.roll.reduce((a, b) => a + b, 0);
    total = () => this.initialRol() + this.mod;
    showMod=():string=>  this.mod!==0? `${this.mod>0?'+':''}${this.mod}=${this.initialRol()+this.mod}`:'';

    showSuccess=():string => this.outcome === CombatRollOutcomeEnum.CriticalSuccess?`**critical ${this.mode} success** ${determineCritType(this.mode,this.initialRol(), this.criticalRoll)}`:'';
    showFailure=():string => this.outcome === CombatRollOutcomeEnum.CriticalFailure?`**critical ${this.mode} failure** ${determineCritType(this.mode,this.initialRol(), this.criticalRoll)}`:'';
    showAutoFail=():string => this.outcome === CombatRollOutcomeEnum.Autofail?`**autofail**`:'';
}

const determineCritType=(mode:CombatModeEnum,total:number, r:number)=>{
  if (total === 3){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack misfortune [${r}]=${Rules.meleeMisfortune3[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack misfortune [${r}]=${Rules.rangedMisfortune3[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action misfortune translates to attacker fortune';
  }
  if (total === 4){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack misfortune [${r}]=${Rules.meleeMisfortune4[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack misfortune [${r}]=${Rules.rangedMisfortune4[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action misfortune translates to attacker fortune';
  }
  if (total === 17){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack fortune [${r}]=${Rules.meleeFortune17[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack fortune [${r}]=${Rules.rangedFortune17[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action fortune translates to attacker misfortune';
  }
  if (total === 18){
    if (mode === CombatModeEnum.melee)
      return `Roll 1D6 from melee attack fortune [${r}]=${Rules.meleeFortune18[r]}`;
    if (mode === CombatModeEnum.range)
      return `Roll 1D6 from range attack fortune [${r}]=${Rules.rangedFortune18[r]}`;
    if (mode === CombatModeEnum.defense)
      return 'Defense action fortune translates to attacker misfortune';
  }

  return "";
}