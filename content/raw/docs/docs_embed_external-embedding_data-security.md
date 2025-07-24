# Data security best practices

**Source URL:** [https://docs.omni.co/docs/embed/external-embedding/data-security](https://docs.omni.co/docs/embed/external-embedding/data-security)  
**Extracted:** 2025-07-23 21:44:12  
**Source:** Omni Analytics Documentation

---

On this page

For internal embedding the content will only be visible to

logged-in members of your Omni organization

that have access to the underlying content. If they are not already logged in, they will be prompted to authenticate through the iFrame.

For both internal and external embedding the best practice for protecting data is to leverage

user attributes

to systematically filter the data.

Omni connection base roles

We recommend that you set

connection base roles

to either

No Access

Viewer

by default.

Multi-tenant customer data

Hidden filters & security

Segmenting data using hidden dashboard filters is not a secure practice.

Typically, companies choose one of the following strategies to set up multi-tenant customer data:

Row level security

- If all of the data is inside one table, you can assign a user attribute per user and client and use it as an

access filter

. Specifically make sure to set up a default access filter to control in Omni with

default_topic_access_filters:

Schema level security

- If each client is in a separate, identical schemas then you can leverage

dynamic schemas

Database level security

- If each client is in a separate database and the schemas are identical across databases, you can leverage

dynamic database environments

Embedded dashboards

Embedded dashboards won't render correctly if the content you want to embed meets

any

of the following criteria:

Content contains fields not modeled in a topic

Content built on SQL

Content saved in your personal folder (the content must be in the

Shared

hub)

Content that contains changes to the workbook model's joins which have not been merged or promoted

warning

In the event that you want to expose SQL-based or non-topic bound content to your embed users, you can accomplish this by enabling the

AccessBoost

role

in the content's

Share

settings.

This has security implications

, as you may expose data to your embed users that you don't want them to see.

Omni connection base roles

Multi-tenant customer data

Embedded dashboards

---

*This content was automatically extracted from [https://docs.omni.co/docs/embed/external-embedding/data-security](https://docs.omni.co/docs/embed/external-embedding/data-security) on 2025-07-23.*
