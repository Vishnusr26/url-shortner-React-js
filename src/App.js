import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar';
import AddUrl from './components/UrlManager/AddUrl';
import UrlList from './components/UrlManager/UrlList';
//import SearchBar from './components/Searchbar';
import Home from './components/home';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='App'>
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/add-url">
          {user ? <AddUrl /> : <Redirect to="/login" />}
        </Route>
        <Route path="/urls">
          {user ? <UrlList /> : <Redirect to="/login" />}
        </Route>
        {/* <Route path="/search">
          {user ? <SearchBar /> : <Redirect to="/login" />}
        </Route> */}
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
