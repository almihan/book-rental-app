import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
class BooksTable extends Component {
  columns = [
    { col: 'title', label: 'Title' },
    { col: 'genre.name', label: 'Genre' },
    { col: 'numberInStock', label: 'Stock' },
    { col: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (book) => (
        <Like liked={book.liked} onClick={() => this.props.onLike(book)} />
      ),
    },
    {
      key: 'delete',
      content: (book) => (
        <button
          onClick={() => this.props.onDelete(book._id)}
          className='btn btn-danger btn-sm'
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { books, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={books}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BooksTable;
