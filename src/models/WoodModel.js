class WoodModel {
    constructor({id, totalResource = 1, remainingResource = totalResource}) {
        this.id = id;
        this.coords = id.split('-');
        this.totalResource = totalResource;
        this.remainingResource = remainingResource;
    }
  
    updateResource(amount) {
        this.remainingResource += amount;
    }

}
  
export default WoodModel;
  