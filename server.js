import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const PORT = process.env.PORT;

// SECTION View Routes
app.get('/', (req, res) => {
    res.send('<h1>Forever Homes 2.0</h1>');
});

// SECTION Server Start
app.listen(PORT, () => console.log(`Application listening on ${PORT}..`));