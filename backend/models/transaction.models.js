import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true
    } ,
    amount:{
        type:Number,
        required:true
    } ,
    date: { 
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
  });
  
  const Transaction = mongoose.model('Transaction', transactionSchema);

  export default Transaction;