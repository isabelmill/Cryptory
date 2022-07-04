import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader.jsx';
import './assets/scss/styles.scss'
import { Home } from './pages/Home.jsx';
import { Data } from './pages/Data.jsx';
import { Stats } from './pages/Stats.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';

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
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

export default App;
