const mongoose=require("mongoose");
const ProductScheme=mongoose.Schema({
    name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
});
const ProductModel=mongoose.model("Products",ProductScheme);
module.exports=ProductModel;