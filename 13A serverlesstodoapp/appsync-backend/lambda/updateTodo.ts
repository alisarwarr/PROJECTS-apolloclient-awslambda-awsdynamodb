const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
    TableName: string | undefined,
    Key: string | {},
    ExpressionAttributeValues: any,
    ExpressionAttributeNames: any,
    UpdateExpression: string,
    ReturnValues: string
}

async function updateTodo(todosInput: any) {
    let params: Params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            id: todosInput.id
        },
        ExpressionAttributeValues: {},
        ExpressionAttributeNames: {},
        UpdateExpression: "",
        ReturnValues: "UPDATED_NEW"
    };
    let prefix = "set ";
    let attributes = Object.keys(todosInput);
    for (let i = 0; i < attributes.length; i++) {
        let attribute = attributes[i];
        if (attribute !== "id") {
            params["UpdateExpression"] += prefix + "#" + attribute + " = :" + attribute;
            params["ExpressionAttributeValues"][":" + attribute] = todosInput[attribute];
            params["ExpressionAttributeNames"]["#" + attribute] = attribute;
            prefix = ", ";
        }
    }

    
    try {
        await docClient.update(params).promise();     //updates specific data into database
        return todosInput;
    }
    catch (err) {
        return err.message;        
    }
}

export default updateTodo;