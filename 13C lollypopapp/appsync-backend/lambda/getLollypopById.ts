const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

async function getLollypopById(pathId: string) {
    const params = {
        TableName: process.env.TABLE_NAME || '',
        Key: {                                                      //pass Key's id to hold specific data
            id: pathId
        }
    }

    try {
        const response = await docClient.get(params).promise();     //returns that specific id's data
        return response.Item;
    }
    catch (err) {
        return err.message;        
    }
}

export default getLollypopById;