const { default: z } = require("zod");

const adminSignInInputValidation = (req, res, next) => {
  // Validate req.boy
  if (!req.body) {
    return res.status(400).json({ data: "Send the body" });
  }

  const { email, password } = req.body;

  // zod comes into the play
  const AdminObject = z.object({
    email: z.email().max(40),
    password: z.string().min(6).max(20),
  });
  const validationResult = AdminObject.safeParse({ email, password });

  if (!validationResult.success) {
    return res.status(400).json({ data: validationResult.error.issues });
  }

  // valiation successfully
  next();
};

const adminSignUpInputValidation = (req, res, next) => {
  // Validate req.boy
  if (!req.body) {
    return res.status(400).json({ data: "Send the body" });
  }

  const { name, email, password, adminPrivateKey } = req.body;

  // zod comes into the play
  const AdminObject = z.object({
    name: z.string().min(3).max(40),
    email: z.email().max(40),
    password: z.string().min(6).max(20),
    adminPrivateKey: z.string().min(6).max(20),
  });
  const validationResult = AdminObject.safeParse({
    name,
    email,
    password,
    adminPrivateKey,
  });

  if (!validationResult.success) {
    return res.status(400).json({ data: validationResult.error.issues });
  }

  // valiation successfully
  next();
};

module.exports = { adminSignUpInputValidation, adminSignInInputValidation };
