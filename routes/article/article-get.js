// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.get('/:UserEmail/:ArticleName', (req, res) => {
  const {
    ArticleName,
    UserEmail,
  } = req.params;

  const params = {
    TableName: ARTICLES_TABLE,
    Key: { ArticleName, UserEmail },
  };

  dynamoDB.get(params, (error, result) => {
    if (error) res.status(400).json({ error: `Fail to delete the article. ${error.message}.` });
    res.json(result.Item);
  });
});

module.exports = expressRouter;
