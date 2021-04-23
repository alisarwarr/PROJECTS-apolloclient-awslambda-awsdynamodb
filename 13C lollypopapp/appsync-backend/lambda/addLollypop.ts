const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

import Lollypop from './type/Lollypop';

async function addLollypop(lollypopInput: Lollypop) {
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Item: lollypopInput
    }

    try {
        await docClient.put(params).promise();        //add specific data into database
        return lollypopInput;
    }
    catch (err) {
        return err.message;        
    }
}

export default addLollypop;