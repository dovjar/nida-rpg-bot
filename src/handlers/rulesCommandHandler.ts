import { RulesCommand } from "../commands/RulesCommand";
import { ICommandHandler, ICommand } from "../interfaces";
import { CommandResult } from "../commandResults/CommandResult";
import { Context } from "../context";
import { isObject, isString } from "util";

export const commandHandler:ICommandHandler = {
    async handle(command:ICommand , context:Context):Promise<CommandResult>{
      if (command instanceof RulesCommand){
        if (command.chapter==='')
            return new CommandResult(`**RULES**\n\`\`\`asciidoc\n${TOC(context.globalContext.rules)}\n\`\`\``)
        else
            return new CommandResult(`**RULES**\n\`\`\`asciidoc\n${listAllProperties(getSubChapter(context.globalContext.rules,command.chapter), command.chapter, command.bold)}\n\`\`\``)
      }
      return null;
    }
}

const getSubChapter=(obj, chapter:string)=>{
    const parts = chapter.split('.');
    for(const part of parts){
        if (obj[part])
            obj=obj[part];
        else
            break;
    }
    return obj;
}
const listAllProperties = (obj, header, bold:number):string => {
    if (isString(obj))
        return `*${obj}*`;
    let line=`*${header}*`;
    const keys = Object.keys(obj);
    keys.forEach(t => {
        if(isObject(obj[t]))
            line+=`\nchapter\t\t${t}`;
        else if (t===bold.toString())
            line+=`\n*${t}\t\t${obj[t]}*`;
        else
            line+=`\n${t}\t\t${obj[t]}`;
    });
    return line;
  }
const TOC=(obj)=>{
    const chapters=recursive(obj);
    let line=`*TOC*`;
    chapters.forEach(t => {
        line+=`\n${t}`;
    });
    return line;

}
const recursive=(obj,prefix='', chapters=[])=>{
    if (isObject(obj) && !isString(obj)){
        const keys = Object.keys(obj);
        for(const key of keys){
            const sub = obj[key];
            if (isObject(sub) && !isString(sub)){
                chapters =[...chapters,`${prefix}${key}`,...recursive(sub,`${prefix}${key}.`)];
            }
        }
    }
    return chapters;
}