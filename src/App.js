import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import { LanguageProvider } from './components/LanguageContext/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
