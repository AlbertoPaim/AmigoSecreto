import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import adminRoutes from './routes/admin';
import siteRoutes from './routes/site';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const port = process.env.PORT;

app.listen(port);

