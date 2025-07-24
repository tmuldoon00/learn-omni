# Organization settings

**Source URL:** [https://docs.omni.co/docs/administration/organization-settings](https://docs.omni.co/docs/administration/organization-settings)  
**Extracted:** 2025-07-23 21:43:44  
**Source:** Omni Analytics Documentation

---

On this page

note

Organization Admin

permissions are required to access and modify Organization settings.

The

Settings > General

tab contains settings that apply to your entire Omni organization. From here, you can control user, content, and Omni support access.

General

Settings in the

General

tab control the organization's name, default timezone, user invitations, and support settings.

Setting

Description

Default timezone

Defines the default timezone for the organization, which is used in emails sent by Omni.

Note

: This setting doesn't apply to

database connections

, which have their own timezone settings.

New user invitations

Allows new users to request an invitation to the Omni organization from the login page

Support > Session recording

Allows Omni support to have access to replays of sessions where bugs or errors were encountered

Support > Automatic support user creation

Allows Omni support to automatically access your instance for assistance and problem solving

Support > Limit Omni support logins by region

Contact Omni support for access to this setting

. Allows you to limit logins from Omni support to a specific region. When set to something other than

All regions

, the support user's IP address must reside in the specified region to successfully log in to your instance.

Contacts

The

Settings > Contacts

tab allows you to define contact persons for your organization. These settings accept comma-separated lists of email addresses.

Setting

Description

Billing

Defines the contact person(s) for notices about billing and payments related to your organization.

Security and Privacy

Defines the contact person(s) for notices about security and privacy, including subprocessor updates.

Content permissions

Settings in the

Content permissions

tab control how users in your organization access and create content.

Setting

Description

Default content access

Defines the default user role that all users will have for content (documents and folders) they have access to. Users can be granted additional permissions at the document or folder level - this setting only defines a default base role.

Note

: Users with

Manager

Owner

roles have the ability to set the organization access role higher or lower than the default role defined in this setting.

Default document abilities

Defines default abilities for all documents in the organization. These settings control the abilities users can select in documents:

Upload data

, such as CSV and XLSX files

Schedules

(Alerts and deliveries).

Note

: Disabling this setting will not remove any existing alerts or deliveries.

Downloading

query results

and

dashboards

Create spreadsheets

Drilling

Creating

a new analysis

from the document

Allow

Viewers

to see the workbook when accessing the documents

Content creation > Shared "root" is open

Allows users to add documents and folders to the root of your organization's

Hub

(shared folder). Otherwise, users will be able to create content in folders they have specifically been granted access to.

AccessBoost

Enables permission boosting, which will ignore a user's database connection role.

Non-administrators can enable AccessBoost on content

is also enabled, users with SQL editing permissions can also enable AccessBoost on documents. Refer to the

Sharing content guide

for more information about AccessBoost, including its security implications.

Delivery personalization

Enforces personalization of deliveries with user attributes. If enabled, the

Personalize delivery with the recipient's user attributes

option in the

Deliveries & Alerts settings

will be removed, as this setting forces the user of the recipient's attributes.

Public access

Allows users to access content without logging in to your Omni organization. If enabled, a default access role can also be set for external users who access the content.

General

Contacts

Content permissions

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/organization-settings](https://docs.omni.co/docs/administration/organization-settings) on 2025-07-23.*
