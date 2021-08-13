import { Component } from "react";
// import { Button, Form, Modal } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";
// import axios from 'axios';

class UpdateForm extends Component {

  
    render() {


        return (
        <>
              <form onSubmit={(e) => this.props.handleUpdateBook(e)}>
                <fieldset className="bg-white">
                    <legend>Update Book Info</legend>
                    <label>Book Title</label>
                    <input type="text" name="title" defaultValue={this.props.title} />
                    <label>Book Description</label>
                    <input type="text" name="description" defaultValue={this.props.description} />
                    <label>Book Status</label>
                    <input type="text" name="status" defaultValue={this.props.status} />
                    <label>Book Image</label>
                    <input type="text" name="img_url" defaultValue={this.props.img_url} />
                    <input type="submit" value="Update" />
                </fieldset>
            </form>
        </>
        )
        }       
   }
export default withAuth0(UpdateForm);