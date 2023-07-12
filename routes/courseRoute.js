import express from "express";
import { createCourse, getAllCourses, getCourse } from '../controllers/courseController.js'

const courseRoute = express.Router();

courseRoute.route('/').post(createCourse);
courseRoute.route('/').get(getAllCourses);
courseRoute.route('/:slug').get(getCourse)

export { courseRoute };