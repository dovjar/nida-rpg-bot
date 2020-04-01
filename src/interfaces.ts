import { Message } from "discord.js";
import { Context } from "./context";

export interface IHandlerOptions{
  prefix:string,
  commandsPath:string,
  handlersPath:string
}
export interface ICommandHandler{
  handle(command:ICommand, context:Context):Promise<CommandResult>;
}
export interface IMessageParser{

  createCommand(cut:string):Promise<ICommand[]>;
  /**
   * commands priority, e.g. have two commands, 'help' and 'help ping', in that case commands 'help ping' priority must be higher
   */
  priority:number;
}
// tslint:disable-next-line: no-empty-interface
export interface ICommand{
}

export class CommandResult{
  constructor(message: string) {
    this.message = message;
  }
  message:string=null;
}

export interface IHaveTheCommand{
  commands:ICommand[];
}

// tslint:disable-next-line: max-classes-per-file
export class SimpleRedirectResult extends CommandResult implements IHaveTheCommand {
  commands: ICommand[];
  constructor(message: string, command: ICommand[]) {
    super(message);
    this.commands = command;
  }

}

export function isIHaveTheCommand(arg: any): arg is IHaveTheCommand {
  return (arg && arg.commands !== undefined);
}