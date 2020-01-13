// External Dependencies
const expressRouter = require('express').Router();
// const uuid = require('uuid');

// Internal Dependencies
const dynamoDB = require('../../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.post('/', (req, res) => {
  const {
    ArticleList,
    ArticleName,
    ArticleText,
    UserEmail,
  } = req.body;

  const params = {
    TableName: ARTICLES_TABLE,
    Item: {
      ArticleList,
      ArticleName,
      ArticleText,
      CreatedDate: new Date().toISOString(),
      UserEmail,
    },
  };

  dynamoDB.put(params, (error) => {
    if (error) res.status(400).json({ error: `Fail to add the article. ${error.message}.` });
    res.json({ ArticleName, ArticleText });
  });
});

module.exports = expressRouter;
