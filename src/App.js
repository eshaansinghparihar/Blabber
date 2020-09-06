import React, { useState, useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect ,BrowserRouter} from 'react-router-dom';
import * as firebase from 'firebase';
import firebaseConfig from './config';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/HomeComponent';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
function App() {
  const [user,setUser]=useState({});
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      setUser(user);
  })
  });
  return (
    <BrowserRouter>
    <div className="App">
     {user?
     <div>
     <Switch>
        <Route exact path="/profile" >
          {/* <Profile/> */}
        </Route>
        <Route path='/' >
          <Home/>
        </Route>
        <Redirect to="/" />
     </Switch>
     </div>
     :
    
        <Switch>
        <Route exact path="/signup" >
          <Signup/>
        </Route>        
        <Route path='/'>
          <Signin/>
        </Route>
        <Redirect to="/" />
        </Switch>
     }
    </div>
    </BrowserRouter>
  );
}

export default App;
