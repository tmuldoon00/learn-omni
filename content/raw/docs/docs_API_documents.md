# Omni document APIs

**Source URL:** [https://docs.omni.co/docs/API/documents](https://docs.omni.co/docs/API/documents)  
**Extracted:** 2025-07-23 21:43:35  
**Source:** Omni Analytics Documentation

---

On this page

The document APIs allow you to interact with

documents

in Omni. To manage document permissions and interactivity, use the

Document permission APIs

Document object

Represents a document in Omni.

Example

Fields

"connectionId"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"deleted"

false

"folder"

"id"

"ce3b1dcd-c768-4f01-a479-353325c4c5b0"

"name"

"In Progress Reports"

"path"

"in-progress-reports"

"scope"

"organization"

"identifier"

"12db1a0a"

"labels"

"name"

"Marketing"

"verified"

false

"name"

"Blob Web Traffic"

"owner"

"id"

"9e8719d9-276a-4964-9395-a493189a247c"

"name"

"Blobby"

"scope"

"public"

"type"

"document"

"updatedAt"

"2025-01-07T10:00:00Z"

Field

Type

Description

connectionId

string

ID of the

database connection

the document is built on

deleted

boolean

Whether the document has a non-normal status

folder

object

Folder

details. Will be

null

if the document isn't in a folder.

folder.id

string

Unique identifier of the folder

folder.name

string

Name of the folder (1-255 characters)

folder.path

string

Path of the folder

folder.scope

string

Scope of the folder:

restricted

organization

public

identifier

string

Unique identifier of the document. Corresponds to the

Identifier

field in the document's settings.

labels

array of objects

Labels

associated with the document

labels.name

string

Name of the label

labels.verified

boolean

Whether the label is

verified

name

string

Name of the document

owner

object

Details about the document owner

owner.id

string

UUID of the user that owns the document

owner.name

string

Name of the owner

scope

string

Document scope, indicating the level of access the document has:

restricted

organization

public

type

string

Type of content, always set to

document

updatedAt

string

ISO-8601 formatted date-time of last update

_count

object

Count information. Only included when requested via

include

parameter.

_count.favorites

number

Number of users who have favorited this document

_count.views

number

Number of times users have viewed this document

Create a document

Creates a document.

Basic request

Document with queries

POST /api/v1/documents

curl -L -X POST 'https://myorg.omniapp.co/api/v1/documents' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"modelId": "3fb59130-54fc-4848-832f-d22f61933485",

"name": "New Blobby Sales"

POST /api/v1/documents

curl -L -X POST 'https://myorg.omniapp.co/api/v1/documents' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"modelId": "3fb59130-54fc-4848-832f-d22f61933485",

"name": "New Blobby Sales",

"queryPresentations":[

"name": "Order Items",

"description": "Analyzing different order items.",

"query":{

"fields":[

"order_items.count"

"table": "order_items"

"visConfig":{

"chartType":"lineColor"

"name": "Order Sales",

"description": "Analyzing total sales.,

"query":{

"fields":[

"orders.count"

"table": "orders"

"visConfig":{

"chartType": "lineColor"

Parameters

Name

Type

Required

Default

Description

modelId

string

Yes

n/a

The ID of the model to build the document on

name

string

Yes

n/a

The name of the document

queryPresentations

array of objects

n/a

An array of

queryPresentation

objects, each representing a query in the document's workbook

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"dashboard"

"id"

"54665902-2c6d-4def-828b-1c0ff26e8ebd"

"createdAt"

"2025-03-11T17:47:37.602Z"

"updatedAt"

"2025-03-11T17:47:37.602Z"

"metadata"

"layouts"

"lg"

"h"

"i"

"1"

"w"

"x"

"y"

"h"

"i"

"2"

"w"

"x"

"y"

"textTiles"

"hiddenTiles"

"tileSettings"

"tileFilterMap"

"tileControlMap"

"metadataVersion"

"refreshInterval"

null

"facetFilters"

false

"organizationId"

"df290ed4-b721-4efe-914b-95d30ce1c5f2"

"workbookId"

"0d3eaaff-7558-41e7-af3e-8c625ce36510"

"creatorId"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"updaterId"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"queryPresentationCollectionId"

"09897dfb-0f93-41b3-8919-1c9a1d5e96bb"

"dashboardId"

"54665902-2c6d-4def-828b-1c0ff26e8ebd"

"workbook"

"id"

"0d3eaaff-7558-41e7-af3e-8c625ce36510"

"createdAt"

"2025-03-11T17:47:37.494Z"

"updatedAt"

"2025-03-11T17:47:37.523Z"

"deletedAt"

null

"publishedAt"

"2025-03-11T17:47:37.522Z"

"isDraft"

false

"identifier"

"8bc04351"

"name"

"New Blobby Sales"

"lastItemIndex"

"ephemeral"

"1:R0P-EHDd,2:VrAcHXM7"

"organizationRole"

null

"organizationAccessBoost"

false

"publicRole"

null

"publicAccessBoost"

false

"canAnalyze"

true

"canDownload"

true

"canDrill"

true

"canSchedule"

true

"canUpload"

true

"canViewWorkbook"

false

"organizationId"

"df290ed4-b721-4efe-914b-95d30ce1c5f2"

"ownerId"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"updaterId"

"c5e5b577-8c64-48d4-8840-fbe41f924ae4"

"folderId"

null

"originDocumentId"

null

"documentId"

"0d3eaaff-7558-41e7-af3e-8c625ce36510"

400 Bad Request

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Missing

modelId

parameter

Bad Request: modelId: Required

Missing

name

parameter

Bad Request: name: Required

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

List documents

Retrieves a paginated list of document items. This endpoint supports filtering, sorting, and cursor-based pagination.

Deleted documents are excluded unless the

includeDeleted

parameter is included in the request.

Basic request

With includes

Filters & sorting

Pagination with cursor

Filter by user access

GET /api/v1/documents

curl -L 'https://myorg.omniapp.co/api/v1/documents' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/documents?include=_count

curl -L 'https://myorg.omniapp.co/api/v1/documents?include=_count' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Include deleted documents

GET /api/v1/documents?include=includeDeleted

curl -L 'https://myorg.omniapp.co/api/v1/documents?include=includeDeleted' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/documents?labels=<labels>&pageSize=<size>&sortField=<field>&sortDirection=<direction>

curl -L 'https://myorg.omniapp.co/api/v1/documents?labels=finance,marketing&pageSize=10&sortField=updatedAt&sortDirection=desc' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/documents?cursor=<documentName>&pageSize=<size>

curl -L 'https://myorg.omniapp.co/api/v1/documents?cursor=Product Totals&pageSize=20' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/documents?userId=<userId>

curl -L 'https://myorg.omniapp.co/api/v1/documents?userId=9e8719d9-276a-4964-9395-a493189a247c' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Parameters

Note

: All parameters must be provided as query parameters.

Parameter

Type

Required

Default

Description

include

string

null

Comma-separated list of additional fields to include in the response:

_count

- Adds favorite and view count metrics

labels

- Includes associated document labels

includeDeleted

- Include deleted documents

cursor

string

null

Cursor for pagination. Used with

sortField

sortDirection

for relative positioning.

pageSize

number

The number of items to retrieve per page:

Minimum

- 1

Maximum

- 100

sortField

string

desc

Field to sort by. Must be one of the following:

favorites

- Sort by the number of favorites

name

- Sort by document

name

updatedAt

- Sort by last update time

visits

- Sorts by view count

sortDirection

string

desc

Direction to sort results. Must be

asc

(ascending) or

desc

(descending).

labels

string

null

Comma-separated list of labels to filter results. For example:

finance,marketing

folderId

string

null

ID of the folder to filter results. Will only return documents within the specified folder.

creatorId

string

null

UUID of the user who created the document(s). Retrieve user IDs with the

List users

and

Retrieve a user

endpoints.

userId

string

null

UUID of a user to filter documents by. Returns only documents the specified user can view based on their permissions within the organization. The user must be a member of the organization.

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"pageInfo"

"hasNextPage"

true

"nextCursor"

"Product Totals"

"pageSize"

"totalRecords"

"records"

"connectionId"

"c0f12353-4817-4398-bcc0-d501e6dd2f64"

"deleted"

false

"folder"

"id"

"ce3b1dcd-c768-4f01-a479-353325c4c5b0"

"name"

"In Progress Reports"

"path"

"in-progress-reports"

"scope"

"organization"

"identifier"

"12db1a0a"

"labels"

"name"

"Marketing"

"verified"

false

"name"

"Blob Web Traffic"

"owner"

"id"

"9e8719d9-276a-4964-9395-a493189a247c"

"name"

"Blobby"

"scope"

"public"

"type"

"document"

"updatedAt"

"2025-01-07T10:00:00Z"

"_count"

"favorites"

"views"

Field

Type

Description

records

array of objects

An array of

document objects

that meet the provided filters, if provided.

pageInfo

object

An object containing information about the current page of results.

pageInfo.hasNextPage

boolean

true

, another page of results exists.

pageInfo.nextCursor

string

The

name

of the document that begins the next page of results. Provide this value as the

cursor

to retrieve the next page.

pageInfo.pageSize

string

The total number of items on the current page.

pageInfo.totalItems

number

The total number of items in the results set, across all pages.

400 Bad Request

Results from invalid request parameters. Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

pageSize

cannot be 0

Bad Request: pageSize: Page size must be at least 1

pageSize

cannot exceed

Bad Request: pageSize: Page size cannot exceed 100

Invalid

sortField

Bad Request: sortField: Invalid enum value. Expected 'favorites' | 'name' | 'updatedAt' | 'visits', received '<invalidField>'

Invalid

creatorId

format

Bad Request: creatorId: Invalid uuid

Invalid

userId

format

Bad Request: userId: Invalid uuid

Unknown query parameter

Bad Request: formErrors: Unrecognized key(s) in object: '<unknownParameter>'

404 Not Found

Results from the provided

creatorId

userId

not being found.

Note

: An invalid uuid will result in a

. In this situation, the provided ID is a valid uuid, but it cannot be found.

Response bodies will be an object similar to the following:

"detail"

"User with id <uuid> does not exist"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

500 Internal Server Error

Move a document

Moves a document to a new folder or to the root level (no folder). This endpoint can also be used to change a document's scope.

Move to specified folder

Move to root level

Move & set scope

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/move' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"folderPath": "marketing/campaigns"

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/move' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"folderPath": null

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/move' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"folderPath": "marketing/campaigns",

"scope": "organization"

Parameters

Parameter

Type

Required

Default

Description

identifier

URL parameter

Yes

The ID of the document to be moved. To retrieve the ID, navigate to

File > Document settings

in the document and then click

Settings

. The

Identifier

field

contains the document ID.

folderPath

string | null

Yes

The path of the destination folder. Use

null

to move the document to the root level (no folder).

scope

string

Computed

Optional sharing scope for the document. Must be one of:

organization

- Organization-wide access

restricted

- Limited access

If not provided, the scope will be computed based on the document or the destination folder, if provided.

Note

: When providing a scope, it must match the destination folder's scope.

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

Issue

Error detail

Scope mismatch

Scope "restricted" and folder scope "organization" do not match

Invalid method

Invalid method

404 Not Found

"detail"

"<errorReason>"

"status"

Issue

Error detail

Document not found

Document with identifier "<documentId>" not found

Folder not found

Folder with path <path> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Delete a document

Deletes the specified document. Deleted documents will be placed in the

Trash

DELETE /api/v1/documents/:documentId

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/documents/8bc04351' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Parameters

Note

: All parameters must be provided as query parameters.

Parameter

Type

Required

Default

Description

documentId

string

Yes

n/a

The ID of the document to be deleted. To retrieve the ID, navigate to

File > Document settings

in the document and then click

Settings

. The

Identifier

field

contains the document ID.

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"success"

true

404 Not Found

Returned when the specified document cannot be found:

"detail"

"Document with identifier \"<documentId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Retrieve document queries

tip

Check out the

Running document queries with APIs guide

to learn how to programmatically run the queries you retrieve with this API.

Retrieves queries associated with a document by its identifier.

GET /api/v1/documents/:identifier/queries

curl -L 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/queries' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Parameters

Parameter

Type

Required

Default

Description

identifier

URL parameter

Yes

The unique identifier of the document. This can be retrieved by:

Opening the document settings. Navigate to

File > Document settings

in the document and then click

Settings

. The

Identifier

field contains the document ID.

Using the dashboard's URL. The string after

/dashboards/

is the dashboard's identifier; for example:

https://myorg.omniapp.co/dashboards/12db1a0a

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"queries"

"id"

"f9467f90-b430-4381-b6b3-03436398421a"

"name"

"Monthly Sales"

"query"

"limit"

"sorts"

"column_name"

"order_items.created_at[month]"

"sort_descending"

false

"table"

"order_items"

"fields"

"order_items.created_at[month]"

"order_items.sale_price_sum"

"filters"

"id"

"e8356bf1-be3a-4277-bd3c-9d4d54829b96"

"name"

"Product Categories"

"query"

"limit"

"sorts"

"column_name"

"products.category"

"sort_descending"

false

"table"

"products"

"fields"

"products.category"

"order_items.count"

"filters"

Field

Type

Description

queries

array

An array of queries used in the document

queries[].id

string

The UUID of the query

queries[].name

string

The name of the query

queries[].query

object

The query JSON structure that can be used with the

Query API

403 Forbidden

"detail"

"User cannot view document"

"status"

Issue

Error detail

Insufficient permissions

User cannot view document

404 Not Found

"detail"

"Document with id 12345678 does not exist"

"status"

Issue

Error detail

Document not found

Document with id <identifier> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Document object

Create a document

Parameters

Response

List documents

Parameters

Response

Move a document

Parameters

Response

Delete a document

Parameters

Response

Retrieve document queries

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/documents](https://docs.omni.co/docs/API/documents) on 2025-07-23.*
