# Omni user APIs

**Source URL:** [https://docs.omni.co/docs/API/users](https://docs.omni.co/docs/API/users)  
**Extracted:** 2025-07-23 21:43:41  
**Source:** Omni Analytics Documentation

---

On this page

The user APIs allow you to manage users in your Omni instance. These APIs follow the

SCIM 2.0 standard

Create a user

Creates a user.

POST /scim/v2/users

curl -L -X POST'https://myorg.omniapp.co/api/scim/v2/users' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"displayName": "Blobby",

"userName": "iamagoodblob@myorg.co",

"urn:omni:params:1.0:UserAttribute": {

"good_blob": "yes"

Parameters

Parameter

Type

Required

Default

Description

displayName

string

Yes

n/a

The user's display name. For example,

Blobby

userName

string

Yes

n/a

The user's email address.

urn:omni:params:1.0

:UserAttribute

object

n/a

An object defining the user's

user attributes

. Attributes are represented as key/value pairs, where the keys map to the IDs of user attributes (the

Reference

column in the

User attributes

page) defined in Omni.

Response

201 Created

Successful requests will return a

201 Created

status and a response body similar to the following:

201 Created

"active"

true

"displayName"

"Blobby"

"emails"

"primary"

true

"value"

"iamagoodblob@myorg.co"

"groups"

"id"

"9e8719d9-276a-4964-9395-a493189a247c"

"meta"

"created"

"2024-12-03T23:13:14.109Z"

"lastModified"

"2024-12-03T23:13:14.109Z"

"resourceType"

"User"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:User"

"userName"

"iamagoodblob@myorg.co"

"urn:omni:params:1.0:UserAttribute"

"good_blob"

"yes"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Update a user

Updates the specified user by setting the values of the parameters provided and leaving all other properties of the user unchanged.

PUT /scim/v2/users/:id

curl -L -X PUT 'https://myorg.omniapp.co/api/scim/v2/users/9e8719d9-276a-4964-9395-a493189a247c' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"urn:omni:params:1.0:UserAttribute": {

"good_blob": "sometimes"

Parameters

Parameter

Type

Required

Default

Description

URL parameter

Yes

n/a

The ID of the user to be updated.

displayName

string

n/a

The user's display name. For example,

Blobby

userName

string

Yes

n/a

The user's email address. It must match the user's existing email address and cannot be changed.

urn:omni:params:1.0

:UserAttribute

object

n/a

An object defining the user's

user attributes

. Attributes are represented as key/value pairs, where the keys map to the IDs of user attributes (the

Reference

column in the

User attributes

page) defined in Omni.

Response

200 OK

Successful requests will return a

200 OK

status and a response body containing the updated user object associated with the provided user ID.

200 OK

"active"

true

"displayName"

"Blobby"

"emails"

"primary"

true

"value"

"iamagoodblob@myorg.co"

"groups"

"id"

"9e8719d9-276a-4964-9395-a493189a247c"

"meta"

"created"

"2024-12-03T23:13:14.109Z"

"lastModified"

"2024-12-03T23:13:14.109Z"

"resourceType"

"User"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:User"

"userName"

"iamagoodblob@myorg.co"

"urn:omni:params:1.0:UserAttribute"

"good_blob"

"sometimes"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

List users

Returns a list of users, sorted by creation time. This endpoint supports filtering.

Refer to the

Embed

tab to view an example specific to embedding.

Non-embed

Filters

Embed

GET /scim/v2/users

curl -L 'https://myorg.omniapp.co/api/scim/v2/users' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Note

: Filtering may also be used with the Embed endpoint.

GET /scim/v2/users?filter=userName eq ':userName'

curl -L 'https://myorg.omniapp.co/api/scim/v2/users?filter=userName eq "iamagoodblob@blobsrus.co' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

GET /scim/v2/embed/users

curl -L 'https://myorg.omniapp.co/api/scim/v2/embed/users' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Note

: All parameters must be provided as query parameters.

Parameter

Type

Required

Default

Description

filter

string

n/a

Filter to return a specific user using either the

userName

and

embedExternalId

fields. The filter should be provided in the following format:

<fieldName> eq "<userId>

For example:

userName eq "iamagoodblob@blobsrus.co"

embedExternalId eq "102"

count

integer

The number of users to return. Defaults to

startIndex

integer

An integer index that determines the starting point of the sorted result list. Defaults to

Response

200 OK

Successful requests will return a

200 OK

status and a response body containing a list of user objects, each of which represents a user.

Non-embed

Embed

200 OK

"Resources"

"active"

true

"displayName"

"Blobby"

"emails"

"primary"

true

"value"

"iamagoodblob@myorg.co"

"groups"

"id"

"9e8719d9-276a-4964-9395-a493189a247c"

"meta"

"created"

"2024-11-04T16:01:47.015Z"

"lastModified"

"2024-11-04T16:05:45.356Z"

"resourceType"

"User"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:User"

"userName"

"iamagoodblob@myorg.co"

"itemsPerPage"

"schemas"

"urn:ietf:params:scim:api:messages:2.0:ListResponse"

"startIndex"

"totalResults"

200 OK

"Resources"

"active"

true

"displayName"

"Blobby"

"emails"

"primary"

true

"value"

"embed-user-Xfcbp2L_HEovLkwren4iWeVnQpyTdJBiDiJCdHfdJh0@myorg.omniapp.co"

"groups"

"display"

"Blobs R Us"

"value"

"zMJT9c0x"

"id"

"86b31265-3724-4e6a-ad7a-901aa06af7f3"

"meta"

"created"

"2024-09-11T19:57:37.379Z"

"lastModified"

"2024-09-18T21:12:43.594Z"

"resourceType"

"User"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:User"

"userName"

"embed-user-Xfcbp2L_HEovLkwren4iWeVnQpyTdJBiDiJCdHfdJh0@myorg.omniapp.co"

"embedEntity"

"Blobs R Us"

"embedExternalId"

"102"

"itemsPerPage"

"schemas"

"urn:ietf:params:scim:api:messages:2.0:ListResponse"

"startIndex"

"totalResults"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Retrieve a user

Retrieves a user using their unique ID.

GET /scim/v2/users/:id

curl -L 'https://myorg.omniapp.co/api/scim/v2/users/9e8719d9-276a-4964-9395-a493189a247c' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Parameter

Type

Required

Default

Description

URL parameter

Yes

n/a

The ID of the user to be retrieved.

Response

200 OK

Successful requests will return a

200 OK

status and a response body containing the user object associated with the provided user ID.

200 OK

"active"

true

"displayName"

"Blobby"

"emails"

"primary"

true

"value"

"iamagoodblob@myorg.co"

"groups"

"id"

"9e8719d9-276a-4964-9395-a493189a247c"

"meta"

"created"

"2024-12-03T23:13:14.109Z"

"lastModified"

"2024-12-03T23:13:14.109Z"

"resourceType"

"User"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:User"

"userName"

"iamagoodblob@myorg.co"

"urn:omni:params:1.0:UserAttribute"

"good_blob"

"yes"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Delete a user

Deletes the specified user. Refer to the

Embed

tab to view an example specific to embedding.

Non-embed

Embed

DELETE /scim/v2/users/:id

curl -L -X DELETE 'https://myorg.omniapp.co/api/scim/v2/users/9e8719d9-276a-4964-9395-a493189a247c' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

DELETE /scim/v2/embed/users/:id

curl -L -X DELETE 'https://myorg.omniapp.co/api/scim/v2/embed/users/9e8719d9-276a-4964-9395-a493189a247c' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Parameter

Type

Required

Default

Description

URL parameter

Yes

n/a

The ID of the user to be deleted.

Response

204 No Content

Successful requests will return a

204 No Content

status. No response body is expected.

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create a user

Parameters

Response

Update a user

Parameters

Response

List users

Parameters

Response

Retrieve a user

Parameters

Response

Delete a user

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/users](https://docs.omni.co/docs/API/users) on 2025-07-23.*
