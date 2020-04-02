import { Context } from "./context";

export interface IHandlerOptions{
  prefix:string,
  commandsPath:string,
  handlersPath:string
}
export interface ICommandHandler{
  handle(command:ICommand, context:Context):Promise<ICommandResult>;
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
  result: ICommandResult
}
export interface ICommandResult{
  message:string;
}
export interface IHaveTheCommand{
  commands:ICommand[];
}

export function isIHaveTheCommand(arg: any): arg is IHaveTheCommand {
  return (arg && arg.commands !== undefined);
}