import { ICommand } from "./interfaces";
import { INpc } from "./INpc";

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

    rollMany(dices:number, sides=6): number[]{
        return [...Array(dices)].map(() => this.rollOne(sides));
    };
    explode = (arr) => {
        let newArr = [...Array(arr.filter((el) => el === 6).length)].map(() => this.rollOne());
        if (newArr.some((el) => el === 6)) {
          newArr = [...newArr, ...this.explode(newArr)];
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
    autoFail:number = 7;
    npc:INpc[] = [];
}


// tslint:disable-next-line: max-classes-per-file
class ContextManager{
    localContexts={}
    globalContext = new GlobalContext();
    getContext(userId:string):Context{
        if (!this.localContexts[userId])
            this.localContexts[userId]=new Context(this.globalContext, userId);
        return this.localContexts[userId];
    }
}

export const contextManager = new ContextManager();