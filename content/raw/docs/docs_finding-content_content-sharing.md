# Sharing content

**Source URL:** [https://docs.omni.co/docs/finding-content/content-sharing](https://docs.omni.co/docs/finding-content/content-sharing)  
**Extracted:** 2025-07-23 21:44:17  
**Source:** Omni Analytics Documentation

---

On this page

Sharing content with your team makes it easier to collaborate, improves decision-making across teams, and keeps everyone on the same page. It also saves time by ensuring stakeholders have access to key insights without constantly recreating or requesting the same reports.

Note

: Publishing a document using the

draft/publish workflow

doesn't inherently grant document access. The document's folder location and document-level permissions determine who can access it. Refer to the

Editing & publishing guide

for more information.

Content access permissions

Content access is determined by a user's assigned content access role. Roles can be assigned at the content level, but

Instance Admins

can also assign default content access roles for the entire

organization

Permission

No Access

Viewer

Editor

Manager

View dashboards

View & explore workbooks

Update dashboards & workbooks

Manage permissions on content

Generally, it's considered best practice to assign the least permissive role that satisfies a user's needs. Refer to the

Best practices guide

for more information and examples of different permissioning implementations.

Assigning access roles to content

To grant content access, start by clicking the

Share

icon near the top right corner of any folder or document:

Users and user groups

To share content with individual users and

user groups

Click the

Share with users or groups

field.

Use the dropdown to select the users and groups you want to share the content with.

Use the access role dropdown (next to the

Share

button) to assign the user or group an access role.

Click

Share

Organization

If you create or move content to your organization's

Shared

hub, you can also set a default access role for the organization. Use the access role dropdown next to the

Organization

field in the content's

Share

modal to select an access role. Changes will be saved automatically.

Organization content settings

A few settings can affect how you share content with your organization:

Content organization

- When enabled, users can add content to the organization's

Shared

hub. Otherwise, users can only add content to folders that they have been granted access to.

Default content access role

- Applies the selected role as the organization default when content is saved in the organization's

Shared

hub.

For more information about these settings, refer to the

Organization settings reference

Inheriting access roles

tip

When users create subfolders within existing parent folders, the original parent folder creator maintains ownership of the newly created subfolders. However, users who create these subfolders retain full ownership rights over any documents they place within their created subfolders.

The contents of a folder will inherit the

access role

of the parent folder. Documents and subfolders may be assigned more permissive roles than the parent folder, but they can't have a less permissive role.

For example,

Folder 1

requires an

Editor

access role or higher:

└── Folder 1

# Editor or higher

├── Document A

# Can be assigned Editor or Manager

└── Subfolder 1

# Can be assigned Editor or Manager

├── Document B

# Inherits from Subfolder 1

└── Subfolder 2

# Inherits from Subfolder 1

Since

Editor

access has been applied to

Folder 1

, this means that any documents or subfolders it contains can only be assigned

Editor

Manager

access roles.

Let's take a look at an example where

Folder 1

is assigned

No access

. With this implementation, the documents and subfolders it contains can be assigned any more permissive access role:

└── Folder 1

# No access

├── Document A

# Can be assigned Viewer or higher

└── Subfolder 1

# Can be assigned Viewer or higher

├── Document B

# Inherits from Subfolder 1

└── Subfolder 2

# Inherits from Subfolder 1

This approach allows for more granular access control as permission levels can be

increased

for nested content, but they can't be decreased. In this last example, the content with the most permissions (

Manager

) is the most deeply nested:

└── Folder 1

# No access

├── Document A

# Viewer and above

└── Subfolder 1

# No access

├── Document B

# Editor and above

└── Subfolder 2

# Manager

What can users see?

When organizing content and assigning access, assume that folder names will always be visible. If a folder contains content that a user has access to, the user will be able to see the folder. The user will only be able to see the content they have access to within the folder, however.

For example,

Folder 1

has a

No access

role, but it contains a document that the entire organization has access to. Users will be able to see the folder and the document.

Controlling document interactivity

You can also choose what users who access your content can do by enabling or disabling different abilities, like scheduling. You can access these settings by:

Clicking

Settings

in the

Share

modal, or

Clicking

File > Document Settings

in a dashboard or workbook

Admins can control the available abilities for all documents in the organization using the

Document abilities

setting

. If an ability isn't available in a document, it may be disabled at the organization level.

Changing document URLs & identifiers

Changing a document's identifier can make its URL more readable and easier to remember. This could also be used for updates to an embedded dashboard without requiring an engineer to point from one identifier to another by instead pointing to a fixed, immutable URL.

You can access this setting by:

Clicking

Settings

in the

Share

modal, or

Clicking

File > Document Settings

in a dashboard or workbook

The document's identifier must be unique. Additionally, note that changes will be reflected in real time.

Boosting permissions with AccessBoost

AccessBoost allows content managers to enable permission boosting by ignoring an Omni user's

database connection role

