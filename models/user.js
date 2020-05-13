const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = new Schema({
  name:{type:String},  
  email:{type:String,required:true,unique:true},
  phone: { type: Number, required: true, unique: true }
});

let User = mongoose.model("User", user_schema);

module.exports = User;