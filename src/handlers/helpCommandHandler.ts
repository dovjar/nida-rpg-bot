import { ICommandHandler, ICommand } from '../interfaces';
import { CommandResult } from "../commandResults/CommandResult";
import { HelpCommand, HelpTypeEnum } from "../commands/HelpCommand";
import { Context } from '../context';

export const commandHandler:ICommandHandler = {
  async handle(command:ICommand , context:Context):Promise<CommandResult>{
    if (command instanceof HelpCommand )
      switch(command.type){
        case HelpTypeEnum.Combat:
          return new CommandResult(combatHelp);
        case HelpTypeEnum.Player:
          return new CommandResult(playerHelp);
        case HelpTypeEnum.Damage:
          return new CommandResult(damageHelp);
        case HelpTypeEnum.Spell:
          return new CommandResult(spellHelp);
        case HelpTypeEnum.Social:
          return new CommandResult(socialHelp);
        case HelpTypeEnum.Luck:
          return new CommandResult(luckHelp);
        case HelpTypeEnum.Location:
          return new CommandResult(locationHelp);
        case HelpTypeEnum.GenericRoll:
          return new CommandResult(genericRollHelp);
          case HelpTypeEnum.Npc:
            return new CommandResult(npcHelp);
        default:
          return new CommandResult(genericHelp);
      }
    return null;
  }
}
const npcHelp=`**npc help**
\`\`\`asciidoc
!npc print                        - print all registered npc
!npc kill all                     - remove all npc
!npc kill boss                    - remove npc with name 'boss'
!npc boss a=12 d=13+-1            - add npc boss with 2 skills [a=12] [d=12..14]
!npc skendas[6] a=12 d=11         - add 6 npc skendas with 2 skills [a=12] [d=11]

skill name defines combat mode
defense mode: [d | evade | shield | parry | block]
range mode:   [r |bow]
attack mode:  all other names

\`\`\``;
const genericRollHelp=`**location roll help**
\`\`\`asciidoc
!                                 - roll 1d6
!4d                               - roll 4d6
!d20                              - roll 1d20
!4d12                             - roll 4d12
! fortunes.ranged17               - roll 1d6 and display ranged fortunes17
! fr17                            - translates to ! fortunes.ranged17
! string                          - roll 1D6 ant look for result in !rules
\`\`\``;
const locationHelp=`**location roll help**
\`\`\`asciidoc
!l                                - roll 1d6 for generic location
!l head or !l h                   - roll 1d6 for head sub location
!l body or !l b                   - roll 1d6 for body sub location
!l arm or !l left arm or !l larm  - roll 1d6 for arm sub location
!l leg or !l right leg or !l rleg - roll 1d6 for leg sub location
\`\`\``;

const luckHelp=`**luck help**
\`\`\`asciidoc
!luck         - rerolls last combat or spell roll
!luck 2       - only for social, rerolls 2 dices of last social roll
!luck 3       - only for social, rerolls 3 dices of last social roll
\`\`\``;

const socialHelp=`**social roll help**
\`\`\`asciidoc
!s 4        - rolls 4d6 with effectiveness of 4 to calc success dices. 6 auto explode - allows to roll additional time
!s 4 3      - rolls 4d6 with effectiveness of 3 i.e. specialization
\`\`\``;

const spellHelp=`**spell roll help**
!spell      - rolls 3d6 to determine spell result, automatically resolves crit effects
\`\`\``;

const damageHelp=`**damage roll help**
\`\`\`asciidoc
!d 4 BBC  - rolls 4d6 to calc BBC damage
\`\`\``;

const playerHelp=`**character help**
\`\`\`asciidoc
!p attr            - prints attributes
!p combat          - prints combat skills
!p str 11          - set STR attribute to 11, can see all list of attributes with !p attr
!p c axe 3         - set axe skill to lvl 3
!p c bow a=per     - set bow skill attribute to PER
!p c bow ranged    - set bow skill to be ranged, it will be used for different critical tables
!p c parry defense - set parry skill to be defense
!p c remove axe    - set axe skill to 0
\`\`\``;

const combatHelp=`**combat roll help**
\`\`\`asciidoc
!c                    - rolls 3d6
!c+3 or !c +3         - rolls 3d6 +3
!c-1 or !c -1         - rolls 3d6 -1
!c axe                - computes axe skill [X=ref+skill lvl] and translates to !c +X
!c axe-2 or !c axe -2 - computes axe skill adds and translates to !c +X
!context autofail 8   - changes autofail to 8
\`\`\``;

const genericHelp=`**help**
\`\`\`asciidoc
character creation !p help
npc                !npc help
combat roll        !c help
social roll        !s help
spell roll         !spell help
damage roll        !d help
location roll      !l help
generic roll       !r help
luck               !luck help
rules              !rules
rules - chapter    !rules fortunes.melee17
\`\`\``;