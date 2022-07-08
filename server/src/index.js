import 'dotenv/config';
import cors from 'cors';
import './database/index';
import express from 'express';
import { Swaggiffy } from 'swaggiffy'
import authRoutes from './routes/auth.routes'
import votesRoutes from './routes/votes.routes'
import candidateRoutes from './routes/candidate.routes'


const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors())

new Swaggiffy().setupExpress(app).swaggiffy(); // Setup Swaggiffy for documentation

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' }).status(200);
});

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/votes', votesRoutes)
app.use('/api/v1/candidates', candidateRoutes)

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));