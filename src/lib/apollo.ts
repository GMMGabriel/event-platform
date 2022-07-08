/**
 * Conecta com a API do graphcms com o apollo
 */

import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  // url da API, disponível em:
  // Área do projeto da aplicação > Project settings > API Access > Content API
  uri: import.meta.env.VITE_API_URL,
  headers: {
    // token da API
    'Authorization': `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
  },
  cache: new InMemoryCache(),
})