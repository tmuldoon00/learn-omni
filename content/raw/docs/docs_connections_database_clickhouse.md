# Connecting ClickHouse to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/clickhouse](https://docs.omni.co/docs/connections/database/clickhouse)  
**Extracted:** 2025-07-23 21:43:59  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your ClickHouse database to Omni.

Requirements

To follow the steps in this guide, you'll need:

Organization Admin permissions in Omni

Permissions in ClickHouse

that allow you to access connection credentials

Step 1: Retrieve ClickHouse connection details

In ClickHouse, navigate to the warehouse you want to connect to Omni.

Click

Connect

in the side navigation.

A dialog like the following will display:

The information you need is highlighted in the above image, specifically:

Username

- In the above image, the username is ClickHouse's default (

default

), but this may differ for you [1]

Password

Host

- This is a string similar to

https://<some-string>.eastus2.azure.clickhouse.cloud

Port

- In the above image, the port is

[1]If you want Omni to connect through a clickhouse user other than default, you'll need to make sure that user has at least SELECT permission for the schemas you include as well as INFORMATION_SCHEMA.SCHEMATA and INFORMATION_SCHEMA.TABLES to generate the Omni model.

Keep this information handy - you'll need it to complete the setup.

Step 2: Allowlist Omni's IP addresses

If access to

ClickHouse

limited by IP address

, you'll need to add Omni's IPs to the allowlist before you create the database connection.

Omni's IP addresses can be found on an individual connection's page, accessed by navigating to

Settings > Connections

and clicking a connection.

Step 3: Create the connection in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

ClickHouse

Fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

Host

Required

. Enter the host address for the database.

This is the host address you retrieved from ClickHouse in Step 1.

Port

Required

. Enter the port used by the database.

This is the port you retrieved from ClickHouse in Step 1.

Default schema

Required

. Enter the name of the default schema for the database.

Include schemas

- To only include specific

schemas

, enter the names of the

schemas

as a comma-separated list. Leaving this field blank will allow Omni to access all

schemas

in the

database

Username

Required

. Enter the username of the database user you want Omni to use.

This is the ClickHouse username you retrieved in Step 1.

Password

Required

. Enter the password for the database user.

This is the ClickHouse password you retrieved in Step 1.

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

When finished, click

Create connection

What's next?

Now that

ClickHouse

is set up, you can:

Configure

user permissions, schema refreshes, environments

and

timezone settings

Learn how Omni

generates the model

associated with the connection

Requirements

Step 1: Retrieve ClickHouse connection details

Step 2: Allowlist Omni's IP addresses

Step 3: Create the connection in Omni

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/clickhouse](https://docs.omni.co/docs/connections/database/clickhouse) on 2025-07-23.*
