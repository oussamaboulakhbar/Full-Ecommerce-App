const userModel = require("../../Models/modelUser")

async function AllUsers(req,res){
    try {
        console.log("userId All users",req.userId)
        const Allusers = await userModel.find()
        res.json({
            message : "All Users",
            data : Allusers,
            error : false,
            success : true
        })
    } 
    catch (err) {
        res.status(400).json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}
module.exports = AllUsers