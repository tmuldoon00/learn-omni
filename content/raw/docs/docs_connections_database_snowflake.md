# Connecting Snowflake to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/snowflake](https://docs.omni.co/docs/connections/database/snowflake)  
**Extracted:** 2025-07-23 21:44:04  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your Snowflake database to Omni.

Requirements

To follow the steps in this guide, you'll need:

Organization Admin permissions in Omni

Permissions in

Snowflake

that allow you to:

Create database users and grant permissions

Allowlist IP addresses

Set up key-pair authentication

Step 1: Create a database user for Omni

Sign in to your Snowflake account.

Create a new worksheet.

Run the following to create a role and user for Omni, and grant privileges:

use

role ACCOUNTADMIN

create

role

not

exists

omni_role

create

user

not

exists

omni_user

grant

role omni_role

user

omni_user

alter

user

omni_user

set

default_role

omni_role

alter

user

omni_user

set

type

service

set

default_warehouse

'<warehouse>'

-- grant read only database access - repeat for all database/schemas:

grant

usage

monitor

database

database

role omni_role

grant

usage

monitor

schema

database

schema

role omni_role

grant

usage

monitor

warehouse

warehouse

role omni_role

-- alternatively, grant read only database access across all schemas:

grant

usage

monitor

database

database

role omni_role

grant

usage

monitor

all

schemas

DATABASE

database

role omni_role

grant

usage

monitor

future schemas

DATABASE

database

role omni_role

grant

usage

monitor

warehouse

warehouse

role omni_role

-- grant access to all tables in the schema to omni_role:

grant

select

all

tables

schema

database

schema

role omni_role

grant

select

future

tables

schema

database

schema

role omni_role

-- grant access to all views in the schema to omni_role:

grant

select

all

views

schema

database

schema

role omni_role

grant

select

future views

schema

database

schema

role omni_role

-- grant ownership of omni_role to omni_user:

grant

role omni_role

user

omni_user

Step 2: Set up a table upload schema

note

This step is optional, but Omni recommends completing it as part of the initial connection setup.

In this step, you'll create a dedicated schema to use for

table uploads

. This schema can't be used for other modeled tables.

Create the schema in

Snowflake

. This can be in its own database or the same database as other schemas to be used in modeling.

Run the following commands to grant the Omni user the required privileges:

grant

usage

database

upload_database

role omni_role

grant

usage

create

table

schema

upload_database

csv_schema

role omni_role

Step 3: Allowlist Omni's IP addresses

If access to the

Snowflake

database is

limited by IP address

, you'll need to add Omni's IPs to the allowlist before you create the database connection. For Redshift, this typically means creating a security group and adding an inbound traffic rule for each IP address.

Omni's IP addresses can be found on an individual connection's page, accessed by navigating to

Settings > Connections

and clicking a connection.

Step 4: Retrieve your Snowflake account identifier

In Snowflake, click your user icon in the bottom left corner of the page and then hover over

Account

In the account selector, click the

View account details

link under the account:

In the

Account Details

dialog, locate and copy the

Account Identifier

Refer to the

Snowflake documentation

for information about Snowflake account identifiers.

Step 5: Create the connection in Omni

note

Snowflake connection parameters can be case sensitive, and are often capitalized. If you see errors on connection, confirm your connection parameters match your Snowflake environment exactly.

In Omni, click

Settings > Connections

Click

Add connection

Click

Snowflake

Fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

Account identifier

Required

. The account identifier you retrieved in

Step 4

Warehouse

Required

. The name of the Snowflake warehouse.

Database

Required

. Enter the name of the database Omni should connect to.

Include Other Databases

- The names of other databases to generate models for.

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

Keypair authentication

- Click the toggle to enable key-pair authentication. You'll complete the setup in

Step 6

after the connection is created.

Password

- Leave this blank, as you'll be using key-pair authentication.

Schema

for Table Uploads

- Enter the name of the

schema

where

table uploads

will be stored. If left blank, you'll still be able to upload tables but they won't be pushed to the database.

To specify the database, use dot notation. For example:

<DATABASE>.<SCHEMA>

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

Step 6: Set up Snowflake key-pair authentication

What happened to passwords?

By November 2025,

Snowflake will no longer allow single-factor password authentication

. Using key-pair authentication is recommended to prevent any disruptions.

If you selected

Use keypair authentication

during setup, you'll be redirected to the

Keypairs

tab after the connection is created to complete the setup. Omni can generate the keypair for you, or you can provide an existing

private key

Omni-generated key-pair

In the

Keypairs

tab, click

Generate key-pair

Click

Copy

next to the public key.

Navigate back to your Snowflake account and run the following:

alter

user

omni_user

set

RSA_PUBLIC_KEY

'COPIED_PUBLIC_KEY'

In the

Keypair

tab in Omni, click the toggle in the

Active

column to enable the keypair.

Existing private key

Private key requirements

Omni only supports RSA private keys without passphrases.

In the

Keypairs

tab, click

Add existing key

Paste the private key into the dialog. For example:

-----BEGIN PRIVATE KEY-----

MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCXHK07oaqx8fnY

r3UbfUS6HRXQFRvQ0J8qqzgq+UH4ZqtgxV44ciSOwzL65E2aZrixXxB+s7Kbbw1q

...

...

fAPCZRg8vdG8Hp26PwXxybZ/M9u7NaKJ0BT4AwKKtZTUxZVxz/kPhdHT+MpoQqJf

JuzuwXVAAcl1GME2OiqkZhww

-----END PRIVATE KEY-----

Note

: Omni will automatically add

-----BEGIN PRIVATE KEY-----

and

-----END PRIVATE KEY-----

if the key doesn't have them.

Click

Add keypair

. Omni will automatically generate the public key and redirect you back to the

Keypairs

tab.

Click

Copy

next to the newly-generated public key.

Navigate back to your Snowflake account and run the following:

alter

user

omni_user

set

RSA_PUBLIC_KEY

'COPIED_PUBLIC_KEY'

In the

Keypair

tab in Omni, click the toggle in the

Active

column to enable the keypair.

Note

: If you have multiple Snowflake connections, each connection must use a different key-pair. We recommend using a different Snowflake user for each connection, but these users can use the same Snowflake role to simplify permissions administration.

What's next?

Now that

Snowflake

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

Step 4: Retrieve your Snowflake account identifier

Step 5: Create the connection in Omni

Step 6: Set up Snowflake key-pair authentication

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/snowflake](https://docs.omni.co/docs/connections/database/snowflake) on 2025-07-23.*
