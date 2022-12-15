import express from 'express';
import { apiRouter } from './API';

/**
 * Express application.
 */
const app = express();

app.use(express.json());

app.use('/api/v1', apiRouter);

export default app;
