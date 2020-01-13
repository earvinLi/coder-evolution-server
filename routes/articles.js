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
  };

  dynamoDB.query(params, (error, result) => {
    if (error) res.status(400).json({ error: `Fail to fetch all the articles. ${error.message}.` });
    res.json(result.Items);
  });
});

module.exports = expressRouter;
