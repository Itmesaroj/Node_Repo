const mongoose=require("mongoose");
const MovieSchema=mongoose.Schema({
    title:{type:String,require:true},
    description: {type:String},
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    releaseDate: Date,
})
const MovieModel=mongoose.model("movies",MovieSchema);
module.exports=MovieModel;