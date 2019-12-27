const AWS = require('aws-sdk');
const express = require('express');
const uuid = require('uuid');

const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const EMPLOYEES_TABLE = process.env.TABLE;

const dynamoDB = IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1',
    endpoint: `
      <a
        class="vglnk"
        href="http://localhost:8081"
        rel="nofollow"
      >
        <span>http</span>
        <span>://</span>
        <span>localhost</span>
        <span>:</span>
        <span>8081</span>
      </a>
    `,
  })
  : new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.get('/employees', (req, res) => {
  const params = { TableName: EMPLOYEES_TABLE };

  dynamoDB.scan(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Error fetching the employees' });
    res.json(result.Items);
  });
});

router.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: EMPLOYEES_TABLE,
    Key: { id },
  };

  dynamoDB.get(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Error retrieving the employee' });

    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: `Employee with id: ${id} not found` });
    }
  });
});

router.post('/employees', (req, res) => {
  const { name } = req.body;
  const id = uuid.v4();
  const params = {
    TableName: EMPLOYEES_TABLE,
    Item: { id, name },
  };

  dynamoDB.put(params, (error) => {
    if (error) res.status(400).json({ error: 'Error creating the employee' });
    res.json({ id, name });
  });
});

router.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const params = {
    TableName: EMPLOYEES_TABLE,
    Key: { id },
  };

  dynamoDB.delete(params, (error) => {
    if (error) res.status(400).json({ error: 'Error deleting the employee' });
    res.json({ success: true });
  });
});

router.put('/employees', (req, res) => {
  const { id, name } = req.body;
  const params = {
    TableName: EMPLOYEES_TABLE,
    Key: { id },
    UpdateExpression: 'set #name = :name',
    ExpressionAttributeNames: { '#name': 'name' },
    ExpressionAttributeValues: { ':name': name },
    ReturnValues: 'ALL_NEW',
  };

  dynamoDB.update(params, (error, result) => {
    if (error) res.status(400).json({ error: 'Error updating the employee' });
    res.json(result.Attributes);
  });
});

module.exports = router;
