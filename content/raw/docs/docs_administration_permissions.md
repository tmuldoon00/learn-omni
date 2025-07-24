# Managing data access with connection permissions

**Source URL:** [https://docs.omni.co/docs/administration/permissions](https://docs.omni.co/docs/administration/permissions)  
**Extracted:** 2025-07-23 21:43:45  
**Source:** Omni Analytics Documentation

---

On this page

At a high level, permissions in Omni are set at the database connection, data model, and content levels. On this page we will work through how to set up database connection permissions. Refer to

Organization settings

and

Data access control

guides for more information.

User permissions are first set on the individual database connection then more fine-tuned permissions can be assigned to individual users or groups within the organization, streamlining the management process.

Connection permission basics

Who can define connection permissions?

Organization Admins

and users who have

Connection Admin

permissions for a connection can define connection permissions.

What are the connection roles?

Omni currently supports five connection roles, ordered from the

least

permissive to the

most

permissive:

No access

Viewer

Restricted Querier

Querier

Connection Admin

For the specifics of what each role can and cannot do, refer to the

Connection roles

section in the

Permissions reference

section of this guide.

Can default permissions be applied to a connection?

Yes. Using the

Base access

setting

, you can assign the minimum role users will have for the connection. More permissive roles can be set in the connection's

Connection roles

section.

Note

: The base role will override a less permissive role set in the

Connection roles

section.

Can permissions be set at the model level?

Not currently. Permissions can only be set at the connection level, which will apply to all the models associated with the connection.

What permissions should I set to do [thing]?

It depends on what you want to achieve! Do you want to lock everything down, or only restrict access for some things? Or perhaps it varies by team or dataset?

In the

Common permissions scenarios guide

, we've outlined some common scenarios and how to use permissions to achieve the desired result. For example, limiting access to folders based on the team a user belongs to.

Defining permissions for a connection

info

Organization Admin

Connection Admin

permissions for the connection are required to define connection permissions.

To access the connection's

Permissions

tab

Click

Settings > Connections

Click the connection.

Click the connection's

Permissions

tab:

On this page, you can define default access for the connection (

Base access role

) and roles for specific users and/or user groups.

Not sure what permissions to set?

Check out the

Common permissions scenarios guide

to learn what permissions to set in specific scenarios, such as restricting access to datasets based on team.

Testing data access

As you assign connection roles to users, you can

impersonate users

to test what users can see. This can be helpful in preemptively surfacing access warnings, which will display when users attempt to access specific types of content. Refer to the

Access warnings

guide to learn what an access warning is and how to resolve it.

Permissions reference

Connection roles

Loading data...

Documents

This section describes the actions different connection roles can take regarding

documents

Loading data...

Workbooks

This section describes the actions different connection roles can take in the

workbook

section of a document.

Loading data...

Dashboards

This section describes the actions different connection roles can take in the

dashboard

section of a document.

Loading data...

Modeling

This section describes the actions different connection roles can take when interacting with the connection's

model

Loading data...

Branches

This section describes the actions different connection roles can take when interacting with

branches

Loading data...

Administration

This section describes the actions different connection roles can take regarding the

connection's settings

Note

: Managing users, such as inviting them to your Omni instance, is handled by

Organization Admins

Loading data...

Connection permission basics

Defining permissions for a connection

Testing data access

Permissions reference

Connection roles

Documents

Workbooks

Dashboards

Modeling

Branches

Administration

---

*This content was automatically extracted from [https://docs.omni.co/docs/administration/permissions](https://docs.omni.co/docs/administration/permissions) on 2025-07-23.*
