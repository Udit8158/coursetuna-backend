const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (plainTextPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    return hashedPassword;
  } catch (error) {
    return error;
  }
};

const validateHashedPassword = async (plainTextPassword, hashedPassword) => {
  try {
    const result = await bcrypt.compare(plainTextPassword, hashedPassword);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { hashPassword, validateHashedPassword };
