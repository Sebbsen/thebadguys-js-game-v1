import GameStateModel from '../models/GameStateModel';
import mapMatrix from '../assets/mapMatrix32.json';
import { getEntities } from '../services/entitiesFactory';


const GameState = new GameStateModel();

GameState.setEntities(getEntities(mapMatrix));
GameState.initMap(mapMatrix, 800, 25);
GameState.startCheckForAutoWork();

// Export the instance to make it available to other components
export default GameState;