// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.put('/', (req, res) => {
  const {
    ArticleName,
    ArticleText,
    UserEmail,
  } = req.body;

  const params = {
    TableName: ARTICLES_TABLE,
    Key: { ArticleName, UserEmail },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: { '#name': 'ArticleText' },
    ExpressionAttributeValues: { ':name': ArticleText },
    ReturnValues: 'ALL_NEW',
  };

  dynamoDB.update(params, (error, result) => {
    if (error) res.status(400).json({ error: `Fail to update the article. ${error.message}.` });
    res.json(result.Attributes);
  });
});

module.exports = expressRouter;
