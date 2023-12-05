import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';

import siteRoutes from "./routes/site";
import { requestInterceptor } from './utils/requestIntercepter';

const app = express();

app.all('*', requestInterceptor);

app.use('/', siteRoutes);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const runSever = (port: number, server: http.Server) => {
	server.listen(port, () => {
		console.log(`Running at port ${port}`);
	});
};

const regularServer = http.createServer(app);

if (process.env.NODE_ENV === 'production') {

} else {
	const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
	runSever(serverPort, regularServer);
}





