
# Constants
Centralizam informações / valores que são fixos do sistema, seja usando de variáveis ou usando funções puras, retornando valores que podem ser derivados de outras variáveis constantes do sistema. São variáveis que devem ser exportadas para serem consumidas pelas outras abstrações da aplicação.

Exemplo:

```ts
// Exemplo de uma variável constante

export const HTTP_METHODS = {
  CONNECT: 'CONNECT',
  DELETE: 'DELETE',
  GET: 'GET',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  TRACE: 'TRACE'
};

// Exemplo de uma função constante 

export const GET_METHOD = ( method: string ) => {
	return HTTP_METHODS[ method ]
}

```

## Padronização
As Constantes, sejam variavéis como o `HTTP_METHODS` ou funções como o `GET_METHOD` precisam estar em uppercase, separadas por underline, SCREAMING_SNAKE_CASE. Pode e deve concentrar valores de variáveis de sistema através do `process.env`.