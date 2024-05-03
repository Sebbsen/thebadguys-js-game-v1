class WoodModel {
    constructor({id, totalResource = 50, remainingResource = totalResource}) {
        this.id = id;
        this.coords = id.split('-');
        this.totalResource = totalResource;
        this.remainingResource = remainingResource;
        this.prevResource = remainingResource;
        this.type = 'wood';
    }
  
    updateResource(amount) {
        this.prevResource = this.remainingResource;
        this.remainingResource += amount;
        return this.remainingResource;
    }

}
  
export default WoodModel;
  