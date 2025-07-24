# Omni folder APIs

**Source URL:** [https://docs.omni.co/docs/API/folders](https://docs.omni.co/docs/API/folders)  
**Extracted:** 2025-07-23 21:43:36  
**Source:** Omni Analytics Documentation

---

On this page

The folder APIs allow you to manage and organize content hierarchically within your Omni organization.

Folder object

Represents a folder in Omni.

Example

Fields

"id"

"folder123"

"name"

"Documents"

"path"

"/documents"

"scope"

"organization"

"type"

"folder"

"owner"

"id"

"user123"

"name"

"John Smith"

"labels"

"important"

"archived"

"_count"

"documents"

"favorites"

Field

Type

Description

string

Unique identifier for the folder

name

string

Display name of the folder

path

string

Full path to the folder

scope

string

Visibility scope. Must be one of:

organization

- Organization-wide access

restricted

- Limited access

owner

object

Information about the folder owner containing

(string) and

name

(string)

labels

array

List of labels associated with the folder. Only included when requested via

include

parameter.

_count

object

Contains count information. Only included when requested via

include

parameter.

_count.documents

number

Number of documents contained in the folder

_count.favorites

number

Number of users who favorited this folder

Create a folder

Creates a new folder. Folders can be nested up to 7 levels.

Folder paths are automatically generated based on hierarchy. This means that child folder paths will include the paths of their parents.

Basic request

Nested folder

POST /api/v1/folders

curl -L -X POST 'https://myorg.omniapp.co/api/v1/folders' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"name": "Root Folder",

"scope": "restricted"

POST /api/v1/folders

curl -L -X POST 'https://myorg.omniapp.co/api/v1/folders' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"name": "Child Folder",

"parentFolderId": "parent-folder-id",

"scope": "restricted"

Parameters

Loading parameters...

Response

201 Created

Successful requests will return a

201 Created

status and a response body similar to the following:

"id"

"folder123"

"name"

"Root Folder"

"path"

"/root-folder"

"scope"

"restricted"

"owner"

"id"

"user123"

"name"

"John Smith"

Field

Type

Description

string

Unique identifier for the created folder

name

string

Display name of the folder

path

string

Full path to the folder

scope

string

Visibility scope of the folder

owner

object

Information about the folder owner containing

and

name

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid JSON

Bad Request: Invalid JSON

Missing required fields

Bad Request: name: Required

Folder nesting limit

Bad Request: Maximum folder nesting depth reached

Scope mismatch

Bad Request: Child folder scope must match parent folder scope

404 Not Found

"detail"

"<errorReason>"

"status"

Issue

Error detail

Parent folder not found

Parent folder with id <parentFolderId> does not exist

User not found

User with id <userId> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

List folders

Retrieves a paginated list of folders within an organization. This endpoint supports filtering, sorting, and cursor-based pagination.

Basic request

With includes

Path filtering

Filters & sorting

Pagination with cursor

GET /api/v1/folders

curl -L 'https://myorg.omniapp.co/api/v1/folders' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/folders?include=_count,labels

curl -L 'https://myorg.omniapp.co/api/v1/folders?include=_count,labels' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/folders?path=/documents/*

curl -L 'https://myorg.omniapp.co/api/v1/folders?path=/documents/*' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/folders?labels=<labels>&scope=<scope>&sortField=<field>&sortDirection=<direction>

curl -L 'https://myorg.omniapp.co/api/v1/folders?labels=important,archived&scope=restricted&sortField=name&sortDirection=desc' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/folders?cursor=<cursor>&pageSize=<size>

curl -L 'https://myorg.omniapp.co/api/v1/folders?cursor=eyJpZCI6ImZvbGRlcjEyMyJ9&pageSize=20' \

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

"records"

"id"

"folder123"

"name"

"Documents"

"path"

"/documents"

"scope"

"organization"

"owner"

"id"

"user123"

"name"

"John Smith"

"labels"

"important"

"archived"

"_count"

"documents"

"favorites"

"pageInfo"

"hasNextPage"

true

"nextCursor"

"eyJpZCI6ImZvbGRlcjEyMyJ9"

"pageSize"

"totalRecords"

Field

Type

Description

records

array

Array of

folder objects

matching the query

pageInfo

object

Information about the current page of results

pageInfo.hasNextPage

boolean

true

, another page of results exists

pageInfo.nextCursor

string

Base64 encoded cursor for the next page

pageInfo.pageSize

number

Number of items on the current page

pageInfo.totalRecords

number

Total number of matching records

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid page size

Bad Request: pageSize: Page size must be at least 1

Missing required ownerId

Bad Request: ownerId: ownerId is required when scope is 'restricted'

Invalid sort field

Bad Request: sortField: Invalid enum value. Expected 'name' | 'path', received '&lt;invalidField&gt;'

Invalid include parameter

Bad Request: include: Invalid value. Expected: _count, labels, received '&lt;invalidValue&gt;'

Invalid path pattern

Bad Request: Invalid path pattern. Only a single wildcard (*) is allowed at the end of the pattern

404 Not Found

"detail"

"<errorReason>"

"status"

Issue

Error detail

Parent folder not found

Folder with path <path> does not exist

Owner membership not found

User membership not found

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Delete a folder

Deletes an empty folder. This operation will only succeed if the folder has no documents or subfolders.

DELETE /api/v1/folders/:folderId

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/folders/ce3b1dcd-c768-4f01-a479-353325c4c5b0' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

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

Indicates if the folder was successfully deleted

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Folder has documents

Folders with documents cannot be deleted

Folder has subfolders

Only empty folders can be deleted

404 Not Found

"detail"

"Folder with id ce3b1dcd-c768-4f01-a479-353325c4c5b0 does not exist"

"status"

Issue

Error detail

Folder not found

Folder with id <folderId> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Folder object

Create a folder

Parameters

Response

List folders

Parameters

Response

Delete a folder

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/folders](https://docs.omni.co/docs/API/folders) on 2025-07-23.*
