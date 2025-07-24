# Omni document permission APIs

**Source URL:** [https://docs.omni.co/docs/API/document-permissions](https://docs.omni.co/docs/API/document-permissions)  
**Extracted:** 2025-07-23 21:43:34  
**Source:** Omni Analytics Documentation

---

On this page

The document permission APIs allow you to manage the

permissions

documents

in Omni. To create and manage documents, use the

Document APIs

Document permission object

Represents a document permission in Omni.

Example

Fields

"description"

"Organization"

"direct"

"accessBoost"

false

"isOwner"

false

"role"

"VIEWER"

"id"

"df290ed4-b721-4efe-914b-95d30ce1c5f2"

"name"

"Organization"

"type"

"user"

Loading data...

Add document permissions

Grants document permissions to users or user groups.

Individual users

User groups

POST /api/v1/documents/:documentId/permissions

curl -L -X POST 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"role": "VIEWER",

"accessBoost": false,

"userIds": ["f4df8d6e-7f69-4d54-b23b-7abfe5c4da74"]

POST /api/v1/documents/:documentId/permissions

curl -L -X POST 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"role": "EDITOR",

"accessBoost": false,

"userGroups": ["mEhXj6ZI"]

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"success"

true

400 Bad Request

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Missing

userId

userGroupIds

parameter

userIds.userGroupIds: userIds or userGroupIds must be provided

Invalid

userId

value

userIds.0: Invalid uuid

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage document permissions"

"status"

The user sending the API request must have

Manager

permissions for the document.

404 Not Found

"detail"

"Document with identifier \"<documentId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Update document permissions

Updates existing document permissions for users or user groups.

Individual users

User groups

PATCH /api/v1/documents/:documentId/permissions

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"role": "VIEWER",

"accessBoost": false,

"userIds": ["f4df8d6e-7f69-4d54-b23b-7abfe5c4da74"]

PATCH /api/v1/documents/:documentId/permissions

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"role": "EDITOR",

"accessBoost": false,

"userGroups": ["mEhXj6ZI"]

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"success"

true

400 Bad Request

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Missing

userId

userGroupIds

parameter

userIds.userGroupIds: userIds or userGroupIds must be provided

Invalid

userId

value

userIds.0: Invalid uuid

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage document permissions"

"status"

The user sending the API request must have

Manager

permissions for the document.

404 Not Found

"detail"

"Document with identifier \"<documentId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Update document permission settings

Updates the permission and

interactivity settings

for a document. For example, the ability to allow users to schedule or download the document's content.

PUT /api/v1/documents/:documentId/permissions

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"organizationRole": "VIEWER",

"organizationAccessBoost": false,

"canDownload": true,

"canDrill": true,

"canSchedule": true,

"canUpload": true,

"canViewWorkbook": true

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"success"

true

400 Bad Request

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Invalid parameter value

<parameter>: Invalid <parameter>

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage document permissions"

"status"

The user sending the API request must have

Manager

permissions for the document.

404 Not Found

"detail"

"Document with identifier \"<documentId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Retrieve document permissions for a user

GET /api/v1/documents/:documentId/permissions

curl -L 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>>' \

-H 'Content-Type: application/json' \

-d '{

"userId": "f4df8d6e-7f69-4d54-b23b-7abfe5c4da74"

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"success"

true

400 Bad Request

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Missing

userId

parameter

userId: userId must be provided

Invalid

userId

value

userId: Invalid userId

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage document permissions"

"status"

The user sending the API request must have

Manager

permissions for the document.

404 Not Found

"detail"

"Document with identifier \"<documentId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Revoke document permissions

Revokes document permissions for users or user groups.

Individual users

User groups

DELETE /api/v1/documents/:documentId/permissions

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"userIds": ["f4df8d6e-7f69-4d54-b23b-7abfe5c4da74"]

DELETE /api/v1/documents/:documentId/permissions

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/documents/12db1a0a/permissions' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"userGroups": ["mEhXj6ZI"]

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"success"

true

400 Bad Request

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Missing

userId

parameter

userId: userId must be provided

Invalid

userId

value

userId: Invalid userId

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage document permissions"

"status"

The user sending the API request must have

Manager

permissions for the document.

404 Not Found

"detail"

"Document with identifier \"<documentId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Document permission object

Add document permissions

Parameters

Response

Update document permissions

Parameters

Response

Update document permission settings

Parameters

Response

Retrieve document permissions for a user

Parameters

Response

Revoke document permissions

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/document-permissions](https://docs.omni.co/docs/API/document-permissions) on 2025-07-23.*
