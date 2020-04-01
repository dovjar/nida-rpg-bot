export class Context{

    constructor(globalContext:GlobalContext, userId: string) {
        this._globalContext = globalContext;
        this._userId = userId;
    }
    rollOne(sides=6):number {
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
    getContext(userId:string){
        if (!this.localContexts[userId])
            this.localContexts[userId]=new Context(this.globalContext, userId);
        return this.localContexts[userId];
    }
}

export const contextManager = new ContextManager();