import GameState from '../state/GameManager';

class CompassFactoryModel {
    constructor({ id, lvl = 1 }) {
        this.id = id;
        this.coords = id.split('-');
        this.lvl = lvl;
        this.productionRate = 1 * lvl;
        this.baseWorkInterval = 1000;
        this.autoWorkIntervalId = null;
        this.needsPath = true;
        this.isConnected = false;
        this.type = 'compassfactory';
    }

    checkForAutoWork() {
        this.autoWorkIntervalId = setInterval(() => {
            if (this.isConnected === false) {
                return;
            }
            const resources = GameState.getResources();
            const gold = resources['goldIngots'];
            const iron = resources['ironIngots'];
            if (gold >= 2 && iron >= 4) {
                GameState.changeResource('goldIngots', -2);
                GameState.changeResource('ironIngots', -4);
                GameState.changeResource('compasses', this.productionRate);
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

export default CompassFactoryModel;
