import express from 'express';
import config from './config.js';
import cors from 'cors';

const app = express();

// routes 
import routes from './routes/index.js';

const port = config.service.port || 3000;

// 1. Set up the express app


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// 2. Require our routes into the application.

app.use(routes);


app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// 3. Server listen to port

app.listen(port, () => {
  console.log('app listening on port 3000')
})




export default app;