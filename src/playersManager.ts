import { Player } from "./player";

class PlayersManager {
    joined: Player[]= new Array<Player>();
    getPlayer(playerId:string){
        let result = this.joined.find(t=>t.playerId === playerId);
        if(! result){
            result = new Player(playerId);
            this.joined.push(result);
        }
        return result;
    }
}

export const playersManager = new PlayersManager();