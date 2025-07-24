# Audit logs

**Source URL:** [https://docs.omni.co/docs/administration/audit-logs](https://docs.omni.co/docs/administration/audit-logs)  
**Extracted:** 2025-07-23 21:43:42  
**Source:** Omni Analytics Documentation

---

On this page

Audit logs are detailed records of the activity your users are taking in Omni, which can be useful for security and performance analysis. Events included in logs are structured as JSON payloads and sent in batches to Amazon S3 a few minutes after they're written.

Setup

Contact Omni support to request and set up this feature.

Data retention

By default, logs are retained for at least one year. Contact Omni support if you need a shorter retention period.

Event payloads

Use the sections below to learn about the fields that each event type contains.

Note

: Payloads can contain Omni metadata, which can be safely ignored.

Query context events

Occurs when a user loads a document (workbook or dashboard).

Name

Description

documentIdentifier

The unique ID of the workbook or dashboard within Omni, found within the URL for the document

embedEntity

If applicable, the value will be the value of the entity field in an embed URL generated for a user

event

The type of the event. This will be

QUERY_CONTEXT

message

Additional detail passed from the log

organizationID

The unique identifier for the Omni organization

organizationUserID

The unique identifier for the Omni user associated with the event

queryCount

The maximum number of query execution events that a query context event can trigger. Can be used to calculate cache hit rate as the denominator.

referrer

The URL of the page where the event was issued

source

The source of the query context event:

dashboard

workbook

timestamp

The time the event occurred

traceID

A uuid that can be used to trace the event across other log entries

For example, from a query context or dashboard download event to the query execution events that were subsequently run.

url

The URL of the page where the event occurred

Query execution events

Occurs when a user runs a query, which may be sent back to the warehouse.

Name

Description

@timestamp

The time the event occurred

duration

The total length of query execution within the warehouse

event

The type of the event. This will be

QUERY_EXECUTE

jobId

The ID of the corresponding job in the warehouse where the query was executed

message

Detail passed from the infrastructure back to the user, if applicable

omniQueryID

A uuid for the query being executed within Omni. Used for query killing purposes.

organizationID

The unique identifier for the Omni organization

query

The query that was executed

traceID

A uuid that can be used to trace the event across other log entries

For example, from a query context or dashboard download event to the query execution events that were subsequently run.

Dashboard download events

Occurs when a user downloads a full dashboard.

Name

Description

documentIdentifier

The unique ID of the workbook or dashboard within Omni, found within the URL for the document

embedEntity

If applicable, the value will be the value of the entity field in an embed URL generated for a user

event

The type of the event. This will be

DASHBOARD_DOWNLOAD

message

Additional detail passed from the log

organizationID

The unique identifier for the Omni organization

organizationUserID

The unique identifier for the Omni user associated with the event

timestamp

The time the event occurred

traceID

A uuid that can be used to trace the event across other log entries

For example, from a query context or dashboard download event to the query execution events that were subsequently run.

url

The URL of the page where the event occurred

Connection base role events

Occurs when the base role for a connection changes.

Name

Description

actor

Details about the Omni user associated with the event

connectionID

The ID of the connection associated with the role change

event

The type of the event. This will be

UPDATE_CONNECTION_BASE_ROLE

message

Additional detail passed from the log

roleDefinitionName

The name of the updated base connection role

timestamp

The time the event occurred

traceID

A uuid that can be used to trace the event across other log entries

User connection role events

Occurs when a user's connection role changes.

Name

Description

timestamp

The time the event occurred

event

The type of the event. This will be

UPDATE_USER_CONNECTION_ROLE

connectionId

The ID of the connection associated with the role change

message

Additional detail passed from the log

organizationID

The unique identifier for the Omni organization

organizationUserID

The unique identifier for the Omni user associated with the event

traceID

A uuid that can be used to trace the event across other log entries

User group connection role events

Occurs when the connection role for a user group changes.

Name

Description

actor

Details about the Omni user associated with the event

connectionId

The ID of the connection associated with the role change

event

The type of the event. This will be

UPDATE_GROUP_CONNECTION_ROLE

message

Additional detail passed from the log

organizationID

The unique identifier for the Omni organization

roleDefinitionName

The name of the updated connection role

targetMembershipID

The membership of the user group associated with the event

timestamp

The time the event occurred

traceID

A uuid that can be used to trace the event across other log entries

userGroupId

The ID of the Omni user group associated with the event

User invite events

Occurs when a new user is invited to the organization.

Name

Description

event

The type of the event. This will be

USER_INVITE

invitedOrganizationUserId

The ID of the invited user

message

Additional detail passed from the log

organizationID

The unique identifier for the Omni organization

organizationUserID

The unique identifier for the Omni user associated with the event

timestamp

The time the event occurred

traceID

A uuid that can be used to trace the event across other log entries

Setup

Data retention

Event payloads

Query context events

Query execution events

Dashboard download events

Connection base role events

User connection role events

User group connection role events

User invite events

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/audit-logs](https://docs.omni.co/docs/administration/audit-logs) on 2025-07-23.*
