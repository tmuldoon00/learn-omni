# Connection environments

**Source URL:** [https://docs.omni.co/docs/API/guides/connection-environments](https://docs.omni.co/docs/API/guides/connection-environments)  
**Extracted:** 2025-07-23 21:43:37  
**Source:** Omni Analytics Documentation

---

On this page

Connection environments allow you to configure multiple database connections based on

user attributes

. This is useful for scenarios where you need to provide different database access based on user roles or environments.

In this guide, we'll walk you through creating development and production connections environments.

1. Create the base connection

This is the default connection that will be used when no user attribute matches an environment connection. Use the

Create a connection API

to create the connection.

In this example, this would be a connection to your

development

database:

POST /api/v1/connections

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connections' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"dialect": "postgres",

"name": "Postgres (Development)",

"host": "postgres-dev.my-org.com",

"port": 5432,

"database": "dev",

"username": "dbuser",

"passwordUnencrypted": "mypassword",

"includeSchemas": "public",

"queryTimeoutSeconds": 900

2. Create environment connections

Environment conditions are additional connections with the same dialect as the base connection. Use the

Create a connection API

to create the connection(s).

In this example, this would be a connection to your

production

database:

POST /api/v1/connections

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connections' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"dialect": "postgres",

"name": "Postgres (Production)",

"host": "postgres-prod.my-org.com",

"port": 5432,

"database": "prod",

"username": "dbuser",

"passwordUnencrypted": "mypassword",

"includeSchemas": "public",

"queryTimeoutSeconds": 900

3. Connect the base & environment connections

Use the

Create connection environments API

to associate the base connection with the environment connections. Provide the following:

baseConnectionId

- The ID of the base connection. In this example, that's your

development

database.

environmentConnectionIds

- The ID(s) of the connection environments. In this example, that's your

production

database.

POST /api/v1/connection-environments

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connection-environments' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"baseConnectionId": "c0f12353-4817-4398-bcc0-d501e6dd2f64",

"environmentConnectionIds": "b31f9c9f-208d-48a2-9ae3-ff80f2c79fed"

4. Configure the base connection user attribute

Use the

Update a connection

endpoint to specify which user attribute will be used to determine the connection environment.

In this example, configure the base connection to use the

environment

user attribute and set its default value to

dev

PATCH /api/v1/connections/:id

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/connections/c0f12353-4817-4398-bcc0-d501e6dd2f64' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"userAttributeNameForConnectionEnvironments": "environment",

"userAttributeValuesForDefaultEnvironment": "dev"

5. Define user attribute values for environments

Use the

Update connection environment user attributes

endpoint to specify which user attribute values will trigger the use of each environment connection.

In this example, set the user attribute values for the

production

environment connection to

prod

PUT /api/v1/connection-environments/:id

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/connection-environments/b31f9c9f-208d-48a2-9ae3-ff80f2c79fed' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"userAttributeValues": "prod"

Now, users with the

environment

attribute set to

prod

will use the production database, while users with the

environment

attribute set to

dev

(or any other value not associated with an environment connection) will use the development database.

1. Create the base connection

2. Create environment connections

3. Connect the base & environment connections

4. Configure the base connection user attribute

5. Define user attribute values for environments

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/guides/connection-environments](https://docs.omni.co/docs/API/guides/connection-environments) on 2025-07-23.*
