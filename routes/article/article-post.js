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
    UserEmail,
  } = req.body;

  const params = {
    TableName: ARTICLES_TABLE,
    Item: {
      ArticleList,
      ArticleName,
      ArticleText: "## Hi there! I'm your new article.\n\nYou can write anything here and the preview is on the right. When you are done, please click 'SAVE' at the very bottom right corner to save me.\n\nHave fun and cheers!\n\n---\n\nCheck this [doc](https://www.markdownguide.org/) if you have any problem working with Markdown syntaxes.\n",
      CreatedDate: new Date().toISOString(),
      UserEmail,
    },
  };

  dynamoDB.put(params, (error) => {
    if (error) res.status(400).json({ error: `Fail to add the article. ${error.message}.` });
    res.json({ ArticleList, ArticleName });
  });
});

module.exports = expressRouter;
