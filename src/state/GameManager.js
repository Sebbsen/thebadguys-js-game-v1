import GameStateModel from '../models/GameStateModel';
import mapMatrix from '../assets/mapMatrix.json';


const GameState = new GameStateModel();

GameState.initMap(mapMatrix, 800, 25);

// Export the instance to make it available to other components
export default GameState;