require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/database');
const redis = require('./config/redis');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// routes
app.use('/auth', require('./routes/auth'));
app.use('/accounts', require('./routes/accounts'));
app.use('/destinations', require('./routes/destinations'));
app.use('/account-members', require('./routes/accountMembers'));
app.use('/logs', require('./routes/logs'));

// public incoming endpoint
app.use('/', require('./routes/dataHandler'));

// basic health
app.get('/health', (req, res) => res.json({ success: true, uptime: process.uptime() }));

// swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Data Pusher API', version: '1.0.0' }
    },
    apis: ['./src/routes/*.js']
};
const openapiSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(errorHandler);

module.exports = app;
