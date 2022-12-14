import express from 'express';
import taskRouter from './API';

/**
 * Express application.
 */
const app = express();

app.use(express.json());

app.use('/api/v1', taskRouter);

export default app;
