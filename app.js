import express from 'express';

const app = express();

// Template Engine
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static("public"));

const port = 3000;

app.get('/', (req, res) => {
    res.status(200).render('index', {
        pageName: 'index'
    });
});

app.get('/about', (req, res) => {
    res.status(200).render('about', {
        pageName: 'about'
    });
})

app.listen(port, () => {
    console.log(`App started on ${port} port`);
});