. When enabled, the user can run a dashboard and view all of the data that dashboard shows even if they typically wouldn't be able to see content built using SQL. AccessBoost only alters the access to the data on a dashboard. AccessBoost still respects a user's connection role when the user runs a query at the workbook level.

AccessBoost may be useful in scenarios where users with connection roles of

Querier

and

Admins

that want to share dashboard content with users that have lower level connection roles like

Restricted Querier

and

Viewer

AccessBoost does not allow users with a connection role of

No Access

to access a document on that connection.

Note that AccessBoost does not

Allow users to bypass

access_filters

Automatically bypass in-use

access_grants

. If you want to bypass checks for content built on topics or views using the access grant, add an

access_boostable: true

property to the grant.

Alter access to data when running queries in workbooks

. Only data access on dashboards is affected.

AccessBoost 🔥 Tips

Admin Restrictions

Embed Considerations

Only users with an Admin connection role can enable AccessBoost on content unless an Admin user enables the setting

Non-administrators can enable AccessBoost on content

in the

Admin > Content Permissions

settings.

Enabling AccessBoost for the

Organization

role also applies on content that is

embedded externally

which can pose security implications to consider. Typically, for embedded content Omni applies the Viewer connection role - which would

only

allow users to see dashboard tiles that are tied to

modeled topics

; limiting data that is exposed to external customers.

The good: the ability for embed users to view non-topic bound and SQL content in an embedded context.

The bad: if AccessBoost is enabled on an embedded document, a user could inadvertently expose data they do not want to expose to embed users.

Enabling AccessBoost

AccessBoost is enabled using the

AccessBoost

setting

Settings > Content Permissions > AccessBoost

When enabled at the organization level, you can set AccessBoost:

For your organization's

Default access role

Settings > Content Permissions > Default Content Access

At the content level, in the document or folder's

Share

modal

Examples

Level

Description

Enabled

Disabled

Organization

An admin user can enable or disable AccessBoost at the organization level in the Admin settings under Administration > Content Permissions

Allows users who manage content to enable AccessBoost at the folder and document levels

Prevents any users who manage content from enabling AccessBoost on the folder or document levels

Folder

Once an admin user has enabled AccessBoost in the Admin settings for Content Permissions the content manager users can choose to enable AccessBoost at the folder level.

Allows users with access to a folder to open any dashboards in that folder, view the content of those dashboards even if the user's connection role would prevent them from viewing that content. i.e. a dashboard built with SQL requires the user opening that dashboard to have a connection role of Querier or higher.

A user must have a viewer connection role or higher for dashboards built off of modeled topics. Any content on a dashboard built with SQL requires users to have a connection role of Querier or higher.

Document

A user managing their content can choose to enable AccessBoost at the document level

Allows users with access to the document to open and view the dashboard, but not workbook view, for a document even if the user's connection role would prevent them from viewing that content. i.e. a dashboard built with SQL requires the user opening that dashboard to have a connection role of Querier or higher.

Without AccessBoost, a user must have a viewer connection role or higher for dashboards built off of modeled topics. Any content on a dashboard built with SQL requires users to have a connection role of Querier or higher.

Sharing content externally

Omni has robust sharing functionality through

Delivery

and

Embedding

which allows users and organizations to securely share the data in a variety of forms.

Access warnings

Access warnings will appear as a yellow asterisk (

) on a dashboard when a tile contains content that may not be accessible to certain users. These warnings provide context that help make the dashboard viewing experience consistent for all users. When you see an access warning, check the tooltip for information on how to allow all users to see your dashboard.

When building dashboards you may need to consider how queries are constructed to avoid Viewers and Restricted Queriers from being restricted from viewing the underlying queries. This is beacuse Viewers and Restricted Queriers can only run Topic-based queries. They are not permitted to run queries defined outside of Topics, or run any query in a workbook which has altered Topic or Join Relationship definitions.

There are a few situations where you may encounter an access warning:

If a query is built from

All Views and Fields

or from raw

SQL

If a query has relationship changes in the workbook model that include

joins not present in the shared model

The presence of

access_filters

access_grants

where users do not have appropriate user attributes to view the data.

Changes to Dynamic Schemas

There are two ways to resolve an access warning:

Make the appropriate change in your query, which may look like:

Declaring a

topic

for your query

Promoting a workbook model

relationship to the shared model

Adjusting

user attributes

to meet access_filters or access_grants

Saving your raw SQL query as a

query view

Enable

Accessboost

(use with caution)

tip

If your query is built from

raw SQL

and you save it as a query view, make sure you either include it in a topic or make a new topic for that query view, or you will continue to see access warnings on your dashboard.

Content access permissions

Assigning access roles to content

Users and user groups

Organization

Inheriting access roles

What can users see?

Controlling document interactivity

Changing document URLs & identifiers

Boosting permissions with AccessBoost

Enabling AccessBoost

Examples

Sharing content externally

Access warnings

---

*This content was automatically extracted from [https://docs.omni.co/docs/finding-content/content-sharing](https://docs.omni.co/docs/finding-content/content-sharing) on 2025-07-23.*
