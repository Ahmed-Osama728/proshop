import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userAuthRoute.js';
import orderRoutes from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLINT_ID)
);
app.use(notFound);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);