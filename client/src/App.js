import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layouts/Alert';
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExpereince from './components/profile-forms/AddExpereince';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';

//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth'
import setToken from './utils/setToken';

if (localStorage.token) {
  setToken(localStorage.token);
}
const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>

      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profiles" component={Profiles}></Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
              <PrivateRoute exact path="/edit-profile" component={EditProfile}></PrivateRoute>
              <PrivateRoute exact path="/add-experience" component={AddExpereince}></PrivateRoute>
              <PrivateRoute exact path="/add-education" component={AddEducation}></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>

    </Provider>


  )
}
export default App;
