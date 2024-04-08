import GameState from '../state/GameManager';
import { containsArray } from '../services/utils';

class BaseModel {
    constructor({id}) {
        this.id = id;
        this.coords = id.split('-');
        this.needsPathTileTypes = ['L', 'I']; //TODO: make it smarter
        this.type = 'Base';
    }
  
    getConnectedEntitiesCoords = () => {
        const myMatrix = GameState.getMap().mapMatrix;
        const surroundingCordsOffset = [
            [-1,-1], [-1,0], [-1,1],
            [0,-1],          [0,1],
            [1,-1],  [1,0],  [1,1],
        ]
    
    
        const alreadyCheckedCoords = [];
        const connectedBuildingsCoords = []
    
        // recursive function to check surrounding coords
        const checkSurroundingCoords = (currentCoords) => {
            surroundingCordsOffset.forEach((offset) => {
                const surroundingCord = [];
                surroundingCord[0] = parseFloat(currentCoords[0]) + parseFloat(offset[0]);
                surroundingCord[1] = parseFloat(currentCoords[1]) + parseFloat(offset[1]);
                // return if already checked
                if (containsArray(alreadyCheckedCoords, surroundingCord)) {
                    return
                }
    
                alreadyCheckedCoords.push(surroundingCord);
                const tileTypeInMatrix = myMatrix[surroundingCord[0]][surroundingCord[1]];
                if(tileTypeInMatrix === 'P') {
                    checkSurroundingCoords(surroundingCord);
                } else if (this.needsPathTileTypes.includes(tileTypeInMatrix)) {
                    connectedBuildingsCoords.push(surroundingCord);
                }
            })
        }
    
        checkSurroundingCoords(this.coords);
        
        return connectedBuildingsCoords;
    }

    setConnectedAttOnEntities = () => {
        const connectedEntitiesCoords = this.getConnectedEntitiesCoords()
        const connectedEntitiesIds = connectedEntitiesCoords.map(coords => `${coords[0]}-${coords[1]}`)
        const needsPathEntities = GameState.getEntities().filter(entity => entity.needsPath === true)
        
        needsPathEntities.forEach(entity => {
            if (connectedEntitiesIds.includes(entity.id)) {
                GameState.editEntity(entity, {isConnected: true})
            } else {
                GameState.editEntity(entity, {isConnected: false})
            }
        })
    }

}
  
export default BaseModel;