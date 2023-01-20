import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const PORT = process.env.PORT;

import {router as viewsRouter} from './routes/views';


// SECTION Serve Public Directory Client-Side
app.use(express.static('public'));

// SECTION - Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// SECTION View Routes
app.use('/', viewsRouter);

// SECTION Server Start
app.listen(PORT, () => console.log(`Application listening on ${PORT}..`));