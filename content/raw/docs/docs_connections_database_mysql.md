# Connecting MySQL to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/mysql](https://docs.omni.co/docs/connections/database/mysql)  
**Extracted:** 2025-07-23 21:44:02  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your MySQL database to Omni.

Requirements

To follow the steps in this guide, you'll need:

Organization Admin permissions in Omni

Permissions in

MySQL

that allow you to create database users

Step 1: Create a database user for Omni

In your

MySQL

database, run the following command to create a database user for Omni:

Create Omni user

CREATE

USER

omni IDENTIFIED

WITH

mysql_native_password

'<password>'

Next, run the following command to grant the Omni user access to the database:

Grant SELECT permissions to Omni user

GRANT

SELECT

database_name

'omni'

@'%'

Step 2: Set up a table upload schema

note

This step is optional, but Omni recommends completing it as part of the initial connection setup.

In this step, you'll create a dedicated schema to use for

table uploads

. This schema can't be used for other modeled tables.

Create the schema in

MySQL

Run the following commands to grant the Omni user the required privileges:

GRANT

SELECT

CREATE

INSERT

UPDATE

DELETE

upload_schema_name

'omni'

@'%'

Step 3: Allowlist Omni's IP addresses

If access to the

MySQL

database is limited by IP address, you'll need to add Omni's IPs to the allowlist before you create the database connection.

Omni's IP addresses can be found on an individual connection's page, accessed by navigating to

Settings > Connections

and clicking a connection.

Step 4: Create the connection in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

MySQL

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

The default for

MySQL

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

This is the Omni user you created in Step 1.

Password

Required

. Enter the password for the database user.

This is the password you assigned to the Omni user in Step 1.

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

MySQL

is set up, you can:

Configure

user permissions, schema refreshes, environments

and

timezone settings

Learn how Omni

generates the model

associated with the connection

Requirements

Step 1: Create a database user for Omni

Step 2: Set up a table upload schema

Step 3: Allowlist Omni's IP addresses

Step 4: Create the connection in Omni

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/mysql](https://docs.omni.co/docs/connections/database/mysql) on 2025-07-23.*
