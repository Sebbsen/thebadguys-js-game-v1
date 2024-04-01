import logo from './logo.svg';
import './App.css';
import { GameContent } from './Components/GameContent/GameContent'; 
import { GameUi } from './Components/GameUi/GameUi';

function App() {
  return (
    <div>
      <GameUi />
      <GameContent />
    </div>
  );
}

export default App;
