import express from "express";
import * as pageController from '../controllers/pageController.js';

const pageRoute = express.Router();

pageRoute.route('/').get(pageController.getIndexPage);
pageRoute.route('/about').get(pageController.getAboutPage);

export { pageRoute };