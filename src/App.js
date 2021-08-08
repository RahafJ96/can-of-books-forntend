import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Login from './components/Login';
import Profile from './components/Profile';
import Logout from './components/Logout';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <h1>Auth0 App</h1>
            <Switch>
              <Route exact path="/">
                <Login/>
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                <Profile/>
                <Logout/>
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default App;
