import logo from './logo.svg';
import './App.css';
import Rhythm from './components/rhythm/Rhythm';
import {HashRouter , Route} from 'react-router-dom'

import Dance from './components/dance/Dance';

function App() {
  return (
    <HashRouter>
      <Route path='/' exact component={Rhythm} />
      <Route path='/rhythm' component={Rhythm} />
      <Route path='/dance' component={Dance} />
    </HashRouter>
  );
}

export default App;
