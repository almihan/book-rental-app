import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getBooks } from '../services/bookService';
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import GenresGroup from './common/genresGroup';
import BooksTable from './booksTable';
import SearchBox from './searchBox';

import _ from 'lodash';

class Books extends Component {
  state = {
    books: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { col: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({ books: getBooks(), genres });
  }

  handleDelete = (bookID) => {
    const books = this.state.books.filter((book) => book._id !== bookID);
    this.setState({ books });
  };

  handleLike = (book) => {
    const books = [...this.state.books];
    const index = books.indexOf(book);
    books[index] = { ...books[index] };
    books[index].liked = !books[index].liked;
    this.setState({ books });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    let filtered = this.state.books;
    if (this.state.searchQuery)
      filtered = this.state.books.filter((book) =>
        book.title
          .toLowerCase()
          .startsWith(this.state.searchQuery.toLowerCase())
      );
    else if (this.state.selectedGenre && this.state.selectedGenre._id)
      filtered = this.state.books.filter(
        (book) => book.genre._id === this.state.selectedGenre._id
      );

    const sorted = _.orderBy(
      filtered,
      [this.state.sortColumn.col],
      [this.state.sortColumn.order]
    );

    const books = paginate(sorted, this.state.currentPage, this.state.pageSize);

    return { totalCount: filtered.length, data: books };
  };

  render() {
    if (this.state.books.length === 0)
      return <h1>There is no books in the database!</h1>;
    const { totalCount, data: books } = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-3'>
          <GenresGroup
            items={this.state.genres}
            onItemSeltect={this.handleGenreSelect}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className='col'>
          <Link className='btn btn-primary mb-4' to='books/add'>
            Add Book
          </Link>
          <h1>showing {totalCount} books in the database</h1>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <BooksTable
            books={books}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Books;
