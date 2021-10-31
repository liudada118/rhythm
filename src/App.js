import logo from './logo.svg';
import './App.css';
import Rhythm from './components/rhythm/Rhythm';
import {HashRouter , Route} from 'react-router-dom'
import Home from './components/home/Home';
import Test from './components/test/Test';
import Test1 from './components/test/Test1';
import Test2 from './components/test/Test2';
import Test3 from './components/test/Test3';
import Dance from './components/dance/Dance';
import Editor from './components/editor/Editor';
import Test4 from './components/test/Test4';
function App() {
  return (
    <HashRouter>
      <Route path='/' exact component={Home} />
      <Route path='/rhythm' component={Rhythm} />
      <Route path='/test1' component={Test1} />
      <Route path='/test2' component={Test2} />
      <Route path='/test3' component={Test3} />
      <Route path='/test4' component={Test4} />
      <Route path='/dance' component={Dance} />
      <Route path='/edit' component={Editor} />
    </HashRouter>
  );
}

export default App;
