// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.get('/', (req, res) => {
  const params = { TableName: ARTICLES_TABLE };

  dynamoDB.scan(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Error fetching the articles' });
    res.json(result.Items);
  });
});

module.exports = expressRouter;
