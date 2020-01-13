// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.delete('/', (req, res) => {
  const { articleName } = req.params;
  const params = {
    TableName: ARTICLES_TABLE,
    Key: { articleName },
  };

  dynamoDB.delete(params, (error) => {
    if (error) res.status(400).json({ error: 'Error deleting the article' });
    res.json({ success: true });
  });
});

module.exports = expressRouter;
