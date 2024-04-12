class IronModel {
    constructor({id, totalResource = 500, remainingResource = totalResource}) {
        this.id = id;
        this.coords = id.split('-');
        this.totalResource = totalResource;
        this.remainingResource = remainingResource;
        this.type = 'iron';
    }
  
    updateResource(amount) {
        this.remainingResource += amount;
    }

}
  
export default IronModel;
  