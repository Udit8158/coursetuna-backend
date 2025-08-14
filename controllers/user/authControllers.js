const User = require("../../models/User");
const { createAuthToken } = require("../../utils/jwtHelper");
const {
    hashPassword,
    validateHashedPassword,
} = require("../../utils/passwordHashing");

const userSignUp = async (req, res) => {
    try {
        // req body verified
        const { name, email, password } = req.body;

        // if same user wih email exist or not
        const foundUser = await User.findOne({ email });
        if (foundUser)
            return res.status(400).json({
                success: false,
                data: "User with the same email already existed",
            });

        // create a new user
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        // if everything alright
        return res.status(200).json({ success: true, data: "User signed up" });
    } catch (error) {
        return res.status(500).json({ succes: false, data: error.message });
    }
};

const userSignIn = async (req, res) => {
    try {
        // req body verified
        const { email, password } = req.body;

        // if same user wih email exist or not
        const foundUser = await User.findOne({ email });
        if (!foundUser)
            return res.status(404).json({
                success: false,
                data: "User with the email not found",
            });

        // password check
        const passwordMatched = validateHashedPassword(
            password,
            foundUser.password
        );
        if (!passwordMatched)
            return res.status(401).json({ success: false, data: "Wrong password" });

        // genterate authtoken
        const authToken = createAuthToken({
            name: foundUser.name,
            id: foundUser._id,
            role: "user",
        });

        // everything alright
        return res.status(200).json({ success: true, data: authToken });
    } catch (error) {
        return res.status(500).json({ succes: false, data: error.message });
    }
};

module.exports = { userSignUp, userSignIn };
