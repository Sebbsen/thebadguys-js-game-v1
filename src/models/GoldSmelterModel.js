import GameState from '../state/GameManager';

class GoldSmelterModel {
    constructor({id, lvl = 1}) {
        this.id = id;
        this.coords = id.split('-');
        this.lvl = lvl;
        this.productionRate = 1 * lvl;
        this.baseWorkInterval = 1000;
        this.needsPath = true;
        this.isConnected = false;
    }

    checkForAutoWork() {
        setInterval(() => {
            if (this.isConnected === false) {
                return;
            }
            const resources = GameState.getResources();
            const gold = resources['gold'];
            const wood = resources['wood'];
            if (gold >= 2 && wood >= 1) {
                GameState.changeResource('gold', -2);
                GameState.changeResource('wood', -1);
                GameState.changeResource('goldIngots', this.productionRate);
            }
        }, 1000);
    }
    
    

    

}
  
export default GoldSmelterModel;
  