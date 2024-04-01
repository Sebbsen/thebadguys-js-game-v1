class GameStateModel {
    constructor() {
        this.resources = {
            wood: 0,
            iron: 0
        };
        this.entities = [];
    }

    getWood() {
        return this.resources.wood;
    }

    setWood(value) {
        this.resources.wood = value;
    }

    removeWood(value) {
        this.resources.woo -= value;
    }

    getIron() {
        return this.resources.iron;
    }

    setIron(value) {
        this.resources.iron = value;
    }

    getEntities() {
        return this.entities;
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }

    editEntity(entity, newProperties) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities[index] = { ...entity, ...newProperties };
        }
    }
}

export default GameStateModel;