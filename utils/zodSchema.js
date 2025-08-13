const { default: z } = require("zod");

// used to validate the req body while admin sign up
const adminSignUpSchema = z.object({
  name: z.string().min(3).max(40),
  email: z.email().max(40),
  password: z.string().min(6).max(20),
  adminPrivateKey: z.string().min(6).max(20),
});

// used to validate the req body while user sign up
const userSignUpSchema = z.object({
  name: z.string().min(3).max(40),
  email: z.email().max(40),
  password: z.string().min(6).max(20),
});

// used to validate the req body while user sign up
const userSignInSchema = z.object({
  email: z.email().max(40),
  password: z.string().min(6).max(20),
});


// used to validate the req body while admin sign in
const adminSignInSchema = z.object({
  name: z.string().min(3).max(40).nullish(),
  email: z.email().max(40),
  password: z.string().min(6).max(20),
  adminPrivateKey: z.string().min(6).max(20).nullish(),
});

// used to validate the req body while createing a course
const courseSchema = z.object({
  title: z.string().min(6).max(40),
  description: z.string().min(10).max(2000),
  price: z.number().min(99).max(200000),
  thumbnail: z.string().min(3).max(100),
  content: z.array(z.any()).min(0).max(1000),
  published: z.boolean().nullish(),
});

// used to validate the req body while updating a course
const updateCourseSchema = z.object({
  title: z.string().min(6).max(40).nullish(),
  description: z.string().min(10).max(2000).nullish(),
  price: z.number().min(99).max(200000).nullish(),
  thumbnail: z.string().min(3).max(100).nullish(),
  content: z.array(z.any()).min(0).max(1000).nullish(),
  published: z.boolean().nullish(),
});

module.exports = {
  updateCourseSchema,
  courseSchema,
  adminSignUpSchema,
  adminSignInSchema,
  userSignUpSchema,
  userSignInSchema,
};
