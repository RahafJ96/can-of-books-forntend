import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import FormModal from './BookFormModal';
import { Button } from 'react-bootstrap';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      numberOfBooks: 0,
      displayAddModal: false
    };
  }
  componentDidMount = () => {

    const { user } = this.props.auth0;

    console.log('user:', user);

    axios.
      get(`http://localhost:3010/books?email=${user.email}`)
      .then(
        dataResults => {
          this.setState({

            books: dataResults.data

          });
          // let test=dataResults.data[0].books;
          console.log(dataResults.data);
          console.log(dataResults.data.books);
          // console.log(dataResults.data[0].books[0].title);
          // console.log(dataResults.data[0].books.title);

        })
      .catch(error => (error));
  }


  handleDisplayModal = () => {
    this.setState({ 
      displayAddModal: !this.state.displayAddModal 
    });
  }

  handleAddBookForm = (e) => {

    e.preventDefault();
    this.handleDisplayModal();

    const body = {
      email: this.props.auth0.user.email, // we are getting the email of the user from auth0
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
      img_url: e.target.img_url.value,
    };

    axios
    .post(`http://localhost:3010/addbooks`, body)
    .then(result => {
        console.log(result.data);
      // this.state.booksData.push(booksData.data);
      this.setState({
        books: result.data
      });
    })
    .catch(error => alert(error));
  }


  handleDeleteBook = (idx) => {
    const dataDelete ={
      email: this.state.email,
    }
console.log(idx);
    axios.delete(`http://localhost:3010/addbooks/${idx}`,body).then(res => {

      if (res.data.ok === 1) {
        const tempBookObj = this.state.booksData.filter(book => book._id !== bookId);
        this.setState({
          booksData: tempBookObj
        });
      }
    }).catch(error => alert(error))
  }

  render() {
    return (
      <div>
        <>
          <Button variant="secondary" onClick={() => this.handleDisplayModal()}>Add a book</Button>
          <FormModal
            show={this.state.displayAddModal}
            handleDisplayModal={this.handleDisplayModal}
            handleSubmitForm={this.handleAddBookForm}
          />

          < Carousel >
            {this.state.books.length &&
              this.state.books.map((value,idx) =>

                <Carousel.Item>
                  <img
                    className="d-block w-30"
                    style={{ height: '500px', width: '350px', marginLeft: "38%" }}
                    src={value.img_url}
                    alt="Book"
                  />
                  <Carousel.Caption key={idx} >
                    <h3 style={{ fontSize: '18px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{value.title}</h3>
                    <p style={{ fontSize: '12px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{value.description}</p>
                    <Button variant="secondary" onClick={() => this.handleDeleteBook(idx)}>Delete</Button>
                  </Carousel.Caption>
                </Carousel.Item>
              )}
          </Carousel >                        </>
      </div>
    )
  }
}

export default withAuth0(BestBooks);