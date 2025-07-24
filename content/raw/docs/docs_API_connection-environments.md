# Omni Connection environment APIs

**Source URL:** [https://docs.omni.co/docs/API/connection-environments](https://docs.omni.co/docs/API/connection-environments)  
**Extracted:** 2025-07-23 21:43:32  
**Source:** Omni Analytics Documentation

---

On this page

The connection environment APIs allow you to programmatically create and manage connection environments in your Omni instance.

Connection environments enable you to use different database connections based on user attributes, providing environment-specific database connections (e.g., dev, staging, production).

Create connection environments

Creates connection environments by associating environment-specific connections with a base connection.

POST /api/v1/connection-environments

curl -L -X POST 'https://myorg.omniapp.co/api/v1/connection-environments' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"baseConnectionId": "c0f12353-4817-4398-bcc0-d501e6dd2f64",

"environmentConnectionIds": "b31f9c9f-208d-48a2-9ae3-ff80f2c79fed,f85e4400-e29b-41d4-a716-446655440000"

Parameters

Loading parameters...

Response

201 Created

Successful requests will return a

201 Created

status and a response body similar to the following:

"success"

true

"data"

"id"

"18811d32-c6ef-48f5-ad86-d740d09b356c"

"environmentConnectionId"

"b31f9c9f-208d-48a2-9ae3-ff80f2c79fed"

"id"

"550e8400-e29b-41d4-a716-446655440000"

"environmentConnectionId"

"f85e4400-e29b-41d4-a716-446655440000"

Field

Type

Description

success

boolean

Indicates if the connection environments were created successfully

data

array

An array of created connection environments

data[].id

string

The UUID of the created connection environment

data[].environmentConnectionId

string

The UUID of the environment connection

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

Invalid base connection ID

Bad Request: baseConnectionId: Base connection ID must be a valid UUID

Invalid environment connection IDs

Bad Request: environmentConnectionIds: All environment connection IDs must be valid UUIDs

Invalid environment connection

The following environment connection IDs are not valid for this connection: <ids>

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

"<errorReason>"

"status"

Issue

Error detail

Base connection not found

Connection with id <baseConnectionId> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Update connection environment user attributes

Associates user attribute values with a specific connection environment. These user attribute values determine when the environment connection will be used.

Note

: User attribute values for environment connections work in conjunction with the user attribute name and values set on the base connection, which can be defined using the

Update a connection

endpoint. The base connection specifies which user attribute to evaluate, while each environment connection specifies which values of that attribute will trigger its use.

PUT /api/v1/connection-environments/:id

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/connection-environments/18811d32-c6ef-48f5-ad86-d740d09b356c' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"userAttributeValues": "dev,staging"

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"success"

true

Field

Type

Description

success

boolean

Indicates if the connection environment was updated successfully

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

Invalid ID

Bad Request: id: Invalid uuid

User attribute already in use

User attribute value "<value>" is already in use

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

"<errorReason>"

"status"

Issue

Error detail

Connection environment not found

Connection environment with id <id> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create connection environments

Parameters

Response

Update connection environment user attributes

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/connection-environments](https://docs.omni.co/docs/API/connection-environments) on 2025-07-23.*
