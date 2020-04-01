import { Message } from "discord.js";

export interface IHandlerOptions{
  prefix:string,
  commandsPath:string,
  handlersPath:string
}
export interface ICommandHandler{
  handle(command:ICommand):Promise<CommandResult>;
}
export interface IMessageParser{

  /**
   * construct new command from message
   * @param message
   */
  createCommand(message:Message, cut:string):Promise<ICommand[]>;
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

