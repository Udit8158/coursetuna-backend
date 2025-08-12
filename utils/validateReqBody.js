// This is a function which will return a middlware to validate the req body

const validateReqBody = (zodSchema) => {
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

module.exports = validateReqBody;
