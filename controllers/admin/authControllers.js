const Admin = require("../../models/Admin");
const {
    hashPassword,
    validateHashedPassword,
} = require("../../utils/passwordHashing");
const { createAdminAuthToken } = require("../../utils/jwtHelper");

const adminSignIn = async (req, res) => {
    try {
        // input validation is done now check the db for authentication

        // find admin in the db
        const { email, password } = req.body;

        const foundAdmin = await Admin.findOne({ email });

        // if not found
        if (!foundAdmin)
            return res
                .status(404)
                .json({ success: false, data: "You don't have an admin email" });

        // if it's an admin's credential then check for the password match
        const isPasswordMatched = await validateHashedPassword(
            password,
            foundAdmin.password
        );
        if (!isPasswordMatched)
            return res.status(401).json({ success: false, data: "Wrong password" });

        // generate token for this admin
        const authToken = createAdminAuthToken({
            id: foundAdmin._id,
            role: "admin",
        });

        res.status(200).json({ success: true, data: authToken });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
        console.log('creating')
    }
};

const adminSignUp = async (req, res) => {
    try {
        // input validation is done now check the db for authentication

        // first verify the adminPrivateKey
        const { name, email, password, adminPrivateKey } = req.body;

        if (adminPrivateKey != process.env.ADMIN_PRIVATE_KEY) {
            return res
                .status(404)
                .json({ success: false, data: "You're not an Admin my friend" });
        }

        // check if already the admin existed in db
        const foundAdmin = await Admin.findOne({ email });
        if (foundAdmin) {
            return res.status(409).json({
                success: false,
                data: "You're already an Admin, please sign in",
            });
        }

        // if not then, create a new admin in the db
        const hashedPassword = await hashPassword(password);
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        res.status(200).json({ success: true, data: "You're now admin" });
    } catch (error) {
        res.status(500).json({ success: false, data: error });
    }
};

module.exports = { adminSignIn, adminSignUp };
