// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const articleDeleteRoute = require('./article-delete');
const articlePostRoute = require('./article-post');
const articlePutRoute = require('./article-put');

module.exports = expressRouter.use('/', articleDeleteRoute, articlePostRoute, articlePutRoute);
