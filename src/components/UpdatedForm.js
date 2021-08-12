import { Component } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

class UpdateForm extends Component {

    updateSubmitHandler = (event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const status = event.target.status.value;
        const userEmail= this.props.user.email;

        this.props.closeModel();

        const data={
            title : title,
            description : description,
            status : status,
            userEmail : userEmail
        }
            axios
              .put(`${process.env.REACT_APP_SERVER_URL}/books/${this.props.index}`, data )
              .then(result => {this.props.updateBooks(result.data);}
              )
              .catch((err) => { console.log(err);});
                  
    }
    render() {


        return (
        <>
            <Modal show={this.props.show} onHide={this.props.handleDisplayModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Update Book
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={(e) => this.props.handleSubmitForm(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control name="title" type="text" placeholder="Enter the book title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control name="description" type="text" placeholder="Enter the book description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Status</Form.Label>
                                <Form.Control name="status" type="text" placeholder="Enter the book status" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Book Image</Form.Label>
                                <Form.Control name="img_url" type="text" placeholder="Enter the image URL" />
                            </Form.Group>

                        <Form.Control as="select" name="status" defaultValue ={this.props.status}>
                            <option value="recomended">RECOMENDED TO ME</option>
                            <option value="top five" >TOP FIVE</option>
                            <option value="favorite one" >FAVORITE ONE</option>
                        </Form.Control>
                        <Button variant="secondary" onClick={this.props.handleDisplayModal}>Add</Button>
                    </Form>
                </Modal.Body>
            </Modal>


        </>
        )



    }







}
export default withAuth0(UpdateForm);