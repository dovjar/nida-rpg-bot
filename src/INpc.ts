export interface INpc {
    name: string;
    skills: INpcSkill[];
}

export interface INpcSkill{
    name:string;
    lvl:number;
}

export interface INpcSkillCommand{
    name:string;
    lvl:number;
    random:number;
}