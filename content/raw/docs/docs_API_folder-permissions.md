# Omni folder permission APIs

**Source URL:** [https://docs.omni.co/docs/API/folder-permissions](https://docs.omni.co/docs/API/folder-permissions)  
**Extracted:** 2025-07-23 21:43:35  
**Source:** Omni Analytics Documentation

---

On this page

The folder permission APIs allow you to manage the

permissions

folders

in Omni. To create and manage folders, use the

folder APIs

Folder permission object

Represents a folder permission in Omni.

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

Add folder permissions

Grants folder permissions to users or user groups.

Individual users

User groups

POST /api/v1/folders/:folderId/permissions

curl -L -X POST 'https://myorg.omniapp.co/api/v1/folders/21db26b3-466c-4791-90e7-b9ce9375426d/permissions' \

-H 'Authentication: Bearer <TOKEN>>' \

-H 'Content-Type: application/json' \

-d '{

"role": "VIEWER",

"accessBoost": false,

"userIds": ["f4df8d6e-7f69-4d54-b23b-7abfe5c4da74"]

POST /api/v1/folders/:folderId/permissions

curl -L -X POST 'https://myorg.omniapp.co/api/v1/folders/21db26b3-466c-4791-90e7-b9ce9375426d/permissions' \

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

Invalid

userGroupIds

value

userGroupIds.0: Invalid uuid

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage folder permissions"

"status"

The user sending the API request must have

Manager

permissions for the folder.

404 Not Found

"detail"

"Folder with identifier \"<folderId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Update folder permissions

Updates existing folder permissions for users or user groups.

Individual users

User groups

PATCH /api/v1/folders/:folderId/permissions

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/folders/21db26b3-466c-4791-90e7-b9ce9375426d/permissions' \

-H 'Authentication: Bearer <TOKEN>>' \

-H 'Content-Type: application/json' \

-d '{

"role": "VIEWER",

"accessBoost": false,

"userIds": ["f4df8d6e-7f69-4d54-b23b-7abfe5c4da74"]

PATCH /api/v1/folders/:folderId/permissions

curl -L -X PATCH 'https://myorg.omniapp.co/api/v1/folders/21db26b3-466c-4791-90e7-b9ce9375426d/permissions' \

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

Invalid

userGroupIds

value

userGroupIds.0: Invalid uuid

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage folder permissions"

"status"

The user sending the API request must have

Manager

permissions for the folder.

404 Not Found

"detail"

"folder with identifier \"<folderId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Retrieve folder permissions for a user

GET /api/v1/folders/:folderId/permissions

curl -L 'https://myorg.omniapp.co/api/v1/folders/21db26b3-466c-4791-90e7-b9ce9375426d/permissions' \

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

"permits"

"description"

"Organization - via Folder"

"direct"

"accessBoost"

false

"role"

"EDITOR"

"id"

"ORG-MEMBERSHIP"

"name"

"Blobby"

"type"

"user"

"direct"

"accessBoost"

false

"role"

"VIEWER"

"id"

"cabd1d07-e915-4686-b52f-005a06cd6abf"

"name"

"Blobby"

"type"

"user"

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

"User does not have permission to manage folder permissions"

"status"

The user sending the API request must have

Manager

permissions for the folder.

404 Not Found

"detail"

"Folder with identifier \"<folderId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Revoke folder permissions

Revokes folder permissions from users or user groups.

Individual users

User groups

DELETE /api/v1/folders/:folderId/permissions

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/folders/21db26b3-466c-4791-90e7-b9ce9375426d/permissions' \

-H 'Authentication: Bearer <TOKEN>>' \

-H 'Content-Type: application/json' \

-d '{

"userIds": ["f4df8d6e-7f69-4d54-b23b-7abfe5c4da74"]

DELETE /api/v1/folders/:folderId/permissions

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/folders/21db26b3-466c-4791-90e7-b9ce9375426d/permissions' \

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

userGroupIds

parameter

userIds.userGroupIds: userIds or userGroupIds must be provided

Invalid

userIds

value

userIds.0: Invalid uuid

Invalid

userGroupsId

value

userGroupIds.0: Invalid uuid

403 Forbidden

Response bodies will be an object similar to the following:

"detail"

"User does not have permission to manage folder permissions"

"status"

The user sending the API request must have

Manager

permissions for the folder.

404 Not Found

"detail"

"Folder with identifier \"<folderId>\" not found"

"status"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Folder permission object

Add folder permissions

Parameters

Response

Update folder permissions

Parameters

Response

Retrieve folder permissions for a user

Parameters

Response

Revoke folder permissions

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/folder-permissions](https://docs.omni.co/docs/API/folder-permissions) on 2025-07-23.*
