import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import FormModal from './BookFormModal';
import { Button } from 'react-bootstrap';
import UpdatedForm from './UpdatedForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      email: "",
      numberOfBooks: 0,
      displayAddModal: false,
      showUpdateFormflag: false,
      idx: -1
    };
  }
  componentDidMount = () => {

    const { user } = this.props.auth0;

    console.log('user:', user);

    axios.get(`http://localhost:3010/books?email=${user.email}`).then(
        dataResults => {
          this.setState({

            books: dataResults.data

          });
          // let test=dataResults.data[0].books;
          console.log('data', dataResults.data);
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
      .post(`http://localhost:3010/books`, body)
      .then(result => {
        console.log('result data', result.data);
        // this.state.booksData.push(booksData.data);
        this.setState({
          books: result.data
        });
      })
      .catch(error => alert(error));
  }


  handleDeleteBook = (index) => {
    console.log('X');
    const { user } = this.props.auth0;
    const data = {
      email: user.email,
    }
    axios.delete(`http://localhost:3010/dbooks/${index}`, { params: data }).then(result => {

        this.setState({
          books: result.data
        })
        console.log('hello inside delete func', this.state.books);

      }).catch(error => alert(error))

  }

  showUpdateForm = (index) => {
    // show the update form
    this.setState({
      showUpdateFormflag: true,
      title: this.state.books[index].title,
      description: this.state.books[index].description,
      status: this.state.books[index].status,
      idx: index
    })
    console.log('index',index);

  }

  handleUpdateBook = (e) => {
    // send req to the server
    e.preventDefault();
    const updatedBookData = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
      img_url: e.target.img_url.value,
      email: this.state.email
    }
    axios
    .put(`http://localhost:3010/ubooks/${this.state.idx}`, updatedBookData)
    .then(result => {
      // console.log(result.data);
      // this.setState({
        //   books: result.data
        // })
        this.state.books(result.data);
      })
      .catch(error => alert(error))
      console.log('Inside update button');
  }

  render() {
    return (
      <div>
        <>
          <Button variant="primary" className="btnAdd" onClick={() => this.handleDisplayModal()}>Add a book</Button>
          <FormModal
            show={this.state.displayAddModal}
            handleDisplayModal={this.handleDisplayModal}
            handleSubmitForm={this.handleAddBookForm}
          />
          {this.state.showUpdateFormflag &&
            <UpdatedForm
              handleUpdateBook={this.handleUpdateBook}
              title={this.state.title}
              description={this.state.description}
              status={this.state.status}
              img_url={this.state.img_url}

            />
          }

          < Carousel >
            {this.state.books.length &&
              this.state.books.map((value, idx) =>

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
                      <Button variant="danger" onClick={() => this.handleDeleteBook(idx)}>Delete</Button>
                      <Button variant="success" onClick={() => this.showUpdateForm(idx)}>Update</Button>
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