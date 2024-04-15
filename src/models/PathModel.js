class PathModel {
    constructor({id, totalHitpoints = 10, remainingHitpoints = totalHitpoints}) {
        this.id = id;
        this.coords = id.split('-');
        this.totalHitpoints = totalHitpoints;
        this.remainingHitpoints = remainingHitpoints;
        this.type = 'path';
    }
  
    updateRemainingHitpoints(amount) {
        this.remainingHitpoints += amount;
    }

}
  
export default PathModel;
  