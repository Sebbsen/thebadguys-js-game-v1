import GameStateModel from '../models/GameStateModel';
import mapMatrixBackup from '../assets/mapMatrix64.json';
import mapImg64_1 from '../assets/mapImg64_1.png';
import mapImg128_1 from '../assets/mapImg128_1.png';
import { getEntities } from '../services/entitiesFactory';
import { imgToMapMatrix, isElementInViewport } from '../services/utils';


const GameState = new GameStateModel();
const mapImg = new Image();
mapImg.src = mapImg64_1;
//debugger
mapImg.onload = () => { 
    const mapMatrix = imgToMapMatrix(mapImg);
    GameState.setEntities(getEntities(mapMatrix));
    GameState.initMap(mapMatrix, mapImg.width, 25);
    GameState.startCheckForAutoWork();
}

// hide tiles out of camera (Frustum Culling)
setInterval(()=>{
    let mapTiles = document.querySelectorAll('#map > div')

    mapTiles.forEach(el => {
        if(!el.firstChild) {
            return
        }
        if(!isElementInViewport(el)) {
            el.firstChild.classList.add('hide')
        } else {
            el.firstChild.classList.remove('hide')
        }
    }) 
}, 500)

// Export the instance to make it available to other components
export default GameState;