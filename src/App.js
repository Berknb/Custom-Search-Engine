import {Route,Routes} from 'react-router-dom'
import Results from './pages/Results';
import Home from './pages/Home';

function App() {
  
  return (
    
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Results' element={<Results/>}></Route> 
      </Routes>
      
  );
}

export default App;
