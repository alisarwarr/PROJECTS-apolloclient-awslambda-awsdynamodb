const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function allBookmarks() {
    const params = {
        TableName: process.env.TABLE_NAME || ''
    }

    try {
        const response = await docClient.scan(params).promise();
        return response.Items;                         //sends array data from the database
    }
    catch (err) {
        return err.message;        
    }
}

export default allBookmarks;