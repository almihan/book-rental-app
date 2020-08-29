import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Books from './components/books';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import BookForm from './components/bookForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path='/register' component={RegisterForm}></Route>
            <Route path='/login' component={LoginForm}></Route>
            <Route path='/books/:id' component={BookForm}></Route>
            <Route path='/books' component={Books}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/notFound' component={NotFound}></Route>
            <Redirect from='/' exact to='/books' />
            <Redirect to='/notFound' />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
