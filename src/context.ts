export class Context{
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

}
// tslint:disable-next-line: max-classes-per-file
export class GlobalContext{
    autofail:number = 7;
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