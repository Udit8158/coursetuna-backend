const express = require("express");
const {
  userSignUp,
  userSignIn,
} = require("../controllers/user/authControllers");
const { validateUserAuthReqBody } = require("../utils/validateReqBody");
const { userSignUpSchema, userSignInSchema } = require("../utils/zodSchema");
const { getCourse } = require("../controllers/admin/courseControllers");
const { purchaseCourse } = require("../controllers/user/courseControllers");
const { authorizeAsUser } = require("../middlewares/auth/authorizeAsAdmin");
const router = express.Router();

// Routes
router.post("/signup", validateUserAuthReqBody(userSignUpSchema), userSignUp); // create an account
router.post("/signin", validateUserAuthReqBody(userSignInSchema), userSignIn); // log in

router.get("/courses", getCourse); // see all the published courses (without logged in)
router.get("/courses/:id", getCourse); // see the course detail page

router.post("/courses/:id", authorizeAsUser, purchaseCourse);

module.exports = router;
