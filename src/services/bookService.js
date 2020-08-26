import * as genresAPI from './genreService';

const books = [
  {
    _id: '3e454r456789ti0984r43476',
    title: 'Pride and Prejudice',
    genre: { _id: '3er45tr456yu787655gt5678', name: 'Romance' },
    numberInStock: 7,
    dailyRentalRate: 1.5,
    publishDate: '2020-01-03T19:04:28.809Z',
    liked: true,
  },
  {
    _id: '3e454r456789ti0984r43477',
    title: 'Jane Eyre',
    genre: { _id: '3er45tr456yu787655gt5678', name: 'Romance' },
    numberInStock: 3,
    dailyRentalRate: 2.5,
  },
  {
    _id: '3e454r456789ti0984r43478',
    title: 'The Stand',
    genre: { _id: '54e3456yh67u787gt56y6787', name: 'Horror' },
    numberInStock: 5,
    dailyRentalRate: 2.0,
  },
  {
    _id: '3e454r456789ti0984r43479',
    title: 'Bossypants',
    genre: { _id: '123edr4567y8i98975t654h7', name: 'Comedy' },
    numberInStock: 2,
    dailyRentalRate: 3.5,
  },
  {
    _id: '3e454r456789ti0984r43480',
    title: 'Yes Please',
    genre: { _id: '123edr4567y8i98975t654h7', name: 'Comedy' },
    numberInStock: 8,
    dailyRentalRate: 3.5,
  },
  {
    _id: '3e454r456789ti0984r43481',
    title: 'Good Omens',
    genre: { _id: '123edr4567y8i98975t654h7', name: 'Comedy' },
    numberInStock: 6,
    dailyRentalRate: 3.5,
  },
  {
    _id: '3e454r456789ti0984r43482',
    title: 'It',
    genre: { _id: '54e3456yh67u787gt56y6787', name: 'Horror' },
    numberInStock: 5,
    dailyRentalRate: 4.5,
  },
  {
    _id: '3e454r456789ti0984r43483',
    title: 'Bird Box',
    genre: { _id: '54e3456yh67u787gt56y6787', name: 'Horror' },
    numberInStock: 4,
    dailyRentalRate: 3.5,
    liked: true,
  },
  {
    _id: '3e454r456789ti0984r43484',
    title: 'Outlander',
    genre: { _id: '3er45tr456yu787655gt5678', name: 'Romance' },
    numberInStock: 2,
    dailyRentalRate: 3.5,
  },
];

export function getBooks() {
  return books;
}

export function getBook(id) {
  return books.find((m) => m._id === id);
}

export function saveBook(book) {
  let bookInDb = books.find((m) => m._id === book._id) || {};
  bookInDb.name = book.name;
  bookInDb.genre = genresAPI.genres.find((g) => g._id === book.genreId);
  bookInDb.numberInStock = book.numberInStock;
  bookInDb.dailyRentalRate = book.dailyRentalRate;

  if (!bookInDb._id) {
    bookInDb._id = Date.now();
    books.push(bookInDb);
  }

  return bookInDb;
}

export function deleteBook(id) {
  let bookInDb = books.find((m) => m._id === id);
  books.splice(books.indexOf(bookInDb), 1);
  return bookInDb;
}
