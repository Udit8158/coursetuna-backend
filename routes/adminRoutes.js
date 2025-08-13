const express = require("express");

const {
  adminSignIn,
  adminSignUp,
} = require("../controllers/admin/authControllers");

const {
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
} = require("../controllers/admin/courseControllers");

const { authorizeAsAdmin } = require("../middlewares/auth/authorizeAsAdmin");

const {
  courseSchema,
  updateCourseSchema,
  adminSignUpSchema,
  adminSignInSchema,
} = require("../utils/zodSchema");

const {
  validateCourseReqBody,
  validateAdminAuthReqBody,
} = require("../utils/validateReqBody");

const router = express.Router();

// Routes

router.post(
  "/signin",
  validateAdminAuthReqBody(adminSignInSchema),
  adminSignIn
);

router.post(
  "/signup",
  validateAdminAuthReqBody(adminSignUpSchema),
  adminSignUp
);

router.post(
  "/courses",
  authorizeAsAdmin,
  validateCourseReqBody(courseSchema),
  createCourse
);

router.get("/courses", authorizeAsAdmin, getCourse);

router.get("/courses/:id", authorizeAsAdmin, getCourse);

router.put(
  "/courses/:id",
  authorizeAsAdmin,
  validateCourseReqBody(updateCourseSchema),
  updateCourse
);

router.delete("/courses/:id", authorizeAsAdmin, deleteCourse);

module.exports = router;
