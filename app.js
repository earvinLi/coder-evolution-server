// External Dependencies
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Internal Dependencies
const articleRoutes = require('./routes/article/article');
const articlesRoute = require('./routes/articles');
const articleListRoute = require('./routes/article-lists');

// App Definition
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());

// Routes Configurations
app.use('/article', articleRoutes);
app.use('/articles', articlesRoute);
app.use('/article-lists', articleListRoute);

module.exports = app;
