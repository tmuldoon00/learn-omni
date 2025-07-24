# Omni model APIs

**Source URL:** [https://docs.omni.co/docs/API/model](https://docs.omni.co/docs/API/model)  
**Extracted:** 2025-07-23 21:43:38  
**Source:** Omni Analytics Documentation

---

On this page

The model APIs allow you to interact with

models

in Omni.

Create a model

Creates a new model. The typical workflow for using this endpoint is:

Create a schema model using this endpoint

Use the

refresh endpoint

to load the schema for the created model

Create shared models based on the schema model

POST /api/v1/models

curl -L -X POST 'https://myorg.omniapp.co/api/v1/models' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"connectionId": "conn_123",

"modelKind": "SCHEMA",

"modelName": "My New Model",

"accessGrants": [

"name": "test-grant",

"accessBoostable": true

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"model"

"baseModelId"

null

"connectionId"

"conn_123"

"createdAt"

"2023-01-01T00:00:00Z"

"deletedAt"

null

"id"

"model-id-1"

"modelKind"

"SCHEMA"

"name"

"My New Model"

"updatedAt"

"2023-01-01T00:00:00Z"

Field

Type

Description

model

object

The created model

model.baseModelId

string | null

ID of the base model (if applicable)

model.connectionId

string | null

ID of the connection

model.createdAt

string

Creation timestamp

model.deletedAt

string | null

Deletion timestamp (if deleted)

model.id

string

Model ID

model.modelKind

string | null

Type of model

model.name

string | null

Model name

model.updatedAt

string

Last update timestamp

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid request body

Bad Request: Invalid parameter value

Schema model already exists

Bad Request: Schema model already exists for the connection

Schema model does not exist

Bad Request: Schema model does not exist when creating a non-schema model

Branch schema refresh enabled

Bad Request: Shared model cannot be created when branch schema refresh is enabled

403 Forbidden

"detail"

"Forbidden"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

List models

Retrieves a paginated list of models with their metadata.

GET /api/v1/models

curl -L 'https://myorg.omniapp.co/api/v1/models' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Note

: All parameters must be provided as query parameters.

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"pageInfo"

"hasNextPage"

true

"nextCursor"

"next_page_cursor"

"pageSize"

"totalRecords"

"records"

"baseModelId"

null

"connectionId"

"conn_123"

"createdAt"

"2023-01-01T00:00:00Z"

"deletedAt"

null

"id"

"model-id-1"

"modelKind"

"SCHEMA"

"name"

"My Schema Model"

"updatedAt"

"2023-01-01T00:00:00Z"

Field

Type

Description

pageInfo

object

Pagination information

pageInfo.hasNextPage

boolean

Indicates if there are more records available

pageInfo.nextCursor

string | null

Cursor for the next page of results

pageInfo.pageSize

number

Number of records per page

pageInfo.totalRecords

number

Total number of records matching the query

records

array

List of model records

records.baseModelId

string | null

ID of the base model (if applicable)

records.branches

array

List of branch models (only included when

include=activeBranches

records.connectionId

string | null

ID of the connection

records.createdAt

string

Creation timestamp

records.deletedAt

string | null

Deletion timestamp (if deleted)

records.id

string

Model ID

records.modelKind

string | null

Type of model

records.name

string | null

Model name

records.updatedAt

string

Last update timestamp

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid query parameters

Bad Request: Invalid parameter value

403 Forbidden

"detail"

"Forbidden"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Delete a branch model

Deletes a branch associated with the specified shared model.

DELETE /api/v1/models/:modelId/branch/:branchName

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/models/123e4567-e89b-12d3-a456-426614174000/branch/feature-branch' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Note

: All parameters must be provided as URL parameters.

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"success"

true

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid

modelId

format

Bad Request: Invalid modelId format

Method not allowed

Bad Request: Method not allowed

403 Forbidden

"detail"

"Forbidden"

"status"

404 Not Found

"detail"

"Shared model or branch model does not exist"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Refresh a schema

Refreshes the schema of the specified model. This will cause the model to reflect the latest changes to schemas, views, and fields from the data source.

Note

: This will remove structures that are no longer present in the source, but not anything created by users.

POST /api/v1/models/:id/refresh

curl -L -X POST 'https://myorg.omniapp.co/api/v1/models/bc1f9c9f-208d-48a2-9ae3-ff80f2c79fed/refresh' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Name

Type

Required

Description

URL parameter

The ID of the model to be refreshed.

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"modelId"

"bc1f9c9f-208d-48a2-9ae3-ff80f2c79fed"

"status"

"running"

Field

Type

Description

modelId

string

ID of the model

status

string

Status of the schema refresh. This value will be

running

to indicate that the refresh has started.

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid model ID

Bad Request: modelId: Invalid uuid

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Reset a cache policy

info

Reach out to Omni support to enable this API.

Resets the cache for the specified cache policy.

Basic request

With reset date

POST /api/v1/models/:modelId/cache_reset/:cachePolicyName

curl -L -X POST 'https://myorg.omniapp.co/api/v1/models/bc1f9c9f-208d-48a2-9ae3-ff80f2c79fed/cache_reset/daily_cache_policy' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

POST /api/v1/models/:modelId/cache_reset/:cachePolicyName

curl -L -X POST 'https://myorg.omniapp.co/api/v1/models/bc1f9c9f-208d-48a2-9ae3-ff80f2c79fed/cache_reset/daily_cache_policy' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"resetAt": "2025-01-30T22:30:52.872Z"

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"cache_reset"

"id"

"98e14685-597b-4887-a50f-34e93985e00d"

"model_id"

"bc1f9c9f-208d-48a2-9ae3-ff80f2c79fed"

"policy_name"

"daily_cache_policy"

"created_at"

"2025-03-24T21:30:18.561Z"

"updated_at"

"2025-05-19T20:42:50.194Z"

"reset_at"

"2025-05-19T20:42:50.189Z"

"success"

true

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid model UUID

Model with id <modelId> does not exist"

resetAt

must be in the past

resetAt cannot be future dated

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

Model not found

Model with id <modelId> does not exist"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create or overwrite YAML file

info

The

Create or overwrite YAML file

endpoint is in beta.

Creates or overwrites a YAML file for a model. The file can be a special file (

model

relationships

) or a YAML file ending in

.topic

.view

Limitations

The following models can't be edited using this endpoint:

Schema models

Models using git follower mode

Basic request

Remove file

Ignore file

POST /api/unstable/models/:modelId/yaml

curl -L -X POST 'https://docs.playground.exploreomni.dev/api/unstable/models/9d9440e5-8522-4507-b092-1ac26ba26673/yaml' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"fileName": "blob_sales.topic",

"yaml": "label: Blobs R Us Sales",

"mode": "combined",

"commitMessage": "Add Sales topic"

Empty

yaml

and

mode:extension

will remove the specified YAML file:

POST /api/unstable/models/:modelId/yaml

curl -L -X POST 'https://docs.playground.exploreomni.dev/api/unstable/models/9d9440e5-8522-4507-b092-1ac26ba26673/yaml' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"fileName": "blob_sales.topic",

"yaml": "",

"mode": "extension",

"commitMessage": "Add Sales topic"

Empty

yaml

and

mode:combined

will ignore the specified YAML file:

POST /api/unstable/models/:modelId/yaml

curl -L -X POST 'https://docs.playground.exploreomni.dev/api/unstable/models/9d9440e5-8522-4507-b092-1ac26ba26673/yaml' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"fileName": "blob_sales.topic",

"yaml": "",

"mode": "combined",

"commitMessage": "Add Sales topic"

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK status

and a response body similar to the following:

"fileName"

"example.topic"

"success"

true

400 Bad Request

"detail"

"<error>"

"status"

Error

Error detail

Missing required parameter

<parameter>: <parameter> is required

Invalid model ID

modelId: Invalid uuid

Invalid branch ID

branchId: Invalid uuid

Invalid paramater value

<parameter>: Invalid value <description>

403 Forbidden

"detail"

"<error>"

"status"

Error

Error detail

Insufficient permissions

Permission denied

Feature not enabled

Feature not enabled

404 Not Found

"detail"

"<error>"

"status"

Error

Error detail

Model not found

Model with id {modelId} does not exist

Branch not found

Branch does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Retrieve model YAML specification

info

The

Retrieve model YAML specification

endpoint is in beta.

Retrieves the YAML representation of a model with optional filtering and mode selection.

Basic request

With branch ID

Filter by file name

Filter by regex pattern

Extension mode

GET /api/unstable/models/:modelId/yaml

curl -L 'https://myorg.omniapp.co/api/unstable/models/123e4567-e89b-12d3-a456-426614174000/yaml' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

GET /api/unstable/models/:modelId/yaml?branchId=<branchId>

curl -L 'https://myorg.omniapp.co/api/unstable/models/123e4567-e89b-12d3-a456-426614174000/yaml?branchId=987fcdeb-a89b-12d3-a456-426614174000' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

GET /api/unstable/models/:modelId/yaml?fileName=<fileName>

curl -L 'https://myorg.omniapp.co/api/unstable/models/123e4567-e89b-12d3-a456-426614174000/yaml?fileName=customers' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

GET /api/unstable/models/:modelId/yaml?fileName=<regexPattern>

curl -L 'https://myorg.omniapp.co/api/unstable/models/123e4567-e89b-12d3-a456-426614174000/yaml?fileName=^views/.*\\.yaml$' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

GET /api/unstable/models/:modelId/yaml?mode=extension

curl -L 'https://myorg.omniapp.co/api/unstable/models/123e4567-e89b-12d3-a456-426614174000/yaml?mode=extension' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"files"

"model.yaml"

"name: Test Model\ntype: model"

"views/customers.yaml"

"name: Customers\nfields: []"

"views/orders.yaml"

"name: Orders\nfields: []"

"version"

"viewNames"

Field

Type

Description

files

object

Map of file paths to YAML content

version

number

Version of the YAML

viewNames

object

Map of view names to their definitions

400 Bad Request

"detail"

"Schema models do not have branches"

"detail"

"Branches are not valid for workbook models with mode=extension, staged"

403 Forbidden

"detail"

"Permission denied"

"detail"

"Feature not enabled"

404 Not Found

"detail"

"Model with id {modelId} does not exist"

"detail"

"Branch does not exist"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

500 Internal Server Error

"detail"

"Failed to get model YAML"

Retrieve model validation issues

Retrieves validation issues for a model and its branches.

Basic request

Validate branch

GET /api/v1/models/:modelId/validate

curl -L 'https://myorg.omniapp.co/api/v1/models/123e4567-e89b-12d3-a456-426614174000/validate' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

GET /api/v1/models/:modelId/validate?branchId=<branchId>

curl -L "https://myorg.omniapp.co/api/v1/models/123e4567-e89b-12d3-a456-426614174000/validate?branchId=123e4567-e89b-12d3-a456-426614174001" \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"message"

"No view \"api\". Set base_view to a valid, existing view."

"is_warning"

false

"yaml_path"

"api.topic"

"auto_fix"

"description_short"

"Delete topic \"api\""

"description_unique"

"Delete topic \"api\""

"message"

"No view \"blob_sales\". Set base_view to a valid, existing view."

"is_warning"

false

"yaml_path"

"blob_sales.topic"

"auto_fix"

"description_short"

"Delete topic \"blob_sales\""

"description_unique"

"Delete topic \"blob_sales\""

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid

modelId

UUID

modelId: Invalid uuid

Validating a schema model with branches

Schema models do not have branches

Invalid query parameters

Unrecognized key(s) in object: '<invalidParameter>'

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

Model not found

Model with id {modelId} does not exist

Branch not found

Branch model with id {branchId} does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

500 Internal Server Error

"detail"

"Model service error"

"status"

Create a model

Parameters

Response

List models

Parameters

Response

Delete a branch model

Parameters

Response

Refresh a schema

Parameters

Response

Reset a cache policy

Parameters

Response

Create or overwrite YAML file

Limitations

Parameters

Response

Retrieve model YAML specification

Parameters

Response

Retrieve model validation issues

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/model](https://docs.omni.co/docs/API/model) on 2025-07-23.*
