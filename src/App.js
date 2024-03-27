import logo from './logo.svg';
import './App.css';
import { GameProvider } from './state/GameContext';
import { GameContent } from './Components/GameContent/GameContent'; 
import { GameUi } from './Components/GameUi/GameUi';

function App() {
  return (
    <GameProvider>
      <GameUi />
      <GameContent />
    </GameProvider>
  );
}

export default App;
