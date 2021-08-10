import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
    };
    // console.log(booksData);
  }
  componentDidMount() {
    this.setState({
      loading: true,

    });
    this.getData();
  }
  getData = async () => {
    const  user  = this.props.auth0;
    try {

      const url = `http://localhost:3010/books?email=${user.email}`;
      const bookUser = await axios.get(url);
      this.setState({
        booksData: bookUser.data[0],
      });

    } catch (err) {
      
    }

  }
  render() {


    return (
      <>
        <h1 className="text-center text-white">Best Books</h1>
        <p className="text-center" style={{ backgroundColor: 'white', }} >Here you can find all your favorite Books</p>

        <Carousel>
          {this.state.booksData.map((book, idx) => {

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{this.state.title}</h3>
                <p>{this.state.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          })}
        </Carousel>

      </>
    )
  }
}

export default BestBooks