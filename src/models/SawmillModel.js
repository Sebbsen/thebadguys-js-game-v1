import WoodModel from './WoodModel';
import GameState from '../state/GameManager';

class SawmillModel {
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
            const resources = GameState.getResources();
            const wood = resources['wood'];
            if (wood >= 1) {
                GameState.changeResource('wood', -1);
                GameState.changeResource('planks', this.productionRate);
            }
        }, 1000);
        
    }
    
    

    

}
  
export default SawmillModel;
  