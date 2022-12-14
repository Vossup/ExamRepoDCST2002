import express from 'express';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/tasks', (_request, response) => {
});

router.get('/tasks/:id', (request, response) => {
});

router.post('/tasks', (request, response) => {
});

router.delete('/tasks/:id', (request, response) => {
});

export default router;
