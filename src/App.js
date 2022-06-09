// import { Redirect } from 'react-router-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx';
import './assets/scss/styles.scss'
import { Home } from './pages/Home.jsx';
import { Data } from './pages/Data.jsx';
import { Stats } from './pages/Stats.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/data' element={<Data />} />
            <Route path='/stats' element={<Stats />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
