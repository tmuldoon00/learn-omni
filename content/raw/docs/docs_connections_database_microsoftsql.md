# Connecting Microsoft SQL Server to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/microsoftsql](https://docs.omni.co/docs/connections/database/microsoftsql)  
**Extracted:** 2025-07-23 21:44:01  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your Microsoft SQL Server database to Omni.

Requirements

To follow the steps in this guide, you'll need:

Organization Admin permissions in Omni

Microsoft Azure Portal Admin permissions

, which are required to allowlist Omni's IP addresses

Step 1: Retrieve connection details

Navigate to your

Microsoft Azure Portal

In the portal, navigate to the database you want to connect to Omni.

On the database's details page, locate the

Connection strings

field:

Click the

Show database connection strings

link.

On the page that displays, click the

JDBC

tab:

You should see something like the following, which will contain all the information you need:

jdbc

sqlserver

//omni

test

admin.database.windows.net

1433;

database=e

commerce;

user=omni

test

admin@omni

test

admin;

password=

your_password_here

encrypt=true;

trustServerCertificate=false;

hostNameInCertificate=

*.database.windows.net;

loginTimeout=30;

Step 2: Set up a table upload schema

note

This step is optional, but Omni recommends completing it as part of the initial connection setup.

In this step, you'll create a dedicated schema to use for

table uploads

. This schema can't be used for other modeled tables.

Create the schema in

Microsoft SQL Server

. This can be in its own database or the same database as other schemas to be used in modeling.

Run the following commands to grant the Omni user the required privileges:

GRANT

CREATE

TABLE

omni

GRANT

ALTER

INSERT

SELECT

UPDATE

SCHEMA

::upload_schema_name

omni

Step 3: Allowlist Omni's IP addresses

If access to the SQL Server database is limited by IP address, you'll need to add Omni's IPs to the allowlist before you create the database connection.

Omni's IP addresses can be found on an individual connection's page, accessed by navigating to

Settings > Connections

and clicking a connection.

Navigate to your

Microsoft Azure Portal

In the left navigation, click the

Networking

option under

Security

In the

Firewall rules

section, click

Add a firewall rule

Create a rule for each of Omni's IP addresses:

Step 4: Create the connection in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

Microsoft SQL Server

Fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

Host

Required

. Enter the host address for the database.

Port

Required

. Enter the port used by the database.

The default for SQL Server is

Database

Required

. Enter the name of the database Omni should connect to.

This is the

database

value in the connection string you retrieved in Step 1.

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

Required

. Enter the name of the default schema for the database.

The default for SQL Server is

dbo

Username

Required

. Enter the username of the database user you want Omni to use.

This is the

user

value in the connection string you retrieved in Step 1.

Password

Required

. Enter the password for the database user.

This is the

password

value in the connection string you retrieved in Step 1.

Trust Server Certificate

- Check this option if you don't want Omni to validate the server's SSL/TLS certificate.

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

Query timeout

- Enter the number of seconds a query has to execute before the database cancels it. The default is

seconds.

When finished, click

Create connection

What's next?

Now that

SQL Server

is set up, you can:

Configure

user permissions, schema refreshes, environments

and

timezone settings

Learn how Omni

generates the model

associated with the connection

Requirements

Step 1: Retrieve connection details

Step 2: Set up a table upload schema

Step 3: Allowlist Omni's IP addresses

Step 4: Create the connection in Omni

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/microsoftsql](https://docs.omni.co/docs/connections/database/microsoftsql) on 2025-07-23.*
