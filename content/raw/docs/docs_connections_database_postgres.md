# Connecting Postgres to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/postgres](https://docs.omni.co/docs/connections/database/postgres)  
**Extracted:** 2025-07-23 21:44:03  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your Postgres database to Omni.

Requirements

To follow the steps in this guide, you'll need:

Organization Admin permissions in Omni

Permissions in

Postgres

that allow you to create database users

Step 1: Create an Omni database user

In your

Postgres

database, run the following command to create a database user for Omni:

Create Omni user

CREATE

USER

omni

WITH

ENCRYPTED PASSWORD

'<password>'

GRANT

CONNECT

DATABASE

database_name

omni

\c database_name

GRANT

SELECT

ALL

SEQUENCES

SCHEMA

public

omni

GRANT

SELECT

ALL

TABLES

SCHEMA

public

omni

Next, you'll grant permissions to the Omni user. If you're using a schema other than

public

, run the following to grant usage to Omni:

Grant usage to the Omni user

GRANT

USAGE

SCHEMA

schema_name

omni

Lastly, run the following to make any tables created in the future will be accessible:

ALTER

DEFAULT

PRIVILEGES

SCHEMA

public

GRANT

SELECT

tables

omni

ALTER

DEFAULT

PRIVILEGES

SCHEMA

public

GRANT

SELECT

sequences

omni

Step 2: Set up a table upload schema

note

This step is optional, but Omni recommends completing it as part of the initial connection setup.

In this step, you'll create a dedicated schema to use for

table uploads

. This schema can't be used for other modeled tables.

Create the schema in

Postgres

Run the following commands to grant the Omni user the required privileges:

GRANT

USAGE

CREATE

SCHEMA

upload_schema_name

omni

Step 3: Allowlist Omni's IP addresses

If access to the

Postgres

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

Postgres

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

Postgres

Database

Required

. Enter the name of the database Omni should connect to.

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

Postgres

is set up, you can:

Configure

user permissions, schema refreshes, environments

and

timezone settings

Learn how Omni

generates the model

associated with the connection

Requirements

Step 1: Create an Omni database user

Step 2: Set up a table upload schema

Step 3: Allowlist Omni's IP addresses

Step 4: Create the connection in Omni

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/postgres](https://docs.omni.co/docs/connections/database/postgres) on 2025-07-23.*
