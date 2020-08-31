import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getBook, saveBook } from '../services/bookService';

class BookForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate'),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
    const bookId = this.props.match.params.id;
    if (bookId === 'add') return;
    const book = getBook(bookId);
    if (!book) return this.props.history.replace('/notFound');
    this.setState({ data: this.mapToViewModel(book) });
  }
  mapToViewModel(book) {
    console.log(book._id);
    return {
      _id: book._id,
      title: book.title,
      genreId: book.genre._id,
      numberInStock: book.numberInStock,
      dailyRentalRate: book.dailyRentalRate,
    };
  }
  doSubmit = () => {
    saveBook(this.state.data);
    this.props.history.push('/books');
  };
  render() {
    return (
      <div>
        <h1>BookForm </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default BookForm;
