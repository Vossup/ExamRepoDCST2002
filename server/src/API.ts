import express from 'express';

//test can be done with postman towards path localhost:3000/api/v1/<path>

const router = express.Router();

let tasks = [ { id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }, { id: 3, name: 'Task 3' } ];

router.get('/tasks', (_request, response) => {
  //send back a list of tasks
  response.send(tasks);
});

router.get('/tasks/:id', (request, response) => {
  let id = parseInt(request.params.id);
  let task = tasks.find((task) => task.id === id);
  if (task) {
    response.send(task);
  } else {
    response.status(404).send();
  }
});

router.post('/tasks', (request, response) => {
});

router.delete('/tasks/:id', (request, response) => {
});

export default router;
