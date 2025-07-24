# Omni embed parameters reference

**Source URL:** [https://docs.omni.co/docs/embed/external-embedding/parameters](https://docs.omni.co/docs/embed/external-embedding/parameters)  
**Extracted:** 2025-07-23 21:44:14  
**Source:** Omni Analytics Documentation

---

On this page

The following parameters can be used to customize the resulting embed user or session:

In standard SSO embed

these parameters are passed as URL query parameters

In 2-step SSO embed

, the majority of these parameters are included as a JSON payload in the

POST /generate-session

request

Required parameters

The following parameters are required to create a valid embed request.

contentPath

Defines the starting page when the embed user logs into the iframe.

URL builder label

Content path

Required

Yes

Accepted values

See below for example images of each page:

Dashboard

/dashboards/<dashboard-id>

Workbook

/w/<dashboard-id>/duplicate

AI chat

/chat

My documents

/my

Entity folder

/entity-folder

. Requires an

entity

parameter. The folder will be named using the

entity

value unless an

entityFolderLabel

parameter is also provided.

Hub

/root

Example URL parameter

contentPath=%2Fdashboards%2Fa6908f35

Example pages

Dashboard (

/dashboards/<dashboard-id>

Workbook (

/w/<dashboard-id>/duplicate

AI chat (

/chat

In this example, a

connectionRoles

parameter was also provided to associate the chat with a specific connection (

MD2

) and its models:

My documents (

/my

Entity folder (

/entity-folder

note

entity

parameter is required when

/entity-folder

is used as the

contentPath

By default, the

entity

value will be used to create the entity folder.

To provide a different name for the folder, use the

entityFolderLabel

parameter.

Hub (

/root

externalId

Creates a unique ID. Alphanumeric values are supported.

URL builder label

External ID

Required

Yes

Example input(s)

sugar

&spice123

123+EveryThingNice

Example URL parameter

externalId=ohtani17

name

Defines a non-unique name for the embed user's

name

property.

URL builder label

Name

Required

Yes

Example input(s)

Blobby

Blobby Hill

Blobfather

Example URL parameter

name=Blob+Ross

nonce

A 32-character string that defines the embed login URL. This must be unique or the session will fail to load.

Note

: If using the SDK or

/embed/sso/generate-url

endpoint,

nonce

will be automatically added to the generated URLs if one is not provided.

URL builder label

Nonce

Required

Yes

Example input(s)

abcdefghijklmnopqrstuvwxyz123456

Example URL parameter

abcdefghijklmnopqrstuvwxyz123456

Recommended parameters

The following parameters are strongly recommended, but not required, in embed requests.

connectionRoles

Strongly recommended.

An object of connection roles available for embed users. This parameter accepts an object of key-value pairs, formatted as

"<connection_id>": "<connection_role>"

URL parameter

connectionRoles

Required

Accepted connection role values

RESTRICTED_QUERIER

- Can create new content and view workbooks and dashboards

VIEWER

- Can only view dashboards

Example input(s)

{"connection-id-1":"RESTRICTED_QUERIER", "connection-id-2":"VIEWER"}

Example URL parameter

connectionRoles=%7B%2265b10d2a-473b-4486-92c8-0ba628c7d1cb%22%3A%22RESTRICTED_QUERIER%22%7D

Optional

The following parameters are optional in embed requests.

accessBoost

A boolean that enables

AccessBoost

for the embedded dashboard.

URL builder label

Access Boost

Required

Accepted values

true

false

Example URL parameter

accessBoost=true

customTheme

Defines custom theme properties for styling embedded dashboards.

URL builder label

Custom theme

Required

Accepted values

Refer to the

Custom theme properties documentation

for a list of available properties.

Example URL parameter

customTheme=%7B%22dashboard-background%22%3A%22blue%22%7D

customThemeId

Defines a theme ID from your Omni instance, used to stylize embedded dashboards.

URL builder label

Custom theme ID

Required

Example input(s)

abcdefgh-ijkl-mnop-qrst-123456789123

Example URL parameter

customThemeId=abcdefgh-ijkl-mnop-qrst-123456789123

email

Populates the

from

email for entity users when sharing content or sending deliveries.

URL builder label

Email

Required

Example input(s)

blobby@blobsrus.com

Example URL parameter

email=blobby17%40blobsrus.com

entity

Defines a user group identifier used to associate the resulting embed user with a larger group. Also creates the shared entity folder using the name set in the value. Can be any alphanumeric value.

URL builder label

Embed entity

Required

Example input(s)

Blobs R Us

Blobby Outdoors

Blob Mart

Example URL parameter

entity=Blobs+R+Us

entityFolderContentRole

Specifies the content role the embed user will be given to their shared entity folder.

URL builder label

Entity folder content role

Required

Accepted values

VIEWER

- Can see content in the shared folder, but cannot save content into it

EDITOR

- Can see and save content into the shared folder

MANAGER

- Can see and save content into the shared folder and manage other users' permissions

NO_ACCESS

- Cannot see content in the top-level shared folder. Note that it is still possible for the group to have access to subfolders by assigning content permits directly in the UI.

Example URL parameter

entityFolderContentRole=EDITOR

entityFolderGroupContentRole

Specifies the content role the embed entity group will be given to their shared entity folder. If unspecified, an entity group will have VIEWER access to their shared entity folder.

URL builder label

Entity folder group content role

Required

Accepted values

VIEWER

- Can see content in the shared folder, but cannot save content into it

EDITOR

- Can see and save content into the shared folder

MANAGER

- Can see and save content into the shared folder and manage other users' permissions

NO_ACCESS

- Cannot see content in the top-level shared folder. Note that it is still possible for the group to have access to subfolders by assigning content permits directly in the UI.

Example URL parameter

entityFolderGroupContentRole=MANAGER

entityFolderLabel

Updates the embed user's associated entity folder label. Must be 64 characters or less.

Note

: An

entity

must be provided in the generated URL for this parameter to have an affect.

URL builder label

Entity folder label

Required

Example input(s)

Blob Sales

Example URL parameter

entityFolderLabel=Blob+Sales

entityGroupLabel

Updates the embed user's associated entity group label. Must be 64 characters or less.

Note

: An

entity

must be provided in the generated URL for this parameter to have an effect.

URL builder label

Entity group label

Required

Example input(s)

Blob Sales

Example URL parameter

entityGroupLabel=Blob+Sales

filterSearchParam

Specifies the filters to apply for the embedded content.

URL builder label

Filter search param

Required

Example input(s)

f--order_items.status=closed

Example URL parameter

filterSearchParam=f--order_items.status%3D%257B%22values%22%253A%255B%22Complete%22%255D%252C%22appliedLabels%22%253A%257B%257D%257D

groups

An array of user group names that associate the resulting embed user with existing user groups in your Omni instance.

URL builder label

Groups

Required

Example input(s)

["Blob Sales", "Blob Marketing"]

Example URL parameter

groups=%5B%22Blob+Sales%22%2C%22Blob+Marketing%22%5D

linkAccess

Controls which Omni dashboards can be linked to from the embedded dashboard.

URL builder label

Link access

Required

Accepted values

__omni_link_access_open

- All links on the embedded dashboard are permissed and shown

<list_of_dashboard_ids>

- Only permit specific dashboards to be shown

Leave blank

to restrict all links to other Omni dashboards.

Note

: Links to anything other than an Omni dashboard will be shown regardless of the values specified in this parameter.

Example URL parameter

linkAccess=__omni_link_access_open

mode

Defines the type of access users will have to Omni in the iframe.

URL builder label

Mode

Required

Accepted values

APPLICATION

- Enables

Create mode

. Allows embed users to access the full content system and navigate through the Omni app in an iframe

SINGLE_CONTENT

- Only embeds an individual dashboard or workbook. No content navigation or app headers.

Example URL parameter

mode=APPLICATION

prefersDark

Controls whether the resulting embed session has a light or dark mode appearance.

URL builder label

Prefers dark

Required

Accepted values

true

false

system

Example URL parameter

prefersDark=false

theme

Customizes the styles of the resulting embed session with a built-in Omni application.

URL builder label

Built-in theme

Required

Accepted values

vibes

dawn

breeze

blank

Example URL parameter

theme=vibes

uiSettings

Controls general settings of the application in embed. When

"showNavigation": false

, the left sidenav and top left navigation icon will be hidden.

URL builder label

UI Settings

Required

Accepted values

"showNavigation": false

"showNavigation": true

Example URL parameter

uiSettings=%7B%22showNavigation%22%3A%20false%7D

userAttributes

Applies

user attributes

to the embed user.

URL builder label

User attributes

Required

Example input(s)

{"country":"Townsville", "associated_ids":[9,10,11]}

Example URL parameter

userAttributes=%7B%22country%22%3A%22Townsville%22%2C%22associated_ids%22%3A%5B9%2C10%2C11%5D%7D

Required parameters

contentPath

externalId

name

nonce

Recommended parameters

connectionRoles

Optional

accessBoost

customTheme

customThemeId

email

entity

entityFolderContentRole

entityFolderGroupContentRole

entityFolderLabel

entityGroupLabel

filterSearchParam

groups

linkAccess

mode

prefersDark

theme

uiSettings

userAttributes

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/external-embedding/parameters](https://docs.omni.co/docs/embed/external-embedding/parameters) on 2025-07-23.*
