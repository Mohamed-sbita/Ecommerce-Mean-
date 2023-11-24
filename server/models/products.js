const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: true,
    },
    pDescription: {
      type: String,
      required: true,
    },
    pPrice: {
      type: Number,
      required: true,
    },
  
   
    pCategory: {
      type: ObjectId,
      ref: "categories",
    },
    pImages: {
      type: Array,
      required: true,
    },

 
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
