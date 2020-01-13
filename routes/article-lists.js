// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.get('/:UserEmail', (req, res) => {
  const { articleName } = req.params;
  const params = {
    TableName: ARTICLES_TABLE,
    Key: { articleName },
  };

  dynamoDB.get(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Error retrieving the article' });

    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: `Article with name: ${articleName} not found` });
    }
  });
});

module.exports = expressRouter;
