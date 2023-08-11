import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import dotenv from 'dotenv';
dotenv.config();


import { pageRoute } from "./routes/pageRoute.js";

const app = express();


// Connect DB
await mongoose.connect(process.env.MONGODB_CONNECT_URI).then(() => {
    console.log('DB connected succesfully.');
});

app.set('view engine', 'ejs');


// MIDDLEWARES
app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
    session({
        secret: 'my_keyboard_cat',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_CONNECT_URI,
        }),
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})

const port = process.env.PORT;

// Routers

// Routers
app.use('/', pageRoute);

app.listen(port, () => {
    console.log(`App started on ${port} port`);
});