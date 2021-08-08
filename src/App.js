import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';
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
        <Router>
          <IsLoadingAndError>
            <Header />
            <h1>Welcome</h1>
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                { 
                (this.props.auth0.isAuthenticated && 
                  <>
                  <BestBooks/>
                <Logout />
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
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
