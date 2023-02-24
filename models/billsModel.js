const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    cuntomerName: {
      type: String,
      required: true,
    },
    customerNumber: {
      type: Number,
      required: true,
    },    
    totalAmount: {
        type: Number,
        required: true,
      }, 
      subTotal: {
        type: Number,
        required: true,
      },      
    tax: {
        type: Number,
        required: true,
      },      
    paymentMode: {
        type: String,
        required: true,
      },
      cartItem:{
        type:Array,
        required:true
      }
  },
  { timestamp: true }
);

const Bills = mongoose.model("Bills", billSchema);

module.exports = Bills;
