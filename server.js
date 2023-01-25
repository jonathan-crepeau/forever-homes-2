import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import session from 'express-session';
import MongoStore from 'connect-mongo';
const PORT = process.env.PORT;

import {router as viewsRouter} from './routes/views.js';
import {router as authRouter} from './routes/auth.js';
import {router as petfinderRouter} from './routes/petfinder.js';
import {logger} from './middleware/utils.js';


// SECTION Serve Public Directory Client-Side
app.use(express.static('public'));

// SECTION - Middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// SECTION Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://jonathan-crepeau:my-password@forever2cluster.8vrm9tr.mongodb.net/foreverhomes2?retryWrites=true&w=majority"
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}));

// SECTION View Routes
app.use('/', viewsRouter);

// SECTION API Endpoint Routes
app.use('/api/v1', authRouter);

// SECTION Petfinder API
app.use('/petfinder/v1', petfinderRouter);

// SECTION Server Start
app.listen(PORT, () => console.log(`Application listening on ${PORT}..`));