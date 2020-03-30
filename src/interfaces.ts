import { Message } from "discord.js";

export interface IHandlerOptions{
  prefix:string,
  commandsPath:string,
  handlersPath:string
}
export interface ICommandHandler{
  handle(command:ICommand):ICommandResult;
}
export interface ICommandParser{
  
  /**
   * construct new command from message
   * @param message 
   */
  createCommand(message:Message, cut:string):ICommand;
  /**
   * commands priority, e.g. have two commands, 'help' and 'help ping', in that case commands 'help ping' priority must be higher
   */
  priority:number;
}
export interface ICommand{
  message:Message;
  type:string;
}

export interface ICommandResult{
}
