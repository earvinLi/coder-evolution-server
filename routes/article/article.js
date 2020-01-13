// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const articleDeleteRoute = require('./article-delete');
const articleGetRoute = require('./article-get');
const articlePostRoute = require('./article-post');
const articlePutRoute = require('./article-put');

module.exports = expressRouter.use('/', articleDeleteRoute, articleGetRoute, articlePostRoute, articlePutRoute);
