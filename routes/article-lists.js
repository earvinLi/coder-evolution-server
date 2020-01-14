// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.get('/:UserEmail', (req, res) => {
  const { UserEmail } = req.params;

  const params = {
    TableName: ARTICLES_TABLE,
    KeyConditionExpression: 'UserEmail = :UserEmail',
    ExpressionAttributeValues: { ':UserEmail': UserEmail },
    ProjectionExpression: 'ArticleList',
  };

  dynamoDB.query(params, (error, result) => {
    if (error) res.status(400).json({ error: `Fail to fetch the article lists. ${error.message}.` });

    if (result.Items) {
      const articleLists = [];
      result.Items.forEach((articleList) => {
        const currentArticleList = articleList.ArticleList;
        if (!articleLists.includes(currentArticleList)) articleLists.push(currentArticleList);
      });

      res.json(articleLists.sort());
    } else {
      res.status(404).json({ error: `Article of user: ${UserEmail} not found` });
    }
  });
});

module.exports = expressRouter;
