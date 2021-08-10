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
   componentDidMount = async () => {

    const  {user} = this.props.auth0;

    console.log('user:',user);

    await axios.
    get(`http://localhost:3010/books?email=${user.email}`)
    .then(
      dataResults => {
      this.setState ({

        booksData:dataResults.data[0].books

      });
      // let test=dataResults.data[0].books;
      console.log(dataResults.data[0]);
      console.log(dataResults.data[0].books);
      // console.log(dataResults.data[0].books[0].title);
      // console.log(dataResults.data[0].books.title);

    })
    .catch(error => (error));
  }
  render() {
    
    
    return (
      <>
        <h1 className="text-center text-white">Best Books</h1>
        <p className="text-center" style={{ backgroundColor: 'white', }} >Here you can find all your favorite Books</p>

        <Carousel>
     { console.log(this.state.booksData)}
          {this.state.booksData.map((element,i) => {
            <Carousel.Item key={i}>

            <>
            
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                alt="First slide"
                />
              <Carousel.Caption>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
              </Carousel.Caption>
              </>
            </Carousel.Item>
            })}
              </Carousel>


      </>
    )
  }
}

export default withAuth0(BestBooks);


 // componentDidMount() {
  //   this.setState({
  //     loading: true,

  //   });
  //   this.getData();
  // }
  // getData = async () => {
  //   const  user  = this.props.auth0;
  //   try {

  //     const url = `http://localhost:3010/books?email=${user.email}`;
  //     const bookUser = await axios.get(url);
  //     this.setState({
  //       booksData: bookUser.data[0],
  //     });

  //   } catch (err) {

  //   }

  // }