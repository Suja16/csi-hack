import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { createHttpLink } from "@apollo/client";

import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

function makeClient() {
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    headers: {
      "X-Hasura-Admin-Secret": import.meta.env.VITE_HASURA_GRAPHQL_ADMIN_SECRET,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "network-only",
      },
      mutate: {
        fetchPolicy: "network-only",
      },
      query: {
        fetchPolicy: "network-only",
      },
    },
  });
}

// Create the Apollo Client instance
const client = makeClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
      <ToastContainer />
    </ApolloProvider>
  </StrictMode>,
);
