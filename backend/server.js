import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import placesRoutes from './routes/places.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/places', placesRoutes);

const PORT = process.env.PORT || 5000;

// Listen on 0.0.0.0 so external devices on the same network can access it
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
