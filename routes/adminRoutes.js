const express = require("express");
const {
  adminSignIn,
  adminSignUp,
} = require("../controllers/admin/authControllers");
const {
  adminSignInInputValidation,
  adminSignUpInputValidation,
} = require("../middlewares/admin/adminInputValidation");
const {
  createCourse,
  getAllCourses,
  updateCourse,
} = require("../controllers/admin/courseControllers");
const authorizeAsAdmin = require("../middlewares/auth/authorizeAsAdmin");
const validateReqBody = require("../utils/validateReqBody");
const { courseSchema, updateCourseSchema } = require("../utils/zodSchema");
const router = express.Router();

// Routes

router.post("/signin", adminSignInInputValidation, adminSignIn);
router.post("/signup", adminSignUpInputValidation, adminSignUp);
router.post(
  "/courses",
  authorizeAsAdmin,
  validateReqBody(courseSchema),
  createCourse
);
router.get("/courses", authorizeAsAdmin, getAllCourses);
router.put(
  "/courses/:id",
  authorizeAsAdmin,
  validateReqBody(updateCourseSchema),
  updateCourse
);
// router.delete('/courses/:id')

module.exports = router;
