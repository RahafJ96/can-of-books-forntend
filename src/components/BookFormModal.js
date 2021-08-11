import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

class FormModal extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handleDisplayModal}>
                    <Modal.Header>
                        <Modal.Title>Add Book Form</Modal.Title>
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
                            <Button variant="primary" type="submit">
                                Add Book
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleDisplayModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default FormModal