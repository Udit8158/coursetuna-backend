const Course = require("../../models/Course");
const User = require("../../models/User");

const getCourseForNonAdmin = async (req, res) => {
    try {
        const courseId = req.params.id;

        if (courseId) {
            const foundCourse = await Course.findOne({
                _id: courseId,
                published: true,
            }).select('-content'); // only show the published course and hide content prop
            if (!foundCourse)
                return res
                    .status(404)
                    .json({ success: false, data: "No course found with this id" });
            // we get the cours
            return res.status(200).json({ success: true, data: foundCourse });
        } else {
            // no id means -> get all courses
            // obv only published ones need to show the user
            const publishedCourses = await Course.find({ published: true }).select('-content');
            console.log(publishedCourses)
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

        if (foundUser.purchasedCourses.find(e => e === courseId)) {
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

const viewPurchasedCourse = async (req, res) => {
    try {
        // user is authenticated already
        const userId = req.headers.user.id

        const foundUser = await User.findById(userId)
        if (!foundUser) {
            return res.status(404).json({ success: false, data: "No user found with the id (Not authenticated" })
        }

        // find the purchased courses
        const purchasedCoursesIds = foundUser.purchasedCourses

        // User don't have any purchase course
        if (purchasedCoursesIds.length === 0) {
            return res.status(200).json({ success: true, data: "You didn't purchase any course yet" })
        }

        // Now this section is only when user want to access a certain purchase course
        if (req.params.id) {
            const foundCourseIdInPurchasedCourses = purchasedCoursesIds.find(id => id === req.params.id)
            if (!foundCourseIdInPurchasedCourses) return res.status(404).json({ success: false, data: "You didn't purchase this course" })

            const foundCourse = await Course.findById(req.params.id)
            if (!foundCourse) return res.status(404).json({ success: false, data: "No course with this id found in DB" })

            const contentOfCourse = { title: foundCourse.title, content: foundCourse.content }

            return res.status(200).json({ success: true, data: contentOfCourse })
        }

        // now user have purchased courses
        const purchasedCourses = await Course.find({ _id: { $in: purchasedCoursesIds } })
        // now this will find all the courses with the given ids (an array)



        return res.status(200).json({ success: true, data: purchasedCourses })
    } catch (error) {
        return res.status(500).json({ success: false, data: error.message })
    }
}


module.exports = { getCourseForNonAdmin, purchaseCourse, viewPurchasedCourse };
