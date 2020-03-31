import { CharModel, CharDoc, CharProps } from "./models/char";
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
        this.char = await CharModel.findOne({playerId: this.playerId, name});
        if (! this.char){
            this.char = new CharModel(newChar(this.playerId, name));
            await this.char.save();
        }
    }
    async ensureCharLoaded(){
        if (!this.char){
            await this.loadChar("default");
        }
    }
    async saveChar(char:CharProps){
        await CharModel.updateOne({playerId: this.char.playerId, name: this.char.name}, this.char);
    }
    async setAttr(attr:string, lvl: number){
        await this.ensureCharLoaded();
        this.char.attr[attr] = lvl;
        this.saveChar(this.char);
    }
    async getChar():Promise<CharDoc> {
        await this.ensureCharLoaded();
        return this.char;
    }
}
