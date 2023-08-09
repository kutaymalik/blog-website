import express from "express";
import { createCourse, enrollCourse, getAllCourses, getCourse, releaseCourse } from '../controllers/courseController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const courseRoute = express.Router();

courseRoute.route('/').post(roleMiddleware(["teacher", "admin"]), createCourse);
courseRoute.route('/').get(getAllCourses);
courseRoute.route('/:slug').get(getCourse)
courseRoute.route('/enroll').post(enrollCourse);
courseRoute.route('/release').post(releaseCourse);

export { courseRoute };