const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

import Todo from './type/Todo';

async function createTodo(todosInput: Todo) {
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: todosInput
    }

    try {
        await docClient.put(params).promise();        //add specific data into database
        return todosInput;
    }
    catch (err) {
        return err.message;        
    }
}

export default createTodo;