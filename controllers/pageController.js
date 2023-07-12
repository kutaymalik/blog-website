import express from 'express';

const getAboutPage = (req, res) => {
    res.status(200).render('about', {
        pageName: 'about',
    });
};

const getIndexPage = (req, res) => {
    res.status(200).render('index', {
        pageName: 'index',
    });
};

export { getAboutPage, getIndexPage };
