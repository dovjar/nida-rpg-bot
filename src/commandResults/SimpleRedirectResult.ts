import { IHaveTheCommand, ICommand } from "../interfaces";
import { CommandResult } from "./CommandResult";

export class SimpleRedirectResult extends CommandResult implements IHaveTheCommand {
  commands: ICommand[];
  constructor(message: string, command: ICommand[]) {
    super(message);
    this.commands = command;
  }
}
