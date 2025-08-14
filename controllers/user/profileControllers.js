const User = require("../../models/User")
const { validateHashedPassword, hashPassword } = require("../../utils/passwordHashing")

const viewProfile = async (req, res) => {
    try {
        // user is authenticated already
        const userId = req.headers.user.id

        const foundUser = await User.findById(userId).select('-password')
        if (!foundUser) {
            return res.status(404).json({ success: false, data: "No user found with the id (Not authenticated" })
        }

        return res.status(200).json({ success: true, data: foundUser })
    } catch (error) {
        return res.status(500).json({ success: false, data: error.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        // req body verified - done
        //
        const { name, email, oldPassword, newPassword } = req.body
        const userId = req.headers.user.id // beacuse authenticated user has the token

        if (oldPassword === newPassword) {
            return res.status(400).json({ success: true, data: "You're giving same password, so no change happened" })
        }

        const foundUser = await User.findById(userId)
        if (!foundUser) {
            return res.status(404).json({ success: false, data: "No user found with the id: Unauthorized" })
        }

        // check for old password match
        const oldPasswordMatched = await validateHashedPassword(oldPassword, foundUser.password)

        if (!oldPasswordMatched) {
            return res.status(401).json({ success: false, data: "Your password is not matched with the last password" })
        }

        // Now update the user
        foundUser.name = name
        foundUser.email = email
        const newHashedPassword = await hashPassword(newPassword)
        foundUser.password = newHashedPassword
        await foundUser.save()

        return res.status(200).json({ success: true, data: "Password changed successfully" })

    } catch (error) {
        return res.status(500).json({ success: false, data: error.message })
    }
}





module.exports = { viewProfile, updateProfile }

