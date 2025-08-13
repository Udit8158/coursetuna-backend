const Course = require("../../models/Course");
const User = require("../../models/User");

const getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (courseId) {
      const foundCourse = await Course.findOne({
        _id: courseId,
        published: true,
      }); // only show the published course
      if (!foundCourse)
        return res
          .status(404)
          .json({ success: false, data: "No course found with this id" });
      // we get the cours
      return res.status(200).json({ success: true, data: foundCourse });
    } else {
      // no id means -> get all courses
      // obv only published ones need to show the user
      const publishedCourses = await Course.find({ published: true });
      return res.status(200).json({ success: true, data: publishedCourses });
    }
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
};

const purchaseCourse = async (req, res) => {
  try {
    const user = req.headers.user;
    const courseId = req.params.id;

    console.log(user);
    const foundCourse = await Course.findOne({
      _id: courseId,
      published: true,
    });
    if (!foundCourse)
      return res.status(404).json({
        success: false,
        data: "No published course found with this id",
      });

    // purchase logic (add some card shit)
    // done
    const foundUser = await User.findById(user.id);

    if (foundUser.purchasedCourses.find( e => e === courseId)) {
      return res
        .status(400)
        .json({ success: false, json: "You have already purchased this" });
    }
    foundUser.purchasedCourses.push(courseId);
    await foundUser.save();

    return res.status(200).json({ success: true, data: "Purchase done" });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
};

module.exports = { getCourse, purchaseCourse };
