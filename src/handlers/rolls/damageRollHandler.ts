import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import {  decorateDamageRoll } from '../../decorators';
import { Context } from '../../context';
import { DamageRollCommand } from '../../commands/roll/DamageRollCommand';
import { DamageEffectEnum } from '../../Rules';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof DamageRollCommand ))
      return null;

    const roll = context.rollMany(command.dices);
    const arr6 = [...Array(6-command.effects.length), ...command.effects];
    const effects = [];
    let shock = 0;
    let baseDamage = 0;
    for (let i = 0; i < command.dices; i++) {
      const effect = arr6[roll[i] - 1];
      const resolve = resolveShockAndBaseDmg(effect);
      if (resolve && resolve.damage && effect) {
        shock += resolve.shock || 0;
        baseDamage += resolve.base || 0;
      }
      if (effect) {
        effects.push(effect);
      }
    }
    return new CommandResult(`Roll [${decorateDamageRoll(roll, command.effects.length)}]=(${effects}), ${printDamageMsg(baseDamage, shock)}`);
  }
}
const printDamageMsg = (baseDamage, shock) => `Blow does **${baseDamage}** dmg and **${shock}** shock`;
const damageMap:IDamageType[] = [
  { damage: DamageEffectEnum.T, base: 1, shock: 3 },
  { damage: DamageEffectEnum.B, base: 2, shock: 0 },
  { damage: DamageEffectEnum.C, base: 3, shock: 1 },
];
interface IDamageType{
  damage:DamageEffectEnum,
  base:number,
  shock:number
}
const resolveShockAndBaseDmg = (effect:DamageEffectEnum):IDamageType => {
  const dmg = damageMap.find((el) => el.damage === effect);
  return dmg;
};