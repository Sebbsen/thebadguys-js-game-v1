class GameStateModel {
    constructor() {
        this.map = {
            mapMatrix: [],
            mapSize: 0,
            tileSize: 0
        };
        this.resources = {
            wood: 50,
            planks: 0,
            iron: 0,
            gold: 0,
            ironIngots: 0,
            goldIngots: 0,
            compasses: 0,
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

    checkForPathConnection(oldTile, newTile) {
        const baseEntity = this.entities.find(entity => entity.type === 'base'); //TODO: find a better way to get the base entity (mabye store it on load)
        baseEntity.setConnectedAttOnEntities();
    }

    editMap(coords, letter) {
        
        //TODO: i think x,y are switched
        const x = coords[0];
        const y = coords[1];
        
        if (x >= 0 && x < this.map.mapSize && y >= 0 && y < this.map.mapSize) { // check if coords are within map
            
            const oldTile = this.map.mapMatrix[x][y];
            const newTile = letter;
            this.map.mapMatrix[x][y] = newTile;
            
            // check path connection
            if (newTile !== 'E' || oldTile === 'P' ) { // check if new tile is not empty or old tile is path
                this.checkForPathConnection(); 
            }
            
            this.notifyObservers('mapEdited', this.map);
        }
    }

    get4Neighbours(x, y) {
        const neighbours = [];
        const surroundingCordsOffset = [
            [-1,0], [0,1], [1,0], [0,-1], 
        ];

        surroundingCordsOffset.forEach((offset) => {
            const surroundingCord = [];
            surroundingCord[0] = parseFloat(x) + parseFloat(offset[0]);
            surroundingCord[1] = parseFloat(y) + parseFloat(offset[1]);
            if (surroundingCord[0] >= 0 && surroundingCord[0] < this.map.mapSize && surroundingCord[1] >= 0 && surroundingCord[1] < this.map.mapSize) {
                neighbours.push(this.map.mapMatrix[surroundingCord[0]][surroundingCord[1]]);
            } else {
                neighbours.push('E');
            }
        });

        return neighbours;
    }

    // resources
    getResources() {
        return this.resources;
    }

    getResouce(resource) {
        return this.resources[resource];
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
            // stop entity if it has a stop method
            if (this.entities[index].stop) {
                this.entities[index].stop();
            }
            this.entities.splice(index, 1);
            this.notifyObservers('entityRemoved', entity);
        }
    }

    editEntity(entity, propName, value) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities[index][propName] = value;
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