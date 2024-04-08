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

    editMap(coords, letter) {
        const x = coords[0];
        const y = coords[1];
        
        if (x >= 0 && x < this.map.mapSize/this.map.tileSize && y >= 0 && y < this.map.mapSize/this.map.tileSize) {
            this.map.mapMatrix[x][y] = letter;
            this.notifyObservers('mapEdited', this.map);
        }
    }

    // resources
    getResources() {
        return this.resources;
    }

    changeResource(resource, value) {
        this.resources[resource] += value;
        this.notifyObservers(`${resource}Changed`, this.resources[resource]);
    }

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
    
    setEntities(entities) {
        this.entities = entities;
    }

    getEntityById(id) {
        return this.entities.find(entity => entity.id === id); 
    }

    addEntity(entity) {
        const index = this.entities.findIndex(e => e.id === entity.id);
        if (index !== -1) {
            this.entities[index] = entity;
        } else {
            this.entities.push(entity);
        }
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
            Object.assign(this.entities[index], newProperties);
            this.notifyObservers(`entityEdited${this.entities[index].id}`, this.entities[index]);
        }
    }

    startCheckForAutoWork() { 
        this.entities.forEach(entity => {
            if (entity.checkForAutoWork) {
                entity.checkForAutoWork();
            }
        });
    }
}

export default GameStateModel;