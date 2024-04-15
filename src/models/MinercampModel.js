import IronModel from './IronModel';
import GoldModel from './GoldModel';
import GameState from '../state/GameManager';

class MinercampModel {
    constructor({ id, lvl = 1 }) {
        this.id = id;
        this.coords = id.split('-');
        this.jobQueue = [];
        this.lvl = lvl;
        this.productionRate = 1 * lvl;
        this.workingRadius = 1;
        this.baseWorkInterval = 1000;
        this.autoWorkIntervalId = null;
        this.workTimeoutId = null;
        this.needsPath = true;
        this.isConnected = false;
        this.type = 'minercamp';
    }

    addToQueue(myResourceModel) {
        if (myResourceModel instanceof IronModel || myResourceModel instanceof GoldModel) {
            this.jobQueue.push(myResourceModel);
            // start Work if not already started
            if (this.jobQueue.length === 1) {
                this.startWork();
            }
        }
    }

    doJob(myResourceModel) {
        // if building is not Connected to Base return
        if (!this.isConnected) {
            console.log(this.id + 'is not connected to Base')
            return
        }
        
        GameState.editEntity(myResourceModel, 'remainingResource', myResourceModel.remainingResource - this.productionRate);
        GameState.changeResource(myResourceModel.type, this.productionRate);
        if (myResourceModel.remainingResource <= 0) {
            GameState.editMap(myResourceModel.coords, 'E');
            GameState.removeEntity(myResourceModel);
        }
    }

    startWork() {
        const prepareJob = () => {
            if (this.jobQueue.length > 0) {
                let currentJob = this.jobQueue[0];
                // Recalculate the distance each time
                let jobDistance = Math.max(Math.abs(this.coords[0] - currentJob.coords[0]), Math.abs(this.coords[1] - currentJob.coords[1]));

                // Wait based on the distance, then execute the job.
                this.workTimeoutId = setTimeout(() => {
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
        this.autoWorkIntervalId = setInterval(() => {
            const entities = GameState.getEntities();
            if (this.jobQueue.length <= 0) {
                const entity = entities.find(entity => {
                    if (entity instanceof IronModel || entity instanceof GoldModel) {
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

    stop() {
        if (this.autoWorkIntervalId) {
            clearInterval(this.autoWorkIntervalId);
            this.autoWorkIntervalId = null;
        }
        if (this.workTimeoutId) {
            clearTimeout(this.workTimeoutId);
            this.workTimeoutId = null;
        }
    }




}

export default MinercampModel;
