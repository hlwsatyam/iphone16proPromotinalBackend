const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://satyampandit021:20172522@rvbmhotelbooking.9hfzkrx.mongodb.net/iphonedb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Checkout Schema
const checkoutSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  pincode: String,
  district: String,
  city: String,
  state: String,
  street: String,
  emi: String,
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Checkout Model
const Checkout = mongoose.model('Checkout', checkoutSchema);

// POST endpoint to receive checkout form data

app.get('/', (req, res) => {
  res.send("Hello    World")

})


app.post('/checkout', async (req, res) => {
  const { name, phone, email, pincode, emi, paymentMethod, district, city, state, street } = req.body;

  try {
    // Save the checkout data to the database
    const newCheckout = new Checkout({ name, phone, email,emi, paymentMethod, pincode, district, city, state, street });
    await newCheckout.save();

    res.status(200).json({ message: 'Checkout data received successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error });
  }
});

// GET endpoint to fetch checkout data for admin (sorted by date)
app.get('/admin/checkout-data', async (req, res) => {
  try {
    // Fetch and sort data by creation date (newest first)
    const checkoutData = await Checkout.find().sort({ createdAt: -1 });
    res.status(200).json(checkoutData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
