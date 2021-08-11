import React from 'react';
import Header from './Header';
import './App.css';
import IsLoadingAndError from './IsLoadingAndError';
import Login from './components/Login';
import Profile from './components/Profile';
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './components/BestBooks';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  };


  render() {
    // const  show  = false;
    // console.log('app', this.props.auth0);

    return (
      <>
      <section>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
            
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                { 
                (this.props.auth0.isAuthenticated && 
                  <>
                  <BestBooks/>
                  {/* <AddBook/> */}
                {/* <Logout /> */}
                    </>
                )}
                {!this.props.auth0.isAuthenticated && (
                  <>
                  <Login/>
                    </>
                )}
                </Route>

              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path="/profile">
                {this.props.auth0.isAuthenticated && (
                  <>
                  <Profile/>
                  </>
                )}

              </Route>
            </Switch>
          </IsLoadingAndError>
        </Router>
        </section>
            <Footer />
      </>
    );
  }
}

export default withAuth0(App);
