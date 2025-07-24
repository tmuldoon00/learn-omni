# Connecting MotherDuck to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/motherduck](https://docs.omni.co/docs/connections/database/motherduck)  
**Extracted:** 2025-07-23 21:44:02  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your MotherDuck database to Omni.

Requirements

To follow the steps in this guide, you'll need:

Organization Admin permissions in Omni

MotherDuck

database using

MotherDuck

v0.10.2 or higher

Step 1: Create a MotherDuck access token

Sign in to your

MotherDuck

account.

In top left corner of the page, click the organization name and then

Settings

Click

Integrations > Access Tokens

Click

+ Create token

Enter a

Name

for the token to make it easy to recognize. For example:

Omni connection

For

Token type

, select

Read/Write token

Optional

. Define expiration settings for the token.

Click

Create token

Copy the token.

Note

: The token will only display once, so make sure you copy it before closing the dialog.

Step 2: Set up a table upload schema

note

This step is optional, but Omni recommends completing it as part of the initial connection setup.

In this step, create a dedicated schema to use for

table uploads

. This can be in its own database or the same database as other schemas to be used in modeling.

Note

: The upload schema can't be used for other modeled tables.

Step 3: Create the connection in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

MotherDuck

Fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

Database

Required

. Enter the name of the database Omni should connect to.

You can copy the name of the database in

MotherDuck

by clicking the three dots next to the database, then

Copy name

Include other catalogs

- To include multiple databases, enter the names of the databases as a comma-separated list. For example,

database_2, database_3

Include schemas

- To only include specific

schemas

, enter the names of the

schemas

as a comma-separated list. Leaving this field blank will allow Omni to access all

schemas

in the

database

Note

: If you specified databases in the

Include other catalogs

field, reference the databases and schemas using dot notation. For example:

other_database.schema

Token

Required

. Paste the token you created in

Step 1

Schema

for Table Uploads

- Enter the name of the

where

table uploads

will be stored. If left blank, you'll still be able to upload tables but they won't be pushed to the database.

When finished, click

Create connection

What's next?

Now that

MotherDuck

is set up, you can:

Configure

user permissions, schema refreshes, environments

and

timezone settings

Learn how Omni

generates the model

associated with the connection

Requirements

Step 1: Create a MotherDuck access token

Step 2: Set up a table upload schema

Step 3: Create the connection in Omni

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/motherduck](https://docs.omni.co/docs/connections/database/motherduck) on 2025-07-23.*
