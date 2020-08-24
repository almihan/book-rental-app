import React, { Component } from 'react';
import { getBooks } from '../services/bookService';

class Books extends Component {
  state = {
    books: getBooks(),
  };

  handleDelete = (bookID) => {
    const books = this.state.books.filter((book) => book._id !== bookID);
    this.setState({ books });
  };

  render() {
    if (this.state.books.length === 0)
      return <h1>There is no books in the database!</h1>;
    return (
      <React.Fragment>
        <h1>showing {this.state.books.length} books in the database</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genere</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.genre.name}</td>
                <td>{book.numberInStock}</td>
                <td>{book.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(book._id)}
                    className='btn btn-danger btn-sm'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default Books;
