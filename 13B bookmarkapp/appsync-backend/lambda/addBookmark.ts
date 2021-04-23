const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

import Bookmark from './type/Bookmark';

async function createTodo(bookmarkInput: Bookmark) {
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: bookmarkInput
    }

    try {
        await docClient.put(params).promise();        //add specific data into database
        return bookmarkInput;
    }
    catch (err) {
        return err.message;        
    }
}

export default createTodo;