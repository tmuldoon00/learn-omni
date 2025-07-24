# Omni Connection APIs

**Source URL:** [https://docs.omni.co/docs/API/connections](https://docs.omni.co/docs/API/connections)  
**Extracted:** 2025-07-23 21:43:33  
**Source:** Omni Analytics Documentation

---

On this page

The connection APIs allow you to programmatically create and manage

database connections

in your Omni instance.

Create a connection

Creates a new database connection.

BigQuery

MySQL

PostgreSQL

Snowflake

POST /api/v1/connections

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connections' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"dialect": "bigquery",

"name": "My BigQuery Connection",

"region": "us",

"passwordUnencrypted": "<SERVICE_ACCOUNT_JSON_FILE>",

"defaultSchema": "my_dataset",

"includeSchemas": "dataset1,dataset2",

"includeOtherCatalogs": "other_project1,other_project2",

"maxBillingBytes": "1000000000"

Note

: For BigQuery, you must include a service account JSON file encoded as a string in the

passwordUnencrypted

field.

POST /api/v1/connections

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connections' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"dialect": "mysql",

"name": "My MySQL Connection",

"host": "mysql.example.com",

"port": 3306,

"database": "mydb",

"username": "dbuser",

"passwordUnencrypted": "mypassword",

"includeSchemas": "public,analytics",

"queryTimeoutSeconds": 900

POST /api/v1/connections

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connections' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"dialect": "postgres",

"name": "My Postgres Connection",

"host": "postgres.example.com",

"port": 5432,

"database": "mydb",

"username": "dbuser",

"passwordUnencrypted": "mypassword",

"includeSchemas": "public,analytics",

"queryTimeoutSeconds": 900

POST /api/v1/connections

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connections' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"dialect": "snowflake",

"name": "My Snowflake Connection",

"host": "myaccount",

"database": "MYDB",

"username": "dbuser",

"passwordUnencrypted": "mypassword",

"warehouse": "COMPUTE_WH",

"includeSchemas": "PUBLIC,ANALYTICS",

"includeOtherCatalogs": "OTHER_DB1,OTHER_DB2",

"queryTimeoutSeconds": 900

Parameters

Loading parameters...

Database-specific requirements

BigQuery

tip

Refer to the

BigQuery setup guide

for help retrieving the required information.

The following is required when creating a BigQuery connection:

A service account JSON key file in the

passwordUnencrypted

field. The service account file must be a valid JSON document with the following structure:

"type"

"service_account"

"project_id"

"your-project-id"

"private_key_id"

"key-id"

"private_key"

"-----BEGIN PRIVATE KEY-----\nkey-content\n-----END PRIVATE KEY-----\n"

"client_email"

"service-account-email@your-project-id.iam.gserviceaccount.com"

"client_id"

"client-id"

"auth_uri"

"https://accounts.google.com/o/oauth2/auth"

"token_uri"

"https://oauth2.googleapis.com/token"

"auth_provider_x509_cert_url"

"https://www.googleapis.com/oauth2/v1/certs"

"client_x509_cert_url"

"https://www.googleapis.com/robot/v1/metadata/x509/service-account-email%40your-project-id.iam.gserviceaccount.com"

region

(defaults to "

You can also optionally set a

maxBillingBytes

limit.

Databricks

tip

Refer to the

Databricks setup guide

for help retrieving the required information.

To create a Databricks connection, specify the

warehouse

field with the HTTP path value.

Additionally:

port

is not required

Set

useMachineAuth

true

for machine-based authentication

MotherDuck

tip

Refer to the

MotherDuck setup guide

for help retrieving the required information.

To create a MotherDuck connection, the

passwordUnencrypted

field should contain your MotherDuck token. The

host

port

, and

username

fields aren't required.

Snowflake

tip

Refer to the

Snowflake setup guide

for help retrieving the required information.

The following is required when creating a Snowflake connection:

Your account identifier in the

host

field. This should be a value like

myorg

, not

myorg.snowflakecomputing.com

warehouse

port

isn't required.

Response

201 Created

Successful requests will return a

201 Created

status and a response body similar to the following:

"success"

true

"data"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

Field

Type

Description

success

boolean

Indicates if the connection was created successfully

data

string

The UUID of the newly created connection

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid JSON

Bad Request: Invalid JSON

Invalid dialect

Invalid connection dialect

Invalid method

Invalid method

Missing required fields

Bad Request: <field>: Required

Invalid Snowflake host

Bad Request: host: Please only include your Snowflake account identifier

403 Forbidden

"detail"

"Permission denied"

"status"

Issue

Error detail

Insufficient permissions

Permission denied

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Update a connection

Updates properties of an existing connection.

Update base role

Update environment user attribute

Update both

Remove environment user attribute

PATCH /api/v1/connections/:connectionId

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/connections/c0f12353-4817-4398-bcc0-d501e6dd2f64' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"baseRole": "CONNECTION_ADMIN"

PATCH /api/v1/connections/:connectionId

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/connections/c0f12353-4817-4398-bcc0-d501e6dd2f64' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"environmentUserAttribute": {

"attributeName": "environment",

"defaultValues": ["dev", "prod"]

PATCH /api/v1/connections/:connectionId

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/connections/c0f12353-4817-4398-bcc0-d501e6dd2f64' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"baseRole": "QUERIER",

"environmentUserAttribute": {

"attributeName": "environment",

"defaultValues": ["dev"]

PATCH /api/v1/connections/:connectionId

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/connections/c0f12353-4817-4398-bcc0-d501e6dd2f64' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"environmentUserAttribute": null

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"success"

true

"message"

"Updated connection default role and user attribute settings."

The response message varies based on what was updated:

"Updated connection default role and user attribute settings."

- When both role and user attributes were updated

"Updated environment user attribute settings."

- When only user attributes were updated

"Updated connection default role."

- When only the role was updated

"No updates were made to the connection."

- When no changes were applied

Field

Type

Description

success

boolean

Indicates if the connection was updated successfully

message

string

A message describing the action taken

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid JSON

Bad Request: Invalid JSON

Invalid method

Invalid method

Empty request body

Bad Request: Empty request body

Missing required fields

Bad Request: <field>: Required

Invalid base role

Bad Request: baseRole: Invalid enum value

User attribute already in use

User attribute value "value" is already in use

403 Forbidden

"detail"

"Permission denied"

"status"

Issue

Error detail

Insufficient permissions

Permission denied

404 Not Found

"detail"

"Connection not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

List connections

Retrieves a list of database connections with optional filtering and sorting.

Basic request

Filtering by name

Filtering by dialect

Custom sorting

Include deleted

GET /api/v1/connections

curl -L 'https://myorg.omniapp.co/api/v1/connections' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/connections?name=<n>

curl -L 'https://myorg.omniapp.co/api/v1/connections?name=Production' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/connections?dialect=<dialect>

curl -L 'https://myorg.omniapp.co/api/v1/connections?dialect=postgres,mysql' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/connections?sortField=<field>&sortDirection=<direction>

curl -L 'https://myorg.omniapp.co/api/v1/connections?sortField=database&sortDirection=asc' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/connections?includeDeleted=true

curl -L 'https://myorg.omniapp.co/api/v1/connections?includeDeleted=true' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Parameters

Note

: All parameters must be provided as query parameters.

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"connections"

"id"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"name"

"Production Database"

"dialect"

"postgres"

"database"

"prod_db"

"deletedAt"

null

"userAttributeNameForConnectionEnvironments"

"environment"

"userAttributeValuesForDefaultEnvironment"

"prod"

"branchConnectionEnvironmentOverridesUserAttr"

false

"environmentConnectionSwitchesSchemaModel"

false

"id"

"789e0123-e45b-67d8-a456-426614174000"

"name"

"Development Database"

"dialect"

"mysql"

"database"

"dev_db"

"deletedAt"

null

"userAttributeNameForConnectionEnvironments"

null

"userAttributeValuesForDefaultEnvironment"

null

"branchConnectionEnvironmentOverridesUserAttr"

false

"environmentConnectionSwitchesSchemaModel"

false

Field

Type

Description

connections

array

Array of connection objects

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid or unrecognized query parameter

Bad Request: formErrors: Unrecognized key(s) in object: '<invalidParam>'

Invalid sort field

Bad Request: sortField: Invalid enum value. Expected 'database' | 'dialect' | 'name', received '<invalidField>'

Invalid dialect value

Invalid dialect(s): <invalidDialect>

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create a connection

Parameters

Response

Update a connection

Parameters

Response

List connections

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/connections](https://docs.omni.co/docs/API/connections) on 2025-07-23.*
