// External Dependencies
const AWS = require('aws-sdk');
const express = require('express');
// const uuid = require('uuid');

const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const EMPLOYEES_TABLE = process.env.TABLE;
const dynamoDB = IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1',
    endpoint: 'http://localhost:8080',
  })
  : new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.get('/articles', (req, res) => {
  const params = { TableName: EMPLOYEES_TABLE };
  console.log(params);

  dynamoDB.scan(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Error fetching the articles' });
    res.json(result.Items);
  });
});

router.get('/articles/:articleName', (req, res) => {
  const { articleName } = req.params;
  const params = {
    TableName: EMPLOYEES_TABLE,
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

router.post('/articles', (req, res) => {
  const {
    ArticleList,
    ArticleName,
    ArticleText,
    UserEmail,
  } = req.body;
  const params = {
    TableName: EMPLOYEES_TABLE,
    Item: {
      ArticleList,
      ArticleName,
      ArticleText,
      UserEmail,
    },
  };

  dynamoDB.put(params, (error) => {
    if (error) res.status(400).json({ error: 'Error creating the article' });
    res.json({ ArticleName, ArticleText });
  });
});

router.delete('/articles/:articleName', (req, res) => {
  const { articleName } = req.params;
  const params = {
    TableName: EMPLOYEES_TABLE,
    Key: { articleName },
  };

  dynamoDB.delete(params, (error) => {
    if (error) res.status(400).json({ error: 'Error deleting the article' });
    res.json({ success: true });
  });
});

router.put('/articles', (req, res) => {
  const { articleName, articleText } = req.body;
  const params = {
    TableName: EMPLOYEES_TABLE,
    Key: { articleName },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: { '#name': 'articleText' },
    ExpressionAttributeValues: { ':name': articleText },
    ReturnValues: 'ALL_NEW',
  };

  dynamoDB.update(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Error updating the article' });
    res.json(result.Attributes);
  });
});

module.exports = router;
