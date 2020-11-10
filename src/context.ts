import { ICommand } from "./interfaces";
import { INpc } from "./INpc";
import { isObject, isString } from "util";

export interface ICommandRecord{
    command: ICommand,
    handledAt: number
}

export class Context{


    constructor(globalContext:GlobalContext, userId: string) {
        this._globalContext = globalContext;
        this._userId = userId;
    }
    rollOne(sides=6):number {
        if (this._cheatsEnabled){
            const roll = this.dices.shift();
            this.dices.push(roll);
            return roll;
        }
        return Math.ceil(Math.random() * sides)
    };

    rollMany(dices:number, sides): number[]{
        return [...Array(dices)].map(() => this.rollOne(sides));
    };
    explode = (arr, maxValue) => {
        let newArr = [...Array(arr.filter((el) => el === maxValue).length)].map(() => this.rollOne());
        if (newArr.some((el) => el === 6)) {
          newArr = [...newArr, ...this.explode(newArr, maxValue)];
        }
        return newArr;
      };
    /**
     * Getter userId
     * @return {string}
     */
	public get userId(): string {
		return this._userId;
	}
    private _userId:string;
    /**
     * Getter globalContext
     * @return {GlobalContext}
     */
	public get globalContext(): GlobalContext {
		return this._globalContext;
	}
    private _globalContext:GlobalContext;
    setDebugDices(dices: number[]) {
        this._cheatsEnabled=true;
        this.dices = dices;
    }
    resetDices(){
        this._cheatsEnabled=false;
        this.dices = null;
    }
    dices:number[];
    /**
     * Getter isCheatsEnabled
     * @return {boolean}
     */
	public get cheatsEnabled(): boolean {
		return this._cheatsEnabled;
	}
    private _cheatsEnabled:boolean=false;

    /**
     * Getter commandsHistory
     * @return {ICommandRecord[]}
     */
	public get commandsHistory(): ICommandRecord[] {
		return this._commandsHistory;
	}
    private _commandsHistory:ICommandRecord[] = [];
    public insertHistory(command:ICommand){
        this._commandsHistory.push({command,handledAt:Date.now()})
        if (this._commandsHistory.length>100){
            this._commandsHistory.shift();
        }
    }

}
// tslint:disable-next-line: max-classes-per-file
export class GlobalContext{
    constructor(rules,rulesAliasesMap ) {
        this.rules = rules;
        this.rulesAliasesMap = rulesAliasesMap;
        if(this.rules.settings?.dSides)
        {
            this.dSides = this.rules.settings.dSides;
        }
    }
    dSides =6;
    autoFail:number = 7;
    npc:INpc[] = [];
    rules:any;
    rulesAliasesMap=[];
    fogOfWarUserId: string;
    findRuleChapterByAlias(alias:string){
        return this.rulesAliasesMap.find(t=>t.alias === alias)?.chapter || alias;
    }

    getMeleeFortune(roll, type) {
        return this.rules.fortunes[`melee${type}`][roll];
      }

    getMeleeMisfortune(roll, type) {
        return this.rules.misfortunes[`melee${type}`][roll];
      }

    getRangedFortune(roll, type) {
        return this.rules.fortunes[`ranged${type}`][roll];
      }

    getRangedMisfortune(roll, type) {
        return this.rules.misfortunes[`ranged${type}`][roll];
      }
    getMagicFortune(roll, type) {
        return this.rules.fortunes[`magic${type}`][roll];
      }
    getMagicMisfortune(roll, type) {
        return this.rules.misfortunes[`magic${type}`][roll];
      }
}


// tslint:disable-next-line: max-classes-per-file
class ContextManager{
    constructor() {
        this.changeRules(`default`);
    }

    localContexts={}
    globalContext;

    public changeRules(rulesName: string){
        const rules = require(`./../rules_${rulesName}.json`);
        const rulesAliasesMap=[];
        this.traverseObject(rules,rulesAliasesMap)
        this.globalContext =  new GlobalContext(rules, rulesAliasesMap);
        this.localContexts={};
    }

    getContext(userId:string):Context{
        if (!this.localContexts[userId])
            this.localContexts[userId]=new Context(this.globalContext, userId);
        return this.localContexts[userId];
    }
    traverseObject(obj,rulesAliasesMap, prefix=''){
        if (isObject(obj) && !isString(obj)){
            const keys = Object.keys(obj);
            for(const key of keys){
                if (key==='aliases'){
                    for(const a of obj.aliases)
                        rulesAliasesMap.push({alias:a,chapter:`${prefix.substring(0, prefix.length-1)}`});
                }
                const sub = obj[key];
                if (isObject(sub) && !isString(sub)){
                    this.traverseObject(sub,rulesAliasesMap, `${prefix}${key}.`);
                }
            }
        }
    }
}

export const contextManager = new ContextManager();