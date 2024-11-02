import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';


import Transaction from './models/transaction.models.js';

const app = express();
dotenv.config()
const API_URL = process.env.API_URL;
app.use(cors({
  origin: API_URL, // Replace <your-ec2-ip> with your actual IP
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const PORT = process.env.PORT;
app.use(express.json());


// Get all transactions
app.get('/api/transactions', async(req, res) => {
  try {
    const transaction = await Transaction.find().sort({ _id: -1 });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transaction', error });
  }
});

// Add a transaction
app.post('/api/transaction', async(req, res) => {
  
  var { type, amount, date, description,balance } = req.body;
  
  
  if (type === 'deposit') {
    balance += amount;
  } else if (type === 'withdraw' && balance >= amount) {
    balance -= amount;
  } else {
    return res.status(400).json({ error: 'Insufficient funds' });
  }
  

  const transaction = new Transaction({
    type,
    amount,
    date,
    description,
    balance
  });

  try {
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error });
  }
});

app.listen(PORT, '0.0.0.0',() =>{
  const connectDB=async()=>{
    try {
      console.log(process.env.MONGODB_URI)
       await mongoose.connect(process.env.MONGODB_URI)
       
       console.log("sucessfully connected to mongodb");
    } catch (error) {
        console.log("error in Mongodb connection:- ",error);
    }
}
connectDB();
  console.log(`Server running on port ${PORT}`);
}); 
