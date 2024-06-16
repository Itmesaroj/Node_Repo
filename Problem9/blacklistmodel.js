const mongoose=require("mongoose");

const blackListSchem=mongoose.Schema({
    token:{type:String,required:true}
})
const blackListModel=mongoose.model("blacklists",blackListSchem);
module.exports=blackListModel;