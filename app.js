import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { pageRoute } from './routes/pageRoute.js';
import { courseRoute } from './routes/courseRoute.js';
import { categoryRoute } from './routes/categoryRoute.js';

const app = express();

// Connect DB
await mongoose.connect('mongodb://127.0.0.1/smartedu-db').then(() => {
    console.log('DB connected succesfully.');
});

// Template Engine
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3000;

// Routers
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);

app.listen(port, () => {
    console.log(`App started on ${port} port`);
});