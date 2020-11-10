import { Context } from "./context";
export interface IServerChannel{
  server:string;
  channel:string;
}

export interface IHandlerOptions{
  prefix:string,
  commandsPath:string,
  handlersPath:string,
  servers:IServerChannel[]
}
export interface ICommandHandler{
  handle(command:ICommand, context:Context):Promise<ICommandResult>;
}
export interface IMessageParser{

  createCommand(cut:string, context:Context):Promise<ICommand[]>;
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