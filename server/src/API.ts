import express from 'express';

// test can be done with postman towards path localhost:3000/api/v1/<path>
// due to base path being set to /api/v1 in server.ts
const router = express.Router();

// We assume we have access to a database service-file called BookService with the following methods:
// getBook():
// deleteBook(id: number):
// createBook(book: Book)

// Though not stated in the original task i have also included the functions for updating and getting all books due to this being reasonable to assume.
// getBooks():
// updateBook(book: Book)

// Book Type and BookService class would be something close to the following, but i have not included the actual implementation of the methods.
// the following lines are just for illustration purposes and clarity for me while working with the code
type Book = {
  id: number;
  title: string;
}
class BookService{
  static getBooks(): Promise<Book[]>{
    return Promise.resolve([]);
  }

  static getBook(id: number): Promise<Book>{
    return Promise.resolve({id: 0, title: ''});
  }

  static deleteBook(id: number): Promise<void>{
    return Promise.resolve();
  }

  static createBook(book: Book): Promise<number>{
    return Promise.resolve(1); // id/insert id for the created book
  }

  static updateBook(book: Book): Promise<void>{
    return Promise.resolve();
  }
}

// Implementation of the API starts here.

// /api/v1/books for getting all books where the book list can be empty
router.get('/books', (_request, response) => {
  BookService.getBooks()
    .then((books) => {response.send(books);})
    .catch((error) => {response.status(500).send('Something went wrong');});
});

// .api/v1/books/:id for getting a single book based on id, error handling would be done in combination with the service class in the case where the book is not found.
router.get('/books/:id', (request, response) => {
  let id = Number(request.params.id);
  BookService.getBook(id)
    .then((book) => {response.send(book);})
    .catch((error) => {response.status(500).send('Something went wrong');});
});

// /api/v1/books for creating a new book
router.post('/books', (request, response) => {
  let data = request.body;
  if(!data){
    response.status(400).send('Missing data');
  }
  if(!data.title){
    response.status(400).send('Missing title');
  }
  if(!data.id){
    response.status(400).send('Missing id');
  }
  BookService.createBook(data)
    .then((id) => {response.status(200).send(id)})
    .catch((error) => {response.status(500).send('Something went wrong');
  });
});

router.delete('/books/:id', (request, response) => {
  let id = Number(request.params.id);
  BookService.deleteBook(id).then(() => {
    response.status(200).send();
  }).catch((error) => {
    response.status(500).send('Something went wrong');
  });
});

export { router as apiRouter, BookService, Book};
