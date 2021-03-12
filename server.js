const express = require('express');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const todoRoutes = require('./routes/todo.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// cors
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}
app.use(cors(corsOptions));
// app.use(cors());

app.use(express.json());

// parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/todos', todoRoutes);
app.use('/api/user', userRoutes);



if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get('/*', (_, res) => res.sendFile(path.resolve(__dirname, './client/build/index.html')))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});