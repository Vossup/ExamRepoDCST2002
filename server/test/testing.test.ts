// To test the api we have been using axios, which is a promise based http client for the browser and node.js
// And is also what i will be using here, the paths specified are the same ones i used in the api of the previous task
import axios from 'axios';
import { apiRouter, BookService, Book } from '../src/API';
import app from '../src/app';

// Sets the base URL
axios.defaults.baseURL = 'http://localhost:3001/api/v1';

// Before All starts the server on port 3001 for the testing purposes
let webServer: any;
beforeAll((done) => {
  // Start web server
  webServer = app.listen(3001, () => done());
});

// Resetsd test data before each test to make sure that the tests are independent of each other
// I here assume the database table for the books to be named Books and i stuck to the same id and title for the data corresponding to each book.
beforeEach((done) => {
  pool.query('TRUNCATE TABLE Books', (error) => {
    if (error) return done(error);

    // Insert test data
    BookService.createBook({ id: 1, title: 'Test book 1' })
      .then(() => BookService.createBook({ id: 2, title: 'Test book 2' }))
      .then(() => done())
  });
});

// Close web server after all tests are done
afterAll((done) => {
  if (!webServer) return done(new Error());
  webServer.close(() => pool.end(() => done()));
});

// Test for the post method
describe('POST /books', () => {
  test('should create a new book', (done) => {
    axios.post('/books', { id: 3, title: 'Test book 3' })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.data).toBe(3);
        done();
      })
      .catch((error) => done(error));
  });
  test('should return 400 if missing title', (done) => {
    axios.post('/books', { id: 3 })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.data).toBe('Missing title');
        done();
      })
      .catch((error) => done(error));
  });
  test('should return 400 if missing id', (done) => {
    axios.post('/books', { title: 'Test book 3' })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.data).toBe('Missing id');
        done();
      })
      .catch((error) => done(error));
  });
  // Should also test for the database error handling if this was a live codebase, but would require mocking the database service
});