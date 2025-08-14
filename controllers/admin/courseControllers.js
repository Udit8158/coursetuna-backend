const Course = require("../../models/Course");

const createCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail, content, published } =
            req.body;

        // create a new course
        const newCourse = new Course({
            title,
            description,
            price,
            thumbnail,
        });
        await newCourse.save();

        return res.status(201).json({ success: true, data: newCourse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: error.message });
    }
};

const getCourse = async (req, res) => {
    console.log("hello")
    try {
        const courseId = req.params.id;
        console.log(courseId);

        // if a specific course needed
        if (courseId) {
            const foundCourse = await Course.findOne({ _id: courseId });
            if (!foundCourse)
                return res
                    .status(404)
                    .json({ success: false, data: "No course found" });

            return res.status(200).json({ success: true, data: foundCourse });
        } else {
            // if all course needed
            const courses = await Course.find({}); // get all the courses

            return res.status(200).json({ success: true, data: courses });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, data: error });
    }
};

const updateCourse = async (req, res) => {
    try {
        const { title, description, price, thumbnail, content, published } =
            req.body;

        const courseId = req.params.id;

        // find the course with the id
        const foundCourse = await Course.findOne({ _id: courseId });
        if (!foundCourse) {
            return res.status(404).json({ success: false, data: "No course found" });
        }

        // NOTE: This was a very good bug
        // console.log(req.body, published !== undefined && published !== null);

        // update the course
        foundCourse.title = title ? title : foundCourse.title;
        foundCourse.description = description
            ? description
            : foundCourse.description;
        foundCourse.price = price ? price : foundCourse.price;
        foundCourse.thumbnail = thumbnail ? thumbnail : foundCourse.thumbnail;
        foundCourse.content = content ? content : foundCourse.content;
        foundCourse.published =
            published !== null && published !== undefined
                ? published
                : foundCourse.published;

        await foundCourse.save();

        return res.status(200).json({ success: true, data: foundCourse });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;

        // this part is not need
        if (!courseId)
            return res
                .status(400)
                .json({ success: false, data: "Need to pass id as params" });

        const foundCourse = await Course.findById(courseId);

        // if no course found
        if (!foundCourse)
            return res.status(404).json({ success: false, data: "No course found" });

        // if the course is published - you can't delete it (first delist that then delete)
        if (foundCourse.published)
            return res.status(403).json({
                success: false,
                data: "This course is published, delist first then you can delete",
            });

        // if all okay now delete the course
        await foundCourse.deleteOne();

        return res
            .status(200)
            .json({ success: true, data: "Course deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, data: error.message });
    }
};

module.exports = { createCourse, getCourse, updateCourse, deleteCourse };
