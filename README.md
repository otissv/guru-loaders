# Guru Loaders

Graphql loaders from Guru Server.

## Loaders

Below are the loaders and where on the sever the loaders will look for the files.

### Schemas
Schema files must be placed anywhere inside of ./server/modules nested as deeply as desired.

Schemas consisted of there files and must start with a prefix of schemaQuery, schemaMutation, schemaType and end with a .graphql suffix.

- schemaQuery.graphql
- schemaMutation.graphql
- schemaType.graphql
- schemaQuery-user.graphql
- schemaQuery-user-profile.graphql

### Resolvers
Resolvers files mus be placed in side the anywhere inside of ./server/modules nested as deeply as desired.

Schemas consisted of there files and must start with a prefix of schemaQuery, schemaMutation, schemaType and end with a .js suffix.

- resolverQuery.js
- resolverMutation.js
- resolverQuery-user.js
- resolverQuery-user-profile.js

### Database connection
Multiple database connections can be placed ./server/core/databases.js


### Middleware
Server middleware is placed in ./server/core/middleware/index-middleware.js


### Routes
Server Routes is placed in ./server/core/routes/index-routes.js

### Environment
Server environment variables is placed in ./server/environment.js

## Usage
npm install @graphql-guru/loaders

## License
MIT

