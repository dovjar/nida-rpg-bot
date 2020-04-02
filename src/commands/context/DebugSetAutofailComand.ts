import { ICommand } from '../../interfaces';
export class DebugSetAutofailComand implements ICommand {
  constructor(autofail: number) {
    this.autofail = autofail;
  }
  autofail: number;
}
