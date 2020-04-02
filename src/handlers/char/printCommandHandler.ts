import { ICommandHandler, ICommand } from '../../interfaces';
import { CommandResult } from "../../commandResults/CommandResult";
import { playersManager } from '../../playersManager';
import { CharPrintCommand, PrintCommandsEnum } from "../../commands/char/CharPrintCommand";
import { CharProps } from '../../models/char';
import WordTable from 'word-table';
import { Context } from '../../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand, context:Context ):Promise<CommandResult>{
    if (!(command instanceof CharPrintCommand ))
      return null;

    const char = await playersManager.getPlayer(context.userId).getChar();
    switch(command.subCommand){
      case PrintCommandsEnum.attr:
        return new CommandResult(`**ATTRIBUTES**\n\`\`\`asciidoc\n${getAttributesAsAscii(char)}\n\`\`\``);
      case PrintCommandsEnum.combat:
        return new CommandResult(`**COMBAT SKILLS**\n\`\`\`asciidoc\n${getCombatSkillsAsAscii(char)}\n\`\`\``);
      default:
        return new CommandResult(`sorry not understand you, available print commands are:attr|c[ombat]`);
    }

  }
}

const getAttributesAsAscii = (char: CharProps):string => {
  const wt = new WordTable(['str', 'sta', 'dex', 'ref', 'per', 'will'],
    [[char.attr.str, char.attr.sta, char.attr.dex,
      char.attr.ref, char.attr.per, char.attr.will]]);

  return wt.string();
}

const getCombatSkillsAsAscii = (char: CharProps) : string=> {
  const rows = char.combatSkills.map((skill) => [skill.name, skill.lvl, `a=[${skill.attack}] d=[${skill.defense}]`, skill.masteries]);
  const wt = new WordTable(['skill', 'lvl', 'defaults', 'masteries'],
    rows);

  return wt.string();
}