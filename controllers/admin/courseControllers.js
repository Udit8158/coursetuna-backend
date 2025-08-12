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
      content,
    });
    await newCourse.save();

    return res.status(201).json({ success: true, data: newCourse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, data: error });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}); // get all the courses
    return res.status(200).json({ success: true, data: courses });
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

    // update the course
    foundCourse.title = title ? title : foundCourse.title;
    foundCourse.description = description
      ? description
      : foundCourse.description;
    foundCourse.price = price ? price : foundCourse.price;
    foundCourse.thumbnail = thumbnail ? thumbnail : foundCourse.thumbnail;
    foundCourse.content = content ? content : foundCourse.content;
    foundCourse.published = published ? published : foundCourse.published;

    await foundCourse.save();

    return res.status(200).json({ success: true, data: "Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, data: error });
  }
};

module.exports = { createCourse, getAllCourses, updateCourse };
