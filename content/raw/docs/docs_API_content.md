# Omni content APIs

**Source URL:** [https://docs.omni.co/docs/API/content](https://docs.omni.co/docs/API/content)  
**Extracted:** 2025-07-23 21:43:33  
**Source:** Omni Analytics Documentation

---

On this page

The content APIs allow you to interact with both

documents

and

folders

in Omni through a unified interface.

Content object

Represents either a document or folder in Omni. The specific fields available depend on the

type

field.

Example

Fields

"type"

"document"

"identifier"

"doc123"

"name"

"Monthly Metrics"

"scope"

"organization"

"owner"

"id"

"123e4567-e89b-12d3-a456-426614174000"

"name"

"Jane Smith"

"connectionId"

"789e0123-e45b-67d8-a456-426614174000"

"deleted"

false

"folder"

null

Field

Type

Description

type

string

Content type, either

document

folder

string

Unique identifier of the content

name

string

Name of the content

scope

string

Content scope:

restricted

organization

public

owner

object

Owner details

owner.id

string

UUID of the owner

owner.name

string

Name of the owner

Document-specific fields (when type is "document")

identifier

string

Unique identifier of the document

connectionId

string

ID of the connection the document uses

deleted

boolean

Whether the document has been deleted

folder

object|null

Folder details, null if not in a folder

Folder-specific fields (when type is "folder")

path

string

Path of the folder

labels

array

Array of label objects

List content

Retrieves a paginated list of documents and folders. This endpoint supports filtering, sorting, and cursor-based pagination.

Basic request

With includes

Filters & sorting

GET /api/v1/content

curl -L 'https://myorg.omniapp.co/api/v1/content' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/content?include=_count,labels

curl -L 'https://myorg.omniapp.co/api/v1/content?include=_count,labels' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/content?labels=<labels>&scope=<scope>&sortField=<field>

curl -L 'https://myorg.omniapp.co/api/v1/content?labels=finance,marketing&scope=organization&sortField=favorites' \

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

- Adds count metrics:

Folders: number of documents and favorites

Documents: number of favorites and views

labels

- Includes associated content labels

creatorId

string

No*

null

UUID of organization membership (*Required for restricted scope)

folderId

string

null

UUID of folder to filter content by

labels

string

null

Comma-separated list of labels (e.g.,

finance,marketing

path

string

null

Path pattern to filter by (e.g.,

/folder/subfolder

/folder/*

scope

string

organization

Content scope (

organization

restricted

pageSize

number

Items per page:

Minimum

- 1

Maximum

- 100

sortField

string

name

Field to sort by:

name

- Sort by content name

favorites

- Sort by favorite count

sortDirection

string

desc

Sort direction (

asc

desc

cursor

string

null

Cursor for pagination

Response

200 OK

Successful requests return a

200 OK

status and a response body similar to:

"records"

"type"

"folder"

"id"

"550e8400-e29b-41d4-a716-446655440000"

"name"

"Analytics"

"path"

"analytics"

"scope"

"organization"

"owner"

"id"

"123e4567-e89b-12d3-a456-426614174000"

"name"

"Jane Smith"

"labels"

"name"

"reports"

"verified"

true

"type"

"document"

"identifier"

"doc123"

"name"

"Monthly Metrics"

"scope"

"organization"

"owner"

"id"

"123e4567-e89b-12d3-a456-426614174000"

"name"

"Jane Smith"

"connectionId"

"789e0123-e45b-67d8-a456-426614174000"

"deleted"

false

"folder"

null

"pageInfo"

"hasNextPage"

true

"nextCursor"

"Product Analytics"

"pageSize"

"totalRecords"

400 Bad Request

Results from invalid request parameters. Response bodies will be similar to:

"detail"

"Bad Request: <errorReason>"

"status"

Common error cases:

Page size must be at least 1

Page size cannot exceed 100

Invalid

sort

field

creatorId

required when

scope

restricted

Unrecognized query parameters

404 Not Found

Returned when the specified creator cannot be found:

"detail"

"User with id <uuid> does not exist"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Content object

List content

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/content](https://docs.omni.co/docs/API/content) on 2025-07-23.*
