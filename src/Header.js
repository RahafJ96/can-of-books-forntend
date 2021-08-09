import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Container,Collapse} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './Header.css';
import Logout from './components/Logout';

class Header extends React.Component {
  render() {
    return(
<Container fluid>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Favorite Books</Navbar.Brand>
      <Navbar.Collapse className="me-auto" className="justify-content-end">
      <Nav.Link ><Link to="/">HOME</Link></Nav.Link>
      <Nav.Link ><Link to="/profile">PROFILE</Link></Nav.Link>
    </Navbar.Collapse >
        
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
        <Link><Logout/></Link>
      </Navbar>
    </Container>
    );
  }
}

export default Header;
