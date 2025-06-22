import express from 'express';
import cors from 'cors';
import timeLineRouter from './routes/timeline/timeline.controller'
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins, adjust as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON bodies
app.use(express.json());
// Routes
app.use('/api/v1/timeline',timeLineRouter );

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/test', (req , res) => {
    res.send('Hello World!!')
}  )