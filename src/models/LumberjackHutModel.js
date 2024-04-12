import WoodModel from './WoodModel';
import GameState from '../state/GameManager';

class LumberjackHutModel {
    constructor({ id, lvl = 1 }) {
        this.id = id;
        this.coords = id.split('-');
        this.jobQueue = [];
        this.lvl = lvl;
        this.productionRate = 1 * lvl;
        this.workingRadius = 1;
        this.baseWorkInterval = 1000;
        this.needsPath = true;
        this.isConnected = false;
    }

    addToQueue(myWoodModel) {
        if (myWoodModel instanceof WoodModel) {
            this.jobQueue.push(myWoodModel);
            // start Work if not already started
            if (this.jobQueue.length === 1) {
                this.startWork();
            }
        }
    }

    doJob(myWoodModel) {
        // if building is not Connected to Base return
        if (!this.isConnected) {
            console.log(this.id + 'is not connected to Base')
            return
        }

        GameState.editEntity(myWoodModel, 'remainingResource', myWoodModel.remainingResource - this.productionRate);
        GameState.addWood(this.productionRate);
        if (myWoodModel.remainingResource <= 0) {
            GameState.editMap(myWoodModel.coords, 'E');
            GameState.removeEntity(myWoodModel);
        }
    }

    startWork() {
        const prepareJob = () => {
            if (this.jobQueue.length > 0) {
                let currentJob = this.jobQueue[0];
                // Recalculate the distance each time
                let jobDistance = Math.max(Math.abs(this.coords[0] - currentJob.coords[0]), Math.abs(this.coords[1] - currentJob.coords[1]));

                // Wait based on the distance, then execute the job.
                setTimeout(() => {
                    // Make sure the job is still relevant.
                    if (currentJob.remainingResource <= 0) {
                        this.jobQueue.shift(); // Remove the job when it is completed.
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
            if (this.jobQueue.length <= 0) {
                const entity = entities.find(entity => {
                    if (entity instanceof WoodModel) {
                        let distance = Math.max(Math.abs(this.coords[0] - entity.coords[0]), Math.abs(this.coords[1] - entity.coords[1]));
                        return distance <= this.workingRadius;
                    }
                    return false;
                });

                if (entity) {
                    this.addToQueue(entity);
                }
            }
        }, 1000);
    }





}

export default LumberjackHutModel;
