const mongoose= require("mongoose");

const productSchema =new mongoose.Schema({
    name:{
      type:String,
      required: [true,"Please Enter Product Name"],
      trim:true
    },
    description:{
        type:String,
        required: [true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required: [true,"Please Enter Product Price"],
        maxLength:[8,"price cannot exceed 8 char"]
      },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
    ],
    category:{
        type:String,
        required: [true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        required: [true,"Please Enter Product stock"],
        maxLength:[4,"cannot exceed 4 char"],
        default:1
    },
    numOfReviews:{
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user:{
            type:mongoose.Schema.ObjectId,
            ref:"user",
            required:true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

});

module.exports = mongoose.model("Product", productSchema);