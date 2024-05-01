class GoldModel {
    constructor({id, totalResource = 100, remainingResource = totalResource}) {
        this.id = id;
        this.coords = id.split('-');
        this.totalResource = totalResource;
        this.remainingResource = remainingResource;
        this.type = 'gold';
    }
  
    updateResource(amount) {
        this.remainingResource += amount;
    }

}
  
export default GoldModel;
  