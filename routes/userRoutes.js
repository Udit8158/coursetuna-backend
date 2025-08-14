const express = require("express");
const {
    userSignUp,
    userSignIn,
} = require("../controllers/user/authControllers");
const { validateUserAuthReqBody } = require("../utils/validateReqBody");
const { userSignUpSchema, userSignInSchema } = require("../utils/zodSchema");
const { getCourse } = require("../controllers/admin/courseControllers");
const { getCourseForNonAdmin, purchaseCourse, viewPurchasedCourse } = require("../controllers/user/courseControllers");
const { authorizeAsUser } = require("../middlewares/auth/authorizeAsAdmin");
const { viewProfile } = require("../controllers/user/profileControllers");
const router = express.Router();

// Routes
router.post("/signup", validateUserAuthReqBody(userSignUpSchema), userSignUp); // create an account
router.post("/signin", validateUserAuthReqBody(userSignInSchema), userSignIn); // log in

router.get("/courses", getCourseForNonAdmin); // see all the published courses (without logged in)
router.get("/courses/:id", getCourseForNonAdmin); // see the course detail page

router.post("/courses/:id", authorizeAsUser, purchaseCourse);

router.get("/profile", authorizeAsUser, viewProfile)

router.get("/purchased-courses", authorizeAsUser, viewPurchasedCourse)
router.get("/purchased-courses/:id", authorizeAsUser, viewPurchasedCourse)

module.exports = router;
