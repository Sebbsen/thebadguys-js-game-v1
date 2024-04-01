class GameStateModel {
    constructor() {
        this.map = {
            mapMatrix: [],
            mapSize: 0,
            tileSize: 0
        };
        this.resources = {
            wood: 10,
            iron: 0
        };
        this.entities = [];
        this.observers = new Map();
    }

    // observer
    addObserver(type, observer) {
        if (!this.observers.has(type)) {
            this.observers.set(type, []);
        }
        this.observers.get(type).push(observer);
    }

    removeObserver(type, observer) {
        if (this.observers.has(type)) {
            const observersOfType = this.observers.get(type);
            const index = observersOfType.indexOf(observer);
            if (index !== -1) {
                observersOfType.splice(index, 1);
            }
        }
    }

    notifyObservers(type, data) {
        if (this.observers.has(type)) {
            for (const observer of this.observers.get(type)) {
                observer.update(data);
            }
        }
    }

    // map
    initMap(mapMatrix, mapSize, tileSize) {
        this.map.mapMatrix = mapMatrix;
        this.map.mapSize = mapSize;
        this.map.tileSize = tileSize;
    }

    getMap() {
        return this.map;
    }

    // resources
    getWood() {
        return this.resources.wood;
    }

    addWood(value) {
        this.resources.wood += value;
        this.notifyObservers('woodChanged', this.resources.wood);
    }

    removeWood(value) {
        this.resources.wood -= value;
        this.notifyObservers('woodChanged', this.resources.wood);
    }

    getIron() {
        return this.resources.iron;
    }

    addIron(value) {
        this.resources.iron += value;
        this.notifyObservers('ironAdded', value);
    }

    removeIron(value) {
        this.resources.iron -= value;
        this.notifyObservers('ironRemoved', value);
    }

    // entities

    getEntities() {
        return this.entities;
    }

    getEntityById(id) { 
        return this.entities.find(entity => entity.id === id); 
    }

    addEntity(entity) {
        this.entities.push(entity);
        this.notifyObservers('entityAdded', entity);
    }

    removeEntity(entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
            this.notifyObservers('entityRemoved', entity);
        }
    }

    editEntity(entity, newProperties) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities[index] = { ...entity, ...newProperties };
            this.notifyObservers('entityEdited', this.entities[index]);
        }
    }
}

export default GameStateModel;