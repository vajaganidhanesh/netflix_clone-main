import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'

// custom components for routing...
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import Protect from './components/Protect';
import Player from './components/Player';
import Notfound from './components/Notfound'

function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route path='/register' element={<Register/>}/>
          <Route path='/homepage' element={
            <Protect>
              <HomePage/>
            </Protect>
          }/>

          <Route path='/player/:id' element={
            <Protect>
              <Player/>
            </Protect>
          }/>
          
          <Route path='*' element={<Notfound/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
