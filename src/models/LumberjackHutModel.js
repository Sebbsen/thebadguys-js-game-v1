import WoodModel from './WoodModel';

class LumberjackHutModel {
    constructor({id, lvl = 1, collectWood = (amount) => {}}) {
        this.id = id;
        this.coords = id.split('-');
        this.jobQue = [];
        this.lvl = lvl;
        this.productionRate = 1 * lvl;
        this.baseWorkInterval = 1000;
        this.collectWood = collectWood;
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
        myWoodModel.updateResource(-this.productionRate);
        this.collectWood(this.productionRate); //TODO add a check to see if the myWoodModel is less than productionRate
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
    

    

}
  
export default LumberjackHutModel;
  