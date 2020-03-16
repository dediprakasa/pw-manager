import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import TheNavbar from './components/TheNavbar'
import Login from './containers/Login'
import Register from './containers/Register'
import Home from './containers/Home'
import './configs/firebaseConfig'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './containers/LandingPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <TheNavbar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <Route path="/" >
              <LandingPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
