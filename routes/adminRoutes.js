const express = require("express");
const { adminSignIn, adminSignUp } = require("../controllers/authControllers");
const {
  adminSignInInputValidation,
  adminSignUpInputValidation,
} = require("../middlewares/admin/adminInputValidation");
const router = express.Router();

router.post("/signin", adminSignInInputValidation, adminSignIn);
router.post("/signup", adminSignUpInputValidation, adminSignUp);
// router.post('/courses')
// router.get('/courses')
// router.put('/courses/:id')
// router.delete('/courses/:id')

module.exports = router;
