import logo from './logo.svg';
import './App.css';
import Rhythm from './components/rhythm/Rhythm';
import {HashRouter , Route} from 'react-router-dom'

import Dance from './components/dance/Dance';
import Report from './components/report/Report';

function App() {
  return (
    <HashRouter>
      <Route path='/' exact component={Rhythm} />
      <Route path='/rhythm' component={Rhythm} />
      <Route path='/dance' component={Dance} />
      <Route path='/report' component={Report} />
    </HashRouter>
  );
}

export default App;
