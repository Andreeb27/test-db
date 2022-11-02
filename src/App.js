import './App.css';

//different screens
import Login from './Login';
import Main from './Main';
import Home from './Home';
import Register from './Register';
import Admin from './Admin'

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

function App() {

  return (

    <div className='App'>

      <BrowserRouter>

        <nav>
          <h1>Sample Text</h1>
          <Link to='/'> Home </Link>
          <Link to='/login'> Login </Link>
          <Link to='/main'> Main </Link>
          <Link to='/register'> Register </Link>
          <Link to='/admin'> Admin </Link>
        </nav>

        <Routes>
          <Route path = '/' element = { <Home /> }/>
          <Route path = '/login' element = { <Login /> } />
          <Route path = '/main' element = { <Main />} />
          <Route path = '/register' element = { <Register /> } />
          <Route path = '/admin' element = { <Admin /> } />
        </Routes>
        
      </BrowserRouter>

    </div>

  );
}

export default App;
