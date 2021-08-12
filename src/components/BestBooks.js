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
      email:"",
      numberOfBooks: 0,
      displayAddModal: false,
      showUpdateFormflag: false,
      idx: -1
    };
  }
  componentDidMount = () => {

    const { user } = this.props.auth0;

    console.log('user:', user);

    axios.
      get(`${process.env.REACT_SERVER_URL}/books?email=${user.email}`)
      .then(
        dataResults => {
          this.setState({

            books: dataResults.data

          });
          // let test=dataResults.data[0].books;
          console.log('data',dataResults.data);
          // console.log(dataResults.data.books);
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
    .post(`${process.env.REACT_SERVER_URL}/books`, body)
    .then(result => {
        console.log('result data',result.data);
      // this.state.booksData.push(booksData.data);
      this.setState({
        books: result.data
      });
    })
    .catch(error => alert(error));
  }


  handleDeleteBook = (index) => {
    console.log('X');
    const {user}=this.props.auth0;
    const data ={
      email: user.email,
    }
    axios.delete(`${process.env.REACT_SERVER_URL}/books/${index}`,{params:data}).
    then(result => {

      this.setState({
        books: result.data
      })
      console.log('hello inside delete func',this.state.books);

    }).catch(error => alert(error))
  }

  showUpdateForm = (index) => {
    // show the update form
    this.setState({
      showUpdateFormflag : true,
      title : this.state.books[index].title,
      description : this.state.books[index].description,
      status: this.state.books[index].status,
      idx : index
    })
    
  }

  updateBook = (event) => {
    // send req to the server
    event.preventDefault();
    const updatedCatData = {
      catName : event.target.catName.value,
      catBreed: event.target.catBreed.value,
      ownerName: this.state.name
    }
    axios
    .put(`${this.state.server}/updateCat/${this.state.idx}`,updatedCatData)
    .then(result =>{
      // console.log(result.data);
      this.setState({
        cats : result.data
      })
    })
    .catch(err => {
      console.log(err);
    })
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
                  <Carousel.Caption  >
                    <h3 style={{ fontSize: '18px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{value.title}</h3>
                    <p style={{ fontSize: '12px', backgroundColor: "#333", width: "34%", textAlign: 'center', marginLeft: "34%" }}>{value.description}</p>
                   <div key={idx}>
                    <Button variant="secondary" onClick={() => this.handleDeleteBook(idx)}>Delete</Button>
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              )}
          </Carousel >                       
          </>
      </div>
    )
  }
}

export default withAuth0(BestBooks);