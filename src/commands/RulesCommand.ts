import { ICommand, ICommandResult } from '../interfaces';
export class RulesCommand implements ICommand {
  result: ICommandResult;
  chapter: string;
  bold: number;
  constructor(chapter: string, bold:number = 0) {
    this.chapter = chapter;
    this.bold = bold;
  }
}

