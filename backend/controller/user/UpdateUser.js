const userModel = require("../../Models/modelUser");

async function UpdateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, name, email, role } = req.body;

        const payload = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role }),
        };

        const user = await userModel.findById(sessionUser);
        console.log("UserRole", user.role);
        const dataUpdate = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        res.json({
            message: "User updated",
            data: dataUpdate,
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = UpdateUser;
