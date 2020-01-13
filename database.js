// External Dependencies
const AWS = require('aws-sdk');

const IS_OFFLINE = process.env.NODE_ENV !== 'production';
const dynamoDB = IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1',
    endpoint: 'http://localhost:8080',
  })
  : new AWS.DynamoDB.DocumentClient();

module.exports = dynamoDB;
