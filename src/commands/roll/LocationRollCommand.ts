import { ICommand, ICommandResult } from '../../interfaces';
import { LocationEnum } from '../../Rules';
export class LocationRollCommand implements ICommand {
  result: ICommandResult;
  location:LocationEnum;
  constructor(location:LocationEnum) {
      this.location = location;
  }
}


