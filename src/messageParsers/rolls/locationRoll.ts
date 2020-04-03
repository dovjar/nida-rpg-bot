import { IMessageParser, ICommand } from '../../interfaces';
import { LocationRollCommand } from '../../commands/roll/LocationRollCommand';
import { LocationEnum } from '../../Rules';

export const commandParser:IMessageParser = {
  priority:0,
  async createCommand(cut:string):Promise<ICommand[]>{
    const args = cut.match(/^((l(?=\s+)\s+([a-z ]+)?)|(l)?)$/i);
    if (args){
        const location =locMap[args[3]] || LocationEnum.random;
        const cmd=new LocationRollCommand(location);
        return [cmd]
    }
    return null;
  }
}
const locMap={
    'head':LocationEnum.head,
    'h':LocationEnum.head,
    'body':LocationEnum.body,
    'b':LocationEnum.body,
    'left arm':LocationEnum.arm,
    'larm':LocationEnum.arm,
    'l.arm':LocationEnum.arm,
    'right arm':LocationEnum.arm,
    'rarm':LocationEnum.arm,
    'r.arm':LocationEnum.arm,
    'arm':LocationEnum.arm,
    'left leg':LocationEnum.leg,
    'right leg':LocationEnum.leg,
    'leg':LocationEnum.leg
}
