import { ICommandResult } from "../interfaces";

export class CommandResult implements ICommandResult {
  constructor(message: string) {
    this.message = message;
  }
  message: string = null;
}

