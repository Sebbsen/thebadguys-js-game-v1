class WoodModel {
    constructor({id, totalResource = 50, remainingResource = totalResource}) {
        this.id = id;
        this.coords = id.split('-');
        this.totalResource = totalResource;
        this.remainingResource = remainingResource;
        this.type = 'wood';
    }
  
    updateResource(amount) {
        this.remainingResource += amount;
    }

}
  
export default WoodModel;
  