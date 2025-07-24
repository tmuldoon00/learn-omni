# Connecting Databricks to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/databricks](https://docs.omni.co/docs/connections/database/databricks)  
**Extracted:** 2025-07-23 21:44:00  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your Databricks database to Omni.

Requirements

To follow the steps in this guide, you'll need

Organization Admin permissions in Omni

Step 1: Generate credentials

Omni can use either personal access token (PAT) or OAuth machine-to-machine (M2M) credentials to authenticate to Databricks.

To use a PAT

- Follow the Databricks

Access Token for a service principal guide

. When you create the connection in Omni, you'll select the

Personal Access Token

as the

Authentication type

To use an M2M

- Follow the Databricks

Authenticate as a service principal guide

. When you create the connection in Omni, you'll select the

OAuth M2M Authentication

as the

Authentication type

Step 2: Retrieve database connection details

Next, you'll need to retrieve your database's connection details from Databricks. Follow the steps in

this Databricks guide

, specifically the

getting connection details for a Databricks SQL warehouse

section.

Step 3: Create the connection in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

Databricks

Fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

Host

Required

. Enter the host address for the database.

This is the host address you retrieved from Databricks in Step 2.

HTTPPath

Required

. Enter the

HTTPPath

you retrieved from Databricks in Step 2.

NOTE: Ensure that your HTTPPath is for a SQL Warehouse, not a generalized compute cluster

Default catalog

Required

. Enter the default catalog for the database.

Include schemas

- To only include specific

schemas

, enter the names of the

schemas

as a comma-separated list. Leaving this field blank will allow Omni to access all

schemas

in the

database

Default schema

- Enter the name of the default schema for the database.

Authentication Type

- Select the authentication type you chose in

Step 1

and enter the credentials into their corresponding fields.

Schema

for Table Uploads

- Enter the name of the

schema

where

table uploads

will be stored. If left blank, you'll still be able to upload tables but they won't be pushed to the database.

Database Timezone

Required

. Select the timezone used by the

database

Query timezone

Required

. If specified, data will be converted from the

Database timezone

to this timezone when querying. Refer to the

Converting timezone data guide

for more information.

Allow User-Specific Timezones

- Check this option to allow individual users'

Query timezone

settings to be used as the query timezone for the connection.

When finished, click

Create connection

What's next?

Now that

Databricks

is set up, you can:

Configure

user permissions, schema refreshes, environments

and

timezone settings

Learn how Omni

generates the model

associated with the connection

Requirements

Step 1: Generate credentials

Step 2: Retrieve database connection details

Step 3: Create the connection in Omni

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/databricks](https://docs.omni.co/docs/connections/database/databricks) on 2025-07-23.*
