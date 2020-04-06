import { CharModel, CharDoc, CharProps, CombatSkillProps, CombatModeEnum as CombatModeEnum } from "./models/char";
const newChar =(playerId:string, name:string)=>{
    return {
        playerId,
        name,
        attr:{
            str:10,
            sta:10,
            dex:10,
            ref:10,
            per:10,
            will:10
        },
        combatSkills:[]
    }
}
export class Player{



	constructor(playerId:string) {
        this.playerId = playerId;
	}

    playerId:string;
    char:CharDoc;

    async loadChar(name:string){
        try{
            this.char = await CharModel.findOne({playerId: this.playerId, name});
            if (! this.char){
                this.char = new CharModel(newChar(this.playerId, name));
                await this.char.save();
            }
        }
        catch(e){
            throw new Error(`can't load a char from DB.`);
        }
    }
    async ensureCharLoaded(){
        if (!this.char){
            await this.loadChar("default");
        }
    }
    async saveChar(){
        try{
            await CharModel.updateOne({playerId: this.char.playerId, name: this.char.name}, this.char);
        }
        catch{
            throw new Error(`can't save a char from DB.`);
        }
    }
    async setAttr(attr:string, lvl: number){
        await this.ensureCharLoaded();
        this.char.attr[attr] = lvl;
        this.saveChar();
    }
    async getChar():Promise<CharDoc> {
        await this.ensureCharLoaded();
        return this.char;
    }
    async setCombatSkill(skillName: string, lvl: number, attr: string, combatMode:CombatModeEnum):Promise<CombatSkillProps> {
        await this.ensureCharLoaded();
        let skill:CombatSkillProps = this.char.combat.find(t=>t.name===skillName);
        if(!skill){
            skill = {__v:0, name:skillName, lvl, attr:attr || 'ref', mode:combatMode || 'melee'};
            this.char.combat.push(skill);
        }else{
            if(!isNaN(lvl))
                skill.lvl = lvl;
            if(attr!==undefined)
                skill.attr = attr;
            if(combatMode!==undefined)
                skill.mode = CombatModeEnum[combatMode];
        }
        await this.saveChar();
        return skill;
    }
    async removeCombatSkill(skillName: string) {
        await this.ensureCharLoaded();
        const idx = this.char.combat.findIndex(t=>t.name===skillName);
        if(idx>=0){
            this.char.combat.splice(idx,1);
        }
        await this.saveChar();
    }
}
