// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.get('/:UserEmail/:ArticleList', (req, res) => {
  const {
    ArticleList,
    UserEmail,
  } = req.params;

  const params = {
    TableName: ARTICLES_TABLE,
    KeyConditionExpression: 'UserEmail = :UserEmail',
    FilterExpression: 'ArticleList = :ArticleList',
    ExpressionAttributeValues: {
      ':ArticleList': ArticleList,
      ':UserEmail': UserEmail,
    },
    ProjectionExpression: 'ArticleName',
  };

  dynamoDB.query(params, (error, result) => {
    if (error) res.status(400).json({ error: `Fail to fetch all the articles. ${error.message}.` });
    res.json(result.Items.map((item) => item.ArticleName));
  });
});

module.exports = expressRouter;
