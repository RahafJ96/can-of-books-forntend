import { Component } from "react"
import { withAuth0 } from '@auth0/auth0-react';
import { Button } from "react-bootstrap";




class AddBook extends Component {


    render() {
        return (
            <Button variant="secondary" size="lg"> Add Book</Button>

        )
    }


}



export default AddBook;
