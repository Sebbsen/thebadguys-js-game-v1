import WoodModel from './WoodModel';
import GameState from '../state/GameManager';

class LumberjackHutModel {
    constructor({id, lvl = 1}) {
        this.id = id;
        this.coords = id.split('-');
        this.jobQue = [];
        this.lvl = lvl;
        this.productionRate = 1 * lvl;
        this.workingRadius = 1;
        this.baseWorkInterval = 1000;
        this.needsPath = true;
        this.isConnected = false;
    }
  
    addToQue(myWoodModel) {
        if (myWoodModel instanceof WoodModel) {
            this.jobQue.push(myWoodModel);
            // start Work if not already started
            if (this.jobQue.length === 1) {
                this.startWork();
            }
        }
    }

    doJob(myWoodModel) {
        GameState.editEntity(myWoodModel, {remainingResource: myWoodModel.remainingResource - this.productionRate});
        GameState.addWood(this.productionRate);
    }

    startWork() {
        const prepareJob = () => {
            if (this.jobQue.length > 0) {
                let currentJob = this.jobQue[0];
                // Recalculate the distance each time
                let jobDistance = Math.max(Math.abs(this.coords[0] - currentJob.coords[0]), Math.abs(this.coords[1] - currentJob.coords[1]));
    
                // Wait based on the distance, then execute the job.
                setTimeout(() => {
                    // Make sure the job is still relevant.
                    if (currentJob.remainingResource <= 0) {
                        this.jobQue.shift(); // Remove the job when it is completed.
                    } else {
                        this.doJob(currentJob);
                    }
                    
                    prepareJob(); // Prepare the next job.
                }, this.baseWorkInterval * ((jobDistance + 1) / (this.lvl + 1))); // the higher the level the faster / the higher the distance the slower
            }
        };
    
        prepareJob(); // Init preparation
    }

    checkForAutoWork() {
        setInterval(() => {
            const entities = GameState.getEntities();
            if (this.jobQue.length <= 0) {
               
                entities.forEach(entity => {
                    if (entity instanceof WoodModel) {
                        let distance = Math.max(Math.abs(this.coords[0] - entity.coords[0]), Math.abs(this.coords[1] - entity.coords[1]));
                        
                        if (distance <= this.workingRadius) {
                            this.addToQue(entity);
                        }
                    }
                });
            }
        }, 1000);
        
    }
    
    

    

}
  
export default LumberjackHutModel;
  