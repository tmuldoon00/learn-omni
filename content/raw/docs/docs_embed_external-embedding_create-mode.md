# Create mode

**Source URL:** [https://docs.omni.co/docs/embed/external-embedding/create-mode](https://docs.omni.co/docs/embed/external-embedding/create-mode)  
**Extracted:** 2025-07-23 21:44:11  
**Source:** Omni Analytics Documentation

---

On this page

Customers don’t just want to see data. They want to interact with it, explore it, and get their own insights, without waiting for a data team to make adjustments. With

Create mode

for Omni embedding, you can allow your users to create, share, and navigate content as if they were in the native Omni app.

Entities

Create mode uses an

entity

parameter to isolate embed customers from each other. This ensures that users can only see and share content with other users in their

entity

. Refer to the

Enabling create mode section

for an example.

When Omni detects a new entity value, a dedicated, shared folder and user group is automatically created for the entity. Only the entity that the folder was created for and admins on your Omni organization can access it. Refer to the

User roles & content permissions

for more information on controlling user access to content.

Enabling create mode

To enable Create mode for an embedded Omni instance, set the

mode

embed URL parameter to

APPLICATION

mode=APPLICATION

). For example:

# This example adds line breaks for readability

https://myorg.omniapp.co/embed/login?

contentPath=%2Fdashboards%2F12db1a0a

&externalId=1234abcd

&name=Blobby

&nonce=OYZFNSulBHxivB9xBw7kAsv4aDu7zl4G

&signature=kYnijvMXMBmVQ3wJ6mfmR132qOZZpnZlRi2uSvEjZYA

&userAttributes=%7B%7D

&entity=blobs_r_us

&connectionRoles=%7B%22c0f12353-4817-4398-bcc0-d501e6dd2f64%22%3A%22RESTRICTED_QUERIER%22%7D

&mode=APPLICATION

&entityFolderContentRole=VIEWER

&groups=%5B%5D

Refer to the

Embed parameters reference

for more information about URL parameters.

User roles & content permissions

Two parameters control how embed users can interact with content when in Create mode:

Connection role

connectionRoles

), which determines if a user can create content or only consume it

Entity folder content role

entityFolderContentRole

), which determines if a user can add or manage content for their entity

Refer to the following table for information about how these roles map and the permission sets they produce.

Connection role

Entity folder content role

Permissions

Viewer

Viewer

View content

Restricted querier

Viewer

Create content only in a user's private folder

Share content with other users in the entity

Restricted querier

Editor or Manager

Create content in the

Shared

folder or a user's private folder

Share content to the entity's

Shared

folder

Entity folder and group labels

By default, the labels of an entity's generated folder and user group will be human-readable versions of the associated entity value. As an example, entity

"tottenham_hotspur"

would generate a folder and group labeled

Tottenham Hotspur

in the Omni UI.

If you'd like to customize the names of the generated entity group and folder, you can use the

entityFolderLabel

and

entityGroupLabel

parameters.

These parameters are useful if you want multiple entity groups and folders to have the same label for an entity A and B. For example, if you have two entities -

acme_marketing

and

acme_finance

- but want the generated groups and folders to both appear as

Acme

in the Omni UI, you can do so using the

entityFolderLabel

and

entityGroupLabel

parameters.

Entities

Enabling create mode

User roles & content permissions

Entity folder and group labels

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/external-embedding/create-mode](https://docs.omni.co/docs/embed/external-embedding/create-mode) on 2025-07-23.*
