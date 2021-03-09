import './App.css';
import { DataProvider } from './DataLayer';
import Footer from './Footer';
import Game from './Game';
import Header  from './Header.js';
import reducer, { initialState } from './reducer';

function App() {
  return (
    <DataProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        <Header />
        <Footer />
        <Game />
      </div>
    </DataProvider>
  );
}

export default App;
