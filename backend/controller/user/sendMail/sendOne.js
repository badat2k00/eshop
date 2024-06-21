const userModel= require('../../../models/userModel');
const connectDB =require('../../../config/db')
async function findAllUserHaveEmail() {
    try {
        const {userId} =req.userId;
        const user = await userModel.find({ email: { $exists: true, $ne: "" } });
        console.log(user)
    }catch(error){
        console.log(error)
    }
    


}
connectDB().then(findAllUserHaveEmail)