const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cardRoutes = require('../routes/cardRoutes');

const authRoutes = require('../routes/auth');
const newsRoutes = require('../routes/newsRoutes');
const blogRoutes = require('../routes/blogRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: true, // ✅ Replace this with your actual Webflow domain
   credentials: true
 }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/card', cardRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/blogs', blogRoutes);

// MongoDB Connection
mongoose.connect("mongodb+srv://aryan:2021cs613@cluster0.o8bu9nt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {


})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(5001, () => {
    console.log(`Server is running on 5001`);
  });
})
.catch((err) => console.error('MongoDB connection failed:', err));
