import GameStateModel from '../models/GameStateModel';
import mapMatrixBackup from '../assets/mapMatrix64.json';
import mapImg64_1 from '../assets/mapImg64_1.png';
import mapImg128_1 from '../assets/mapImg128_1.png';
import { getEntities } from '../services/entitiesFactory';
import { imgToMapMatrix } from '../services/utils';


const GameState = new GameStateModel();
const mapImg = new Image();
mapImg.src = mapImg64_1;

export const loadMap = () => {
    const mapMatrix = imgToMapMatrix(mapImg);
    GameState.setEntities(getEntities(mapMatrix));
    GameState.initMap(mapMatrix, mapImg.width, 25);
    GameState.startCheckForAutoWork();
}

setTimeout(() => {
    loadMap();
},)



// Export the instance to make it available to other components
export default GameState;