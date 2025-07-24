# Omni user group APIs

**Source URL:** [https://docs.omni.co/docs/API/user-groups](https://docs.omni.co/docs/API/user-groups)  
**Extracted:** 2025-07-23 21:43:40  
**Source:** Omni Analytics Documentation

---

On this page

The user group APIs allow you to manage

user groups

in your Omni instance, including individual memberships. These APIs follow the

SCIM 2.0 standard

Create a group

Creates a user group.

POST /scim/v2/groups

curl -L -X POST 'https://myorg.omniapp.co/api/scim/v2/groups' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"displayName": "Blob Sales",

"members": [

"value": "9e8719d9-276a-4964-9395-a493189a247c"

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

The name of the group. For example,

Blob Sales

members

array of objects

n/a

A list of objects that defines the group's list of members. Each member should be specified as an object. For example:

{"value": "USER-ID"}

Response

201 Created

Successful requests will return a

201 Created

status and a response body similar to the following:

201 Created

"displayName"

"Blob Sales"

"id"

"mEhXj6ZI"

"meta"

"created"

"2024-12-04T00:08:03.250Z"

"lastModified"

"2024-12-04T00:08:03.250Z"

"resourceType"

"Group"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:Group"

"members"

"display"

"iamagoodblob@myorg.co"

"value"

"9e8719d9-276a-4964-9395-a493189a247c"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Update a group

Updates the specified user group by setting the values of the parameters provided and leaving all other properties unchanged.

PUT /scim/v2/groups/:id

curl -L -X PUT 'https://myorg.omniapp.co/api/scim/v2/groups/mEhXj6ZI' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>' \

-d '{

"displayName": "Blob SEs",

"members": [

"display": "iamagoodblob@myorg.co",

"value": "9e8719d9-276a-4964-9395-a493189a247c"

Parameters

Parameter

Type

Required

Default

Description

URL parameter

Yes

n/a

The ID of the group to be updated.

displayName

string

Yes

n/a

The name of the group. For example,

Blob Sales

members

array of objects

Yes

n/a

A list of users that defines (and will override) the group, each specified as an object like:

{ "display": "iamagoodblob@myorg.co", "value": "USER-ID" }

Note

: The users' display names won't be updated.

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"displayName"

"Blob SEs"

"id"

"mEhXj6ZI"

"meta"

"created"

"2024-12-04T00:08:03.250Z"

"lastModified"

"2024-12-04T00:20:47.346Z"

"resourceType"

"Group"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:Group"

"members"

"display"

"iamagoodblob@myorg.co"

"value"

"9e8719d9-276a-4964-9395-a493189a247c"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

List groups

Retrieves a list of user groups, sorted by creation time.

GET /scim/v2/groups

curl -L 'https://myorg.omniapp.co/api/scim/v2/groups' \

-H 'Content-Type: application/json' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Parameter

Type

Required

Default

Description

count

integer

The number of groups to return. Defaults to

startIndex

integer

An integer index that determines the starting point of the sorted result list. Defaults to

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"Resources"

"displayName"

"Blob Sales"

"id"

"mEhXj6ZI"

"meta"

"created"

"2024-08-29T20:33:36.626Z"

"lastModified"

"2024-08-29T20:33:36.626Z"

"resourceType"

"Group"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:Group"

"members"

"display"

"iamagoodblob@myorg.co"

"value"

"9e8719d9-276a-4964-9395-a493189a247c"

"itemsPerPage"

"schemas"

"urn:ietf:params:scim:api:messages:2.0:ListResponse"

"startIndex"

"totalResults"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Retrieve a group

Retrieves a user group using its unique ID.

GET /scim/v2/groups/:id

curl -L 'https://myorg.omniapp.co/api/scim/v2/groups/mEhXj6ZI' \

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

The ID of the group to be retrieved.

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"displayName"

"Blob Sales"

"id"

"mEhXj6ZI"

"meta"

"created"

"2024-08-29T20:33:36.626Z"

"lastModified"

"2024-08-29T20:33:36.626Z"

"resourceType"

"Group"

"schemas"

"urn:ietf:params:scim:schemas:core:2.0:Group"

"members"

"display"

"iamaverygoodblob@myorg.co"

"value"

"9e8719d9-276a-4964-9395-a493189a247c"

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Delete a group

Deletes the specified user group.

DELETE /scim/v2/groups/:id

curl -L -X DELETE 'https://myorg.omniapp.co/api/scim/v2/groups/mEhXj6ZI' \

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

The ID of the group to be deleted.

Response

204 No Content

Successful requests will return a

204 No Content

status. No response body is expected.

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create a group

Parameters

Response

Update a group

Parameters

Response

List groups

Parameters

Response

Retrieve a group

Parameters

Response

Delete a group

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/user-groups](https://docs.omni.co/docs/API/user-groups) on 2025-07-23.*
