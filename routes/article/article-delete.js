// External Dependencies
const expressRouter = require('express').Router();

// Internal Dependencies
const dynamoDB = require('../../database');

const ARTICLES_TABLE = process.env.TABLE;
expressRouter.delete('/', (req, res) => {
  const {
    ArticleName,
    UserEmail,
  } = req.body;

  const params = {
    TableName: ARTICLES_TABLE,
    Key: { ArticleName, UserEmail },
  };

  dynamoDB.delete(params, (error) => {
    if (error) res.status(400).json({ error: `Fail to delete the article. ${error.message}.` });
    res.json({ success: true });
  });
});

module.exports = expressRouter;
