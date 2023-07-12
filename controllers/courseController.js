import { Category } from '../models/Category.js';
import { Course } from '../models/Course.js';

const createCourse = async (req, res) => {

    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            course,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

const getAllCourses = async (req, res) => {

    try {
        // Getting query name
        const categorySlug = await req.query.categories;

        // Assign query to category
        const category = await Category.findOne({slug: categorySlug});

        // Initialize filter
        let filter = {};

        // If there is a query assign category id to filter
        if (categorySlug) {
            filter = {category: category._id};
        }

        const courses = await Course.find(filter);

        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            pageName: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

const getCourse = async (req, res) => {

    try {
        const course = await Course.findOne({slug: req.params.slug})
        res.status(200).render('course', {
            course,
            pageName: 'course',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

export { createCourse, getAllCourses, getCourse };