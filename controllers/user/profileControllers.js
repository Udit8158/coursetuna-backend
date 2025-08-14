const User = require("../../models/User")

const viewProfile = async (req, res) => {
    try {
        // user is authenticated already
        const userId = req.headers.user.id

        const foundUser = await User.findById(userId)
        if (!foundUser) {
            return res.status(404).json({ success: false, data: "No user found with the id (Not authenticated" })
        }

        return res.status(200).json({ success: true, data: foundUser })
    } catch (error) {
        return res.status(500).json({ success: false, data: error.message })
    }
}

module.exports = { viewProfile }

