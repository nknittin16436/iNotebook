
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      typ:type
    })
 
    setTimeout(()=>{
      setAlert(null);
    },4000)
  }
  return (
    <>
    <NoteState>
      
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className='container'> 
        <Switch>
        <Route exact path="/" element={ <Home showAlert={showAlert}/> } />
        <Route exact path="about" element={ <About/> } />
        <Route exact path="home" element={ <Home showAlert={showAlert}/> } />
        <Route exact path="login" element={ <Login showAlert={showAlert}/> } />
        <Route exact path="signup" element={ <Signup showAlert={showAlert}/> } />
        </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
