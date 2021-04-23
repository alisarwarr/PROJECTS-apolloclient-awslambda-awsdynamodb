import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'cross-fetch';

export const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://77o24w5hw5ebjfv2iesnr4bahe.appsync-api.us-east-2.amazonaws.com/graphql",  //ENTER GRAPHQL ENDPOINT HERE
        fetch,
        headers: {
            "x-api-key": "da2-p5o7cgfo2nfcba7fkwwquzonx4"                                       //ENTER API KEY HERE
        }
    }),
    cache: new InMemoryCache()
})
