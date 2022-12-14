import express from 'express';

//test can be done with postman towards path localhost:3000/api/v2/<path>

const router = express.Router();

let tasks = [ { id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }, { id: 3, name: 'Task 3' } ];

router.get('/tasks', (_request, response) => {
  //send back a list of tasks
  response.send(tasks);
});

router.get('/tasks/:id', (request, response) => {
});

router.post('/tasks', (request, response) => {
});

router.delete('/tasks/:id', (request, response) => {
});

export default router;
