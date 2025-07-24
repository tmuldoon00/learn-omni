# Omni schedule APIs

**Source URL:** [https://docs.omni.co/docs/API/schedules](https://docs.omni.co/docs/API/schedules)  
**Extracted:** 2025-07-23 21:43:39  
**Source:** Omni Analytics Documentation

---

On this page

The schedule APIs allow you to manage and interact with schedules within your Omni organization.

Create a schedule

Creates a scheduled task for the specified dashboard.

Supports applying filters and formatting, creating alert conditions, and triggering test deliveries.

Limitations

Currently, only

email

SFTP

, and

webhook

destinations are supported.

Webhook

Email

SFTP

Filters & formatting

Alert conditions

Single tile

Test delivery

POST /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"identifier": "12db1a0a",

"name": "My Webhook schedule",

"schedule": "0 9 ? * * *",

"timezone": "UTC",

"format": "json",

"destinationType": "webhook",

"url": "https://webhooksrus.com/1234566"

POST /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"identifier": "12db1a0a",

"name": "My Email schedule",

"schedule": "0 9 ? * * *",

"timezone": "UTC",

"format": "pdf",

"destinationType": "email",

"paperFormat": "legal",

"expandTablesToShowAllRows": true,

"paperOrientation": "landscape",

"recipients": [

"iamagoodblob@myorg.co",

"blobmanager@myorg.co"

"subject": "Daily Sales report",

"textBody": "Here are the daily sales!",

"fanOut": "false"

POST /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"identifier": "12db1a0a",

"name": "My SFTP schedule",

"schedule": "0 9 ? * * *",

"timezone": "UTC",

"format": "xlsx",

"destinationType": "sftp",

"address": "sftp.blobsrus.com",

"port": "22",

"username": "blobby",

"passwordUnencrypted": "1am@g00dBL0b"

Filters

- Use

filterConfig

to specify filter conditions. Filter keys must exist in the dashboard filter configuration to be valid. If the dashboard doesn't have any filter keys configured, filters can't be used in the task.

Filter keys are case-sensitive and must match exactly.

Formatting options

- You can also specify options to format the task's output, such as

hideTitle

Note

: Not all output formats (

json

email

, etc.) are compatible with each formatting option. Refer to the

Parameters

table for more information.

POST /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"identifier": "dashboard-abc123",

"name": "Weekly Regional Report",

"schedule": "0 0 ? * MON *",

"timezone": "UTC",

"format": "pdf",

"destinationType": "email",

"recipients": ["iamagoodblob@myorg.com", "managerblob@emyorg.com"],

"subject": "Weekly Regional Report",

"filterConfig": {

"region": {

"kind": "EQ",

"left_side": "US",

"type": "string"

"hideTitle": true

To specify an alert condition, provide:

conditionType

conditionQueryMapKey

POST /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"identifier": "dashboard-abc123",

"name": "Data Alert Webhook",

"schedule": "0 */6 * * ? *",

"timezone": "UTC",

"format": "json",

"destinationType": "webhook",

"url": "https://api.example.com/webhook",

"conditionType": "RESULTS_PRESENT",

"conditionQueryMapKey": "1",

"queryIdentifierMapKey": "1",

"overrideRowLimit": true,

"maxRowLimit": 1000

To scope the delivery to a single tile, provide a

queryIdentifierMapKey

POST /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"identifier": "dashboard-abc123",

"name": "Single tile delivery",

"schedule": "0 */6 * * ? *",

"timezone": "UTC",

"format": "json",

"destinationType": "webhook",

"url": "https://api.example.com/webhook",

"queryIdentifierMapKey": "1",

"overrideRowLimit": true,

"maxRowLimit": 1000

POST /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authentication: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"identifier": "dashboard-abc123",

"name": "Test Delivery",

"schedule": "0 0 1 1 ? 2099",

"timezone": "UTC",

"format": "pdf",

"destinationType": "email",

"recipients": ["iamagoodblob@myorg.com"],

"subject": "Test Delivery",

"testNow": true

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"id"

"2abba91d-9bec-41a0-8a8d-6f133b4ff0b7"

"message"

"Successfully created schedule"

400 Bad Request

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Document has not been saved

Analyses do not support dashboards.

Document is missing a dashboard

Document does not have a dashboard

Invalid cron expression

schedule: Schedule is an invalid cron expression

Invalid

timezone

timezone: Time zone must be IANA valid.

hideTitle

used with incompatbile

format

hideTitle can only be used with PDF or PNG formats

Invalid filter key

Invalid filter keys found in schedule configuration: <filterKey>. Available dashboard filter keys are: <key1>, <key2>, ....

testNow

used with incompatible

conditionType

Test delivery not supported for condition type RESULTS_CHANGED

Format incompatible with print options

Print options are not supported for this format

pageFormat: fit_page

incompatible with layout options

Single column layout and table expansion options are not supported for FIT_PAGE format.

404 Not Found

Response bodies will be an object similar to the following:

"detail"

"<errorReason>"

"status"

Issue

Error detail

Dashboard not found

Document with identifier \"<dashboardId>\" not found

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

List schedules

Retrieves scheduled tasks. This endpoint supports filtering, sorting, and cursor-based pagination.

Basic request

Filters

Sorting

Pagination with cursor

GET /api/v1/schedules

curl -L 'https://myorg.omniapp.co/api/v1/schedules' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Full text search (

q=<value>

GET /api/v1/schedules?q=<value>

curl -L 'https://myorg.omniapp.co/api/v1/schedules?q=Blob%20Ross' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Filter fields (ex:

status

destination

GET /api/v1/schedules?<filterField>=<value>

curl -L 'https://myorg.omniapp.co/api/v1/schedules?status=success&destination=email' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Full text & filter fields

GET /api/v1/schedules?q=<value>&

=<value>

curl -L 'https://myorg.omniapp.co/api/v1/schedules?q=Blob%20Ross&status=success&destination=email' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/schedules?sortField=<field>&sortDirection=<direction>

curl -L 'https://myorg.omniapp.co/api/v1/schedules?sortField=lastRun&sortDirection=desc' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

GET /api/v1/schedules?cursor=<pageNumber>&pageSize=<size>

curl -L 'https://myorg.omniapp.co/api/v1/schedules?cursor=2&pageSize=10' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json'

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"pageInfo"

"hasNextPage"

false

"nextCursor"

null

"pageSize"

"totalRecords"

"records"

"id"

"60d386ca-6f48-4143-9bfc-fd7a6f942c2c"

"schedule"

"00 09 ? * 2,3,4,5,6 *"

"disabledAt"

"2024-03-01T15:32:20.996Z"

"name"

"Web Traffic Analysis"

"timezone"

"America/Los_Angeles"

"identifier"

"1169b547"

"dashboardName"

"Web Traffic Analysis"

"ownerName"

"Blob Ross"

"lastCompletedAt"

"2024-02-29T17:00:56.107Z"

"lastStatus"

"COMPLETE"

"destinationType"

"email"

"recipientCount"

"content"

"dashboard"

"slackRecipientType"

null

"systemDisabledAt"

null

"systemDisabledReason"

null

"alert"

null

"id"

"f68aba72-b558-4012-a381-bb74954dd025"

"schedule"

"00 09 ? * 2,3,4,5,6 *"

"disabledAt"

null

"name"

"⚡️🍣 Query"

"timezone"

"America/New_York"

"identifier"

"eadde573"

"dashboardName"

"Blob R Us Sales"

"ownerName"

"Blobby Hill"

"lastCompletedAt"

"2025-05-19T13:00:35.457Z"

"lastStatus"

"ERROR_DELIVERED"

"destinationType"

"email"

"recipientCount"

"content"

"single tile"

"slackRecipientType"

null

"systemDisabledAt"

null

"systemDisabledReason"

null

"alert"

null

"id"

"2af41989-1bed-4c65-a602-927f71205a32"

"schedule"

"00 09 ? * 2,3,4,5,6 *"

"disabledAt"

null

"name"

"Orders (2)"

"timezone"

"America/New_York"

"identifier"

"12db1a0a"

"dashboardName"

"Orders"

"ownerName"

"Blobby Hill"

"lastCompletedAt"

"2025-05-19T13:00:27.517Z"

"lastStatus"

"COMPLETE"

"destinationType"

"webhook"

"recipientCount"

"content"

"dashboard"

"slackRecipientType"

null

"systemDisabledAt"

null

"systemDisabledReason"

null

"alert"

null

"id"

"61a8e93b-71f4-4cda-b1f9-a91aa0ad05bc"

"schedule"

"00 09 ? * 2,3,4,5,6 *"

"disabledAt"

null

"name"

"Orders"

"timezone"

"America/New_York"

"identifier"

"12db1a0a"

"dashboardName"

"Orders"

"ownerName"

"Blob Ross"

"lastCompletedAt"

"2025-05-19T13:00:25.376Z"

"lastStatus"

"COMPLETE"

"destinationType"

"email"

"recipientCount"

"content"

"dashboard"

"slackRecipientType"

null

"systemDisabledAt"

null

"systemDisabledReason"

null

"alert"

null

"id"

"3db84f26-db0f-451d-846e-0f7148ae5a7d"

"schedule"

"00 09 ? * 2,3,4,5,6 *"

"disabledAt"

"2024-12-31T17:23:45.063Z"

"name"

"External users"

"timezone"

"America/New_York"

"identifier"

"0958c2d8"

"dashboardName"

"Sales Data by Quarter"

"ownerName"

"Blobby Hill"

"lastCompletedAt"

"2024-12-31T14:00:51.558Z"

"lastStatus"

"COMPLETE"

"destinationType"

"email"

"recipientCount"

"content"

"dashboard"

"slackRecipientType"

null

"systemDisabledAt"

null

"systemDisabledReason"

null

"alert"

null

"id"

"8cc895ec-a2af-493f-a4e4-08c3017fa42d"

"schedule"

"00 09 ? * 2,3,4,5,6 *"

"disabledAt"

"2024-11-21T21:52:16.059Z"

"name"

"Daily Slack update"

"timezone"

"America/New_York"

"identifier"

"0958c2d8"

"dashboardName"

"Sales Data by Quarter"

"ownerName"

"Blobby Hill"

"lastCompletedAt"

null

"lastStatus"

null

"destinationType"

"slack"

"recipientCount"

"content"

"dashboard"

"slackRecipientType"

"users"

"systemDisabledAt"

null

"systemDisabledReason"

null

"alert"

null

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid parameter value

Invalid enum value

Invalid

ownerId

UUID

ownerId: Invalid uuid

Invalid page size

Page size cannot exceed 100

Invalid page number for

cursor

Invalid page number. The last valid page is <number>.

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

User not found

User with id <id> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Trigger schedule

Triggers the execution of a schedule on demand, outside of its regular schedule.

POST /api/v1/schedules/:scheduleId/trigger

curl -L -X POST 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/trigger' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Note

: The

scheduleId

must be provided as a path parameter.

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

Invalid UUID format

Bad Request: scheduleId: Invalid uuid

Invalid method

Invalid method

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

Schedule not found

Scheduled task with id {scheduleId} does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

500 Internal Server Error

"detail"

"<errorReason>"

"status"

Error

Error detail

Dispatcher error

Various error messages related to dispatch failures

Add recipients to schedule

Adds one or more recipients to an existing scheduled email task. Recipients can be specified by email address or user ID.

Limitations

This API only works with schedules with

email destinations

Add by email

Add by user ID

Add multiple recipients

PUT /api/v1/schedules/:scheduleId/add-recipients

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/add-recipients' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"emails": ["user@example.com"]

PUT /api/v1/schedules/:scheduleId/add-recipients

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/add-recipients' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"userIds": ["987fcdeb-51a2-43d7-9b56-254415f67890"]

PUT /api/v1/schedules/:scheduleId/add-recipients

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/add-recipients' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"emails": ["user1@example.com", "user2@example.com"],

"userIds": ["987fcdeb-51a2-43d7-9b56-254415f67890", "abcdef12-3456-7890-abcd-ef1234567890"]

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"addedRecipientsCount"

"success"

true

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid UUID format

userIds: Invalid uuid

Invalid email format

emails: Invalid email address

Empty request body

Please provide either valid email addresses, valid user IDs, or both

No recipients provided

At least one recipient must be provided

{parameter}: Array must contain at least 1 element(s)

Invalid members

Invalid recipient(s): The following members do not exist or do not have access to this organization: {userId}

Unsupported destination type

Cannot add recipients to destination type {destinationType}

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

Schedule not found

Scheduled task with id {scheduleId} does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Remove recipients from schedule

Removes one or more recipients from an existing scheduled email task. Recipients can be specified by email address or user ID.

Limitations

This API only works with schedules with

email destinations

Remove by email

Remove by user ID

Remove multiple recipients

PUT /api/v1/schedules/:scheduleId/remove-recipients

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/remove-recipients' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"emails": ["user@example.com"]

PUT /api/v1/schedules/:scheduleId/remove-recipients

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/remove-recipients' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"userIds": ["987fcdeb-51a2-43d7-9b56-254415f67890"]

PUT /api/v1/schedules/:scheduleId/remove-recipients

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/remove-recipients' \

-H 'Authorization: Bearer <TOKEN>' \

-H 'Content-Type: application/json' \

-d '{

"emails": ["user1@example.com", "user2@example.com"],

"userIds": ["987fcdeb-51a2-43d7-9b56-254415f67890", "abcdef12-3456-7890-abcd-ef1234567890"]

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

"removedRecipientsCount"

"success"

true

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid UUID format

Bad Request: userIds: Invalid uuid

Invalid email format

Bad Request: emails: Invalid email address

Empty request body

Please provide either valid email addresses, valid user IDs, or both

No recipients provided

At least one recipient must be provided

{parameter}: Array must contain at least 1 element(s)

Invalid members

Invalid recipient(s): The following members do not exist or do not have access to this organization: {userId}

Unsupported destination type

Cannot change recipients on a scheduled task destination of type {destinationType}

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

Schedule not found

Scheduled task with id {scheduleId} does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create or update an email-only user

Creates or updates an

email-only user

. An email-only user is a recipient of a delivery that isn't associated with an Omni account.

If Omni matches the provided email to an existing email-only user, the user will be updated according to the

userAttributes

in the request body.

tip

Need to include multiple email-only users?

Use the

Create or update multiple email-only users

endpoint.

Basic request

Set user attributes

Unset user attribute

POST /api/v1/users/email-only

curl -X POST'https://myorg.omniapp.co/api/v1/users/email-only' \

--H 'Content-Type: application/json' \

--H 'Authorization: Bearer <TOKEN>' \

--data '{

"email": "iamagoodblob@myorg.co"

When providing user attributes, note that:

omni_user_timezone

is the only supported system attribute

Values must match the user attribute's specified

type

. For example,

number

attribute values must be numbers such as

, etc.

Multi-value attributes should be provided using arrays. For example:

["US","EU"]

[1, 10]

POST /api/v1/users/email-only

curl -X POST'https://myorg.omniapp.co/api/v1/users/email-only' \

--H 'Content-Type: application/json' \

--H 'Authorization: Bearer <TOKEN>' \

--data '{

"email": "iamagoodblob@myorg.co",

"userAttributes": {

"region": ["US","EU"],

"omni_user_timezone": "America/New_York",

"is_admin": 0,

"is_sales_team": 1

Unset user attributes by providing:

null

values

- Empty strings for string attributes

- Empty arrays for multi-value attributes

POST /api/v1/users/email-only

curl -X POST'https://myorg.omniapp.co/api/v1/users/email-only' \

--H 'Content-Type: application/json' \

--H 'Authorization: Bearer <TOKEN>' \

--data '{

"email": "iamagoodblob@myorg.co",

"userAttributes": {

"is_admin": null,

"is_sales_team": "",

"region": []

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"email"

"iamagoodblob@myorg.co"

"userId"

"9e8719d9-276a-4964-9395-a493189a247c"

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid JSON in request body

Invalid JSON

Missing

email

parameter

email: email is required

email

value isn't a valid email address

email: Invalid email address

User attribute does not exist

The provided user attributes: \"<attribute>\" do not match the names of existing user attributes.

User attribute type mismatch

User Attribute <attribute> is type number, but passed-in value <value> is not a number.

Invalid

omni_user_timezone

value

The timezone <invalidTimezone> is not supported. Please see the connection page or user profile page for the list of valid timezones. Use e.g. \"America/New_York\" instead of \"EST\"

Multiple values not provided as array

User Attribute <attribute> has multiple values enabled, but the passed-in value is not an array. If passing a single value for a user attribute with multiple values enabled, please wrap the value in an array [x].

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create or update multiple email-only users

Creates or updates up to 20

email-only users

. An email-only user is a recipient of a delivery that isn't associated with an Omni account.

If Omni matches a provided email to an existing email-only user, the user will be updated according to the

userAttributes

in the request body.

Basic request

Set user attributes

Unset user attribute

POST /api/v1/users/email-only/bulk

curl -X POST'https://myorg.omniapp.co/api/v1/users/email-only/bulk' \

--H 'Content-Type: application/json' \

--H 'Authorization: Bearer <TOKEN>' \

--data '{

"users":[

"email":"iamagoodblob@myorg.co"

"email":"blobmanager@myorg.co"

When providing user attributes, note that:

omni_user_timezone

is the only supported system attribute

Values must match the user attribute's specified

type

. For example,

number

attribute values must be numbers such as

, etc.

Multi-value attributes should be provided using arrays. For example:

["US","EU"]

[1, 10]

POST /api/v1/users/email-only/bulk

curl -L POST 'https://myorg.omniapp.co/api/v1/users/email-only/bulk' \

--H 'Content-Type: application/json' \

--H 'Authorization: Bearer <TOKEN>' \

--data '{

"users":[

"email":"iamagoodblob@myorg.co",

"userAttributes":{

"region":[

"US",

"EU"

"omni_user_timezone":"America/New_York",

"is_admin":0,

"is_sales_team":1

"email":"blobmanager@myorg.co",

"userAttributes":{

"region":[

"US"

"omni_user_timezone":"America/New_York",

"is_admin":1,

"is_sales_team":0

Unset user attributes by providing:

null

values

- Empty strings for string attributes

- Empty arrays for multi-value attributes

POST /api/v1/users/email-only/bulk

curl -X POST'https://myorg.omniapp.co/api/v1/users/email-only/bulk' \

--H 'Content-Type: application/json' \

--H 'Authorization: Bearer <TOKEN>' \

--data '{

"users":[

"email":"iamagoodblob@myorg.co",

"userAttributes":{

"region":[],

"omni_user_timezone":"",

"is_admin":null

Parameters

Loading parameters...

Response

200 OK

Successful requests will return a

200 OK

status and a response body similar to the following:

200 OK

"results"

"email"

"iamagoodblob@myorg.co"

"userId"

"1e23dadc-961b-4a21-b36b-17168130fc3f"

"email"

"blobmanager@myorg.co"

"userId"

"e9d19f71-0b59-4f8e-8343-a75d30576d28"

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid JSON in request body

Invalid JSON

Maximum

users

exceeded

users: Maximum of 20 users can be processed in a single request

Missing

users

parameter

users: users is required

Missing

email

parameter

email: email is required

email

value isn't a valid email address

email: Invalid email address

User attribute does not exist

The provided user attributes: \"<attribute>\" do not match the names of existing user attributes.

User attribute type mismatch

User Attribute <attribute> is type number, but passed-in value <value> is not a number.

Invalid

omni_user_timezone

value

The timezone <invalidTimezone> is not supported. Please see the connection page or user profile page for the list of valid timezones. Use e.g. \"America/New_York\" instead of \"EST\"

Multiple values not provided as array

User Attribute <attribute> has multiple values enabled, but the passed-in value is not an array. If passing a single value for a user attribute with multiple values enabled, please wrap the value in an array [x].

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Pause a schedule

Pauses a schedule using the schedule's UUID.

PUT /api/v1/schedules/:scheduleId/pause

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/pause' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Note

: The

scheduleId

must be provided as a path parameter.

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

Schedule is system disabled

Schedule is system disabled

Schedule is already paused

Schedule is already paused

404 Not Found

"detail"

"<errorReason>"

"status"

Issue

Error detail

Schedule not found

Scheduled task with id {scheduleId} does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Resume a schedule

Resumes a schedule using the schedule's UUID.

PUT /api/v1/schedules/:scheduleId/resume

curl -L -X PUT 'https://myorg.omniapp.co/api/v1/schedules/123e4567-e89b-12d3-a456-426614174000/resume' \

-H 'Authorization: Bearer <TOKEN>'

Parameters

Note

: The

scheduleId

must be provided as a path parameter.

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

Indicates schedule has been resumed successfully

400 Bad Request

"detail"

"<errorReason>"

"status"

Issue

Error detail

Schedule is system disabled

Schedule is system disabled

Schedule is already resumed

Schedule is already resumed

404 Not Found

"detail"

"<errorReason>"

"status"

Issue

Error detail

Schedule not found

Scheduled task with id {scheduleId} does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Delete a schedule

Deletes a schedule using the schedule's UUID.

DELETE /api/v1/schedules/:scheduleId

curl -L -X DELETE 'https://myorg.omniapp.co/api/v1/schedules/61a8e93b-71f4-4cda-b1f9-a91aa0ad05bc' \

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

400 Bad Request

"detail"

"<errorReason>"

"status"

Error

Error detail

Invalid schedule UUID

scheduleId: Invalid uuid

Invalid method

Invalid request method

404 Not Found

"detail"

"<errorReason>"

"status"

Error

Error detail

Schedule not found

Scheduled task with id <scheduleId> does not exist

429 Too Many Requests

Results from too many requests in a given time frame. Refer to the

Rate limiting

documentation for more information.

Create a schedule

Limitations

Parameters

Response

List schedules

Parameters

Response

Trigger schedule

Parameters

Response

Add recipients to schedule

Limitations

Parameters

Response

Remove recipients from schedule

Limitations

Parameters

Response

Create or update an email-only user

Parameters

Response

Create or update multiple email-only users

Parameters

Response

Pause a schedule

Parameters

Response

Resume a schedule

Parameters

Response

Delete a schedule

Parameters

Response

---

*This content was automatically extracted from [https://docs.omni.co/docs/API/schedules](https://docs.omni.co/docs/API/schedules) on 2025-07-23.*
