import { ICommand } from '../../interfaces';
import { SpellRollResult } from '../../commandResults/SpellRollResult';
export class SpellRollCommand implements ICommand {
  result: SpellRollResult;
}


