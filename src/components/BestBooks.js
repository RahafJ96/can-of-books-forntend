import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import { Jumbotron } from 'react-bootstrap';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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
    render() {
      return (
          <div>
              <>
                  < Carousel >
                      {this.state.books.length &&
                          this.state.books.map(value =>

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
                                  </Carousel.Caption>
                              </Carousel.Item>
                          )}
                  </Carousel >                        </>
          </div>
      )
  }
}

export default withAuth0(BestBooks);