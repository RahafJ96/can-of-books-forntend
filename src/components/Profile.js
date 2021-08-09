import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card,Button } from 'react-bootstrap';
import '../App.css';



class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <>
                {
                    isAuthenticated &&
                    <>
                        <Card className='cardProfile' style={{ width: '15rem' }}>
                            <Card.Img className="justify-content-center" variant="top" src={user.picture}alt="profile" style={{ width: '15rem' }}/>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>
                        <div className="icon icon-shape icon-shape-dark rounded-circle mb-4">
                            <i className="fa fa-university" />
                          </div>
                                    Welcome {user.name}! 
                                    Your email: {user.email}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        
                    </>
                }
            </>
        );
    }
}

export default withAuth0(Profile);

