import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ddb from '@aws-cdk/aws-dynamodb';

export class AppsyncBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    //APPSYNC's API gives you a graphqlApi with apiKey ( for deploying APPSYNC )
    const api = new appsync.GraphqlApi(this, 'GraphqlApi', {
      name: 'lollypopapp-api',
      schema: appsync.Schema.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      }
    });


    //print graphqlApi Url on console after deploy APPSYNC ( send by APPSYNC's API )
    new cdk.CfnOutput(this, 'GraphQlAPIURL', {
      value: api.graphqlUrl
    });


    //print apiKey on console after deploy APPSYNC ( send by APPSYNC's API )
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || ''
    });


    //creating lambdafunction
    const lambda_function = new lambda.Function(this, 'lollypopapp-lambda', {
      runtime: lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(10)
    });


    //setting lambdafunction ( as a datasource of endpoint )
    const lambda_datasource = api.addLambdaDataSource('LamdaDataSource', lambda_function);


    //describing resolver for datasource
    lambda_datasource.createResolver({
      typeName: "Mutation",
      fieldName: "addLollypop"
    });
    lambda_datasource.createResolver({
      typeName: "Query",
      fieldName: "allLollypop"
    });
    lambda_datasource.createResolver({
      typeName: "Query",
      fieldName: "getLollypopById"
    });


    //creating table
    const myTable = new ddb.Table(this, 'lollypopapp-table', {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING
      }
    });
    //for give access to lambdafunction ( to get data from dynamoDB's table )
    myTable.grantFullAccess(lambda_function);
    //for tell lambdafunction ( that this named table consider for storing )
    lambda_function.addEnvironment('TABLE_NAME', myTable.tableName);
  }
}