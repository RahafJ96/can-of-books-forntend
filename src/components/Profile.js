import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import {Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

class Profile extends Component {

  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log(isAuthenticated);
    return(
        <>
            { isAuthenticated && 
            <Card className="w-50 m-3">
              <Card.Header>
                <Card.Text>User Profile Info.</Card.Text>
              </Card.Header>
              <Card.Body className="d-flex">
                <Card.Img 
                   src={user.picture}
                   alt={user.name}
                   className="rounded-circle"
                   style={{height: '10rem', width: '10rem'}}
                   />
                <Card.Body className="d-flex flex-column justify-content-center align-items-start w-50">
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>Name: {user.name}</Card.Text>
                </Card.Body>
              </Card.Body>
            </Card>
            }
        </>
    );
  }
}

export default withAuth0(Profile);
