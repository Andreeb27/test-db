import './App.css';

//different screens
import Login from './Login';
import Main from './Main';
import Home from './Home';
import Register from './Register';
import UserConfig from './UserConfig';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function App() {

  return (

    <div className='App'>

      <BrowserRouter>

        <nav>
          <h1>Insert Clever Project Name Here</h1>
          <Link to='/'> Home </Link>
          <Link to='/login'> Login </Link>
          <Link to='/main'> Main </Link>
          <Link to='/register'> Register </Link>
          <Link to='/userconfig'>User Config</Link> 
        </nav>

        <Routes>
          <Route path = '/' element = { <Home /> }/>
          <Route path = '/login' element = { <Login /> } />
          <Route path = '/main' element = { <Main />} />
          <Route path = '/register' element = { <Register /> } />
          <Route path = '/userconfig' element = { < UserConfig /> } />
        </Routes>
        
      </BrowserRouter>

    </div>

  );
}

export default App;
