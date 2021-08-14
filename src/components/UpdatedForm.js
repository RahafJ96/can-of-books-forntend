import { Component } from "react";
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";
// import axios from 'axios';

class UpdateForm extends Component {


    render() {


        return (
            <>

                <Form onSubmit={(e) => this.props.handleUpdateBook(e)}>
                    <fieldset className="bg-white">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="text" name="title" defaultValue={this.props.img_url} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Book Description</Form.Label>
                            <Form.Control type="text" name="description" defaultValue={this.props.description} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="img_url" defaultValue={this.props.img_url} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Status</Form.Label>
                            <Form.Control type="text" name="status" defaultValue={this.props.status} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update</Button>
                    </fieldset>
                </Form>
            </>
        )
    }
}
export default withAuth0(UpdateForm);