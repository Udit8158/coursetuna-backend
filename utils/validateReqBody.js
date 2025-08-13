// This is a function which will return a middlware to validate the req body

// This is for validating req body in admin authenticaton (signup and sign in)
const validateAdminAuthReqBody = (zodSchema) => {
  if (!zodSchema) {
    const error = new Error(
      "zodSchema is not provided inside validateAdminAuthReqBody function"
    );
    throw error;
  }

  return (req, res, next) => {
    // validate req.body
    if (!req.body)
      return res.status(400).json({ success: false, data: "No body given" });

    const { name, email, password, adminPrivateKey } = req.body;

    const validationResult = zodSchema.safeParse({
      name,
      email,
      password,
      adminPrivateKey,
    });

    if (!validationResult.success)
      return res
        .status(400)
        .json({ success: false, data: validationResult.error.issues });

    next();
  };
};

// This is for validating req body in course creation or updation
const validateCourseReqBody = (zodSchema) => {
  if (!zodSchema) {
    const error = new Error(
      "zodSchema is not provided inside validateCourseReqBody function"
    );
    throw error;
  }

  return (req, res, next) => {
    // validate req.body
    if (!req.body)
      return res.status(400).json({ success: false, data: "No body given" });

    const { title, description, price, thumbnail, content, published } =
      req.body;

    const validationResult = zodSchema.safeParse({
      title,
      description,
      price,
      thumbnail,
      content,
      published,
    });

    if (!validationResult.success)
      return res
        .status(400)
        .json({ success: false, data: validationResult.error.issues });

    next();
  };
};

module.exports = { validateCourseReqBody, validateAdminAuthReqBody };
