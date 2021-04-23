const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function deleteTodo(thatId: string) {
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Key: {                                        //pass Key's id to hold specific data
            id: thatId
        }
    }

    try {
        await docClient.delete(params).promise();     //delete that specific id's data 
        return thatId;
    }
    catch (err) {
        return err.message;        
    }
}

export default deleteTodo;