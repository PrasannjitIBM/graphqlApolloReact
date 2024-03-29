import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import GetAuthors from './Components/GetAuthors';

const errorLink = onError(({ graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map((message, location, path) => {
      console.log(`GraphQL Error : ${message}`);
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:4000/graphql"})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});


function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      <GetAuthors />
    </ApolloProvider>
  );
}

export default App;
