import './App.css';
import React,{ Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import  Login  from './components/auth/Login';
import  Register  from './components/auth/Register';
import Alert from './components/layouts/Alert';

//redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth'
import setToken from './utils/setToken';

if(localStorage.token)
 {
   setToken(localStorage.token);
 }
const App= ()=> {

  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  
  return(
  <Provider store={store}>

  <Router>
    <Fragment>
     <Navbar/>
     <Route exact path = '/' component = {Landing} />
     <section className="container">
       <Alert/>
      <Switch>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
     </section>
   </Fragment>    
  </Router>

  </Provider>
  
   
)
  }
export default App;
