const express = require('express');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

const admin = require('./routes/admin');
const auth = require('./routes/auth');
const faq = require('./routes/faq');
// Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

app.use(errorHandler);

app.use('/api/v1/admin', admin);
app.use('/api/v1/auth', auth);
app.use('/api/v1/faq', faq);

// Serve Status Assets
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
