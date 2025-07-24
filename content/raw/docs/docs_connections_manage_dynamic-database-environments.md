# Dynamically switching database environments

**Source URL:** [https://docs.omni.co/docs/connections/manage/dynamic-database-environments](https://docs.omni.co/docs/connections/manage/dynamic-database-environments)  
**Extracted:** 2025-07-23 21:44:06  
**Source:** Omni Analytics Documentation

---

On this page

Using database environments, you can allow users to easily switch environments in an Omni branch or assigning defaults by using

user attributes

This can be useful for:

Development workflows

that test and validate changes against a non-production database

Embedded instances with multi-tenant data

where each customer must be restricted to only their own data

Limitations

To work correctly, the underlying schema for each database connection should be as close to identical as possible. When a connection is switched, the

schema model

- such as the available tables, views, and so on - is swapped, but the overarching model remains the same.

For example, if a model utilizes an object that exists in one connection but not in another, modeling errors will arise.

Requirements

To follow the steps in this guide, you'll need

Omni Organization Admin

permissions.

Step 1: Create the primary connection

The first step is to create the primary connection which will be used to build the shared model. Refer to the

Database setup guides

for instructions specific to different database types.

In this guide, the primary connection is a Snowflake database named

Snowflake (production)

that has an associated data model with the same name.

Step 2: Create & configure the environments

Create another connection, which must be the same database type as the

primary connection in Step 1

Navigate back to the details page for the primary connection.

Click the

Environments

tab.

Click the

New Environment

button, which will open a dialog like the following:

Select the secondary connection. In this example, the connection is named

Snowflake (dev)

Click

Save

At this point, you use the connections in workbooks. Creating a new branch will display an option to change the connection environment from the primary connection (

Snowflake (production)

) to other environments (

Snowflake (dev)

If you want to dynamically assign an environment based on user attributes, continue to

Step 3

Step 3: Define dynamic environments

note

The steps in this section are required only if you want to dynamically assign database environments.

Step 3.1: Create a user attribute

In this step, you'll create a user attribute that will be used to determine the connection a given user should be assigned to.

Navigate to

Settings > Attributes

Click

New Attribute

Fill in the fields to create the attribute, including the

Default Value

field. This will set a default value for users that don't have a value directly assigned:

In this example, users will be assigned to

prod

unless their

snowflake_env

attribute is specifically set to

dev

When finished, click

Save

Need access to multiple environments?

In some cases a single user may need access to multiple environments, such as both

dev

and

prod

. In these situations:

Set

Multiple Values

Yes

when creating the user attribute, and

Ensure all required values are

assigned to the user

as a comma-delimited list. For example:

prod,dev

Step 3.2: Configure the connection

The last step is to configure the primary connection to dynamically assign environments using the

user attribute

you just created.

Navigate to the

primary connection

you created in

Step 1

of this guide.

Click the

Environments

tab.

Allow environments to be assigned dynamically

. Fill in the fields that display as follows:

User attribute

- Enter the

reference name

of the user attribute you created in

Step 3.1

. In this example, that would be

snowflake_env

Values for the default connection

- Enter the value to be used for the default connection. In this example, that would be

prod

Click

Update

After clicking

Update

, a new field will display next to the connection in the

Environments

section. Use this field to assign a value to the connection, which will route users with this user attribute value to the connection.

In this example, users with a

dev

value for the

snowflake_env

user attribute will be routed to the

Snowflake (dev)

connection:

Click

Update

What's next?

That's it! Users will now be able to use the same data model but change connections based on how their user attributes are defined.

If specific users need access to a connection other than the default, the next step is to assign them the appropriate user attribute value. Refer to the

User attributes guide

for more info.

Limitations

Requirements

Step 1: Create the primary connection

Step 2: Create & configure the environments

Step 3: Define dynamic environments

Step 3.1: Create a user attribute

Step 3.2: Configure the connection

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/manage/dynamic-database-environments](https://docs.omni.co/docs/connections/manage/dynamic-database-environments) on 2025-07-23.*
