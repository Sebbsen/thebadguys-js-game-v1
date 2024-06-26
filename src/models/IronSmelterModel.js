import GameState from '../state/GameManager';

class IronSmelterModel {
    constructor({id, lvl = 1}) {
        this.id = id;
        this.coords = id.split('-');
        this.lvl = lvl;
        this.productionRate = 1 * lvl;
        this.baseWorkInterval = 1000;
        this.autoWorkIntervalId = null;
        this.needsPath = true;
        this.isConnected = false;
        this.type = 'ironsmelter';
    }

    checkForAutoWork() {
        this.autoWorkIntervalId = setInterval(() => {
            if (this.isConnected === false) {
                return;
            }
            const resources = GameState.getResources();
            const iron = resources['iron'];
            const wood = resources['wood'];
            if (iron >= 2 && wood >= 1) {
                GameState.changeResource('iron', -2);
                GameState.changeResource('wood', -1);
                GameState.changeResource('ironIngots', this.productionRate);
            }
        }, 1000);
    }
    
    stop() {
        if (this.autoWorkIntervalId) {
            clearInterval(this.autoWorkIntervalId);
            this.autoWorkIntervalId = null;
        }
    }
    

    

}
  
export default IronSmelterModel;
  