import { ICommandHandler, ICommand, ICommandResult } from '../../interfaces';
import { playersManager } from '../../playersManager';
import { CharPrintCommand } from '../../commands/char/print';
import { CharProps } from '../../models/char';
import WordTable from 'word-table';

export const commandHandler:ICommandHandler = {
  handle(command:ICommand = {message:null }):ICommandResult{
    if (!(command instanceof CharPrintCommand ))
      return null;

    const player = playersManager.getPlayer(command.playerId);
    player.getChar().then((char)=>{
                    command.message.reply(`**ATTRIBUTES**\n\`\`\`asciidoc\n${getAttributesAsAscii(char)}\n\`\`\``);
                  }).catch(reason=>{
                    command.message.reply(`Error occured: ${reason}`);
                  });
    return null;
  }
}

const getAttributesAsAscii = (char: CharProps):string => {
  const wt = new WordTable(['str', 'sta', 'dex', 'ref', 'per', 'will'],
    [[char.attr.str, char.attr.sta, char.attr.dex,
      char.attr.ref, char.attr.per, char.attr.will]]);

  return wt.string();
}