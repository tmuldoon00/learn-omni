# Database connection settings

**Source URL:** [https://docs.omni.co/docs/connections/manage/connection-settings](https://docs.omni.co/docs/connections/manage/connection-settings)  
**Extracted:** 2025-07-23 21:44:06  
**Source:** Omni Analytics Documentation

---

On this page

After you successfully connect a database to Omni, you can further configure settings for schema refreshes, default connection permissions, environments, and more.

General

The

Settings

tab of a connection's page contains general settings for the database, such as those for:

Connecting to the database, which are specific to each type of database

Schema restriction and refreshes

Timezones

Connection details

Settings such as

Host

Port

Username

, and

Password

are used to connect to the database. Each database type has its own set of settings. Refer to your database's setup guide for more information about these fields.

Timezones

Most database types will have a handful of timezone-related settings, such as

Database

Query Timezone

. Refer to the

Converting timezone data guide

for more information about these settings and how to configure them.

Schema restriction & refreshes

Schema restriction

To restrict the schemas Omni includes in the model, use the

Include Schemas

field. This allows you to specify only the schemas you want to pull into Omni. For example:

sales                  # Include only the sales schema

sales,engineering      # Include the sales and engineering schemas

Limiting the number of schemas in a model can improve performance by reducing model size.

Note

: Omni will model all schemas if this field is left blank.

Schema refreshes

The

Schema

section on the right side of the connection page contains settings that allow you to define how and when the connection's schema is refreshed. A refresh is when Omni checks the database for schema changes and merges (but doesn't overwrite) them with the existing Omni model.

On-demand & scheduled refreshes

To trigger an immediate schema refresh, click the

Refresh now

button.

Alternatively, you can use the

Schedule

button to define a cron schedule to refresh the schema. For example, if you know your ETL pipeline runs every day at the same time, you could define a schedule that refreshes the schema after the process completes to ensure your data is always up-to-date.

Omni uses Amazon Web Services (AWS) syntax for cron expressions. Refer to the

AWS documentation

for more information and examples.

Branch-based schema refreshes

By default, schema refreshes will immediately impact the shared model. If you prefer to review schema changes before they're promoted, enable the

Branch based schema refresh

setting. This will require schema refreshes to be performed in an

Omni branch

before they can be promoted to the shared model.

When this setting is enabled:

On-demand and scheduled refreshes will be disabled

Schema refreshes can only be triggered from the IDE

. If you’re not in an existing branch, selecting

Model > Refresh schema

will prompt you to create a branch first.

Note

: This setting can’t be enabled if a connection has multiple models or if connection environments (dynamic connections) are currently in use.

Permissions

The

Permissions

tab allows you to manage user access and permissions for the connection.

Base access

The

Base Access

section of this tab allows you to establish the minimum level of access users will have for the connection.

Note

: The base role will override less permissive roles specified using the

Connection roles

settings.

Connection roles

The

Connection Roles

section allows you to apply more granular connection permissions for individual users or groups. Refer to the

User permissions documentation

for information about different configuration types.

Environments

The

Environments

tab allows you to define additional environments for the connection, which can changes the connection you're querying against while in an Omni branch. For example, you could set up environments that allow you to test and validate changes in a

dev

connection, but run workbook queries against a

production

connection. Refer to the

Dynamically switching database environments guide

for more information and setup steps.

dbt

If your organization leverages dbt, this will be where you manage that connection. Read more about our dbt integration

here

Archive

The

Archive

tab allows you to delete a connection from your organization. When a connection is deleted, the connection and its associated models and content will be moved to the

Trash

Sensitive information, such as passwords and keys, will be fully deleted.

General

Connection details

Timezones

Schema restriction & refreshes

Permissions

Base access

Connection roles

Environments

dbt

Archive

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/manage/connection-settings](https://docs.omni.co/docs/connections/manage/connection-settings) on 2025-07-23.*
