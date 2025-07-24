# Connecting dbt to Omni

**Source URL:** [https://docs.omni.co/docs/integrations/dbt/setup](https://docs.omni.co/docs/integrations/dbt/setup)  
**Extracted:** 2025-07-23 21:44:22  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to set up Omni's dbt integration by connecting a dbt repository to an Omni database connection.

Requirements

To follow the steps in this guide, you'll need:

An existing

database connection

in Omni

Omni Connection Admin permissions

for the connection you want to connect to dbt

Step 1: Retrieve the dbt repository's SSH URL

GitHub & GitLab

In your browser, navigate to the GitHub or GitLab

dbt

repository you want to connect to Omni.

Click the

Code

button.

In the modal that displays, locate the

SSH

option.

Keep this page open - you'll need it in the next step.

Azure DevOps

In your browser, navigate to the Azure DevOps

dbt

repository you want to connect to Omni.

Click the

Clone

button near the top right corner of the page.

Click the

SSH

option to display the repository's SSH URL.

Keep this page open - you'll need it in the next step.

Step 2: Create the dbt connection in Omni

In Omni, navigate to

Settings > Connections

Click the connection you want to use.

Click the

dbt

tab.

Fill in the following fields:

Git SSH URL

- Enter the SSH URL you retrieved in

Step 1

Git Branch

- Enter the name of the default branch for the repository. This is usually

main

master

Default Schema

- Enter the schema that dbt is configured to use. Think of this as the default schema where models will land without any overrides or customizations.

By default, dbt uses this schema as a prefix to name other schemas. For example, if your database has

dbt

dbt_one

, and

dbt_two

schemas, the default schema would be

dbt

How do I find my dbt project's default schema?

For dbt Cloud

- Navigate to

Deployment Environments

Production

Prod

Settings

Deployment Credentials

Schema

For dbt Core

- Check the

schema

key in your project's

profiles.yaml

Folder

- If your repository contains multiple dbt projects, enter the path to the folder that contains the dbt project you want to connect.

Click

Save

After the dbt connection is created, a

Public Key

will display. Leave this page open - you'll need it in the next step.

Step 3: Add the deploy key to your repository

In this step, you'll add the

Public Key

created in

Step 2

to your dbt repository as a deploy key.

GitHub

In the GitHub repository, click the

Settings

tab.

Click

Deploy keys

, located in the

Security

section of the left navigation.

Click

Add deploy key

Fill in the fields as follows:

Title

- Enter a descriptive title to help you identify what the key is used for. For example,

Omni Snowflake dbt

Key

- Copy the

Public key

from the Omni

dbt

settings

tab

and paste it into this field.

Allow write access

Check this box if you want to push changes made in Omni to the repository

Click

Add key

GitLab

Create a

project deploy key

for the GitLab repository by following

GitLab's documentation

Fill in the deploy key fields as follows:

Title

- Enter a descriptive title to help you identify what the key is used for. For example,

Omni Snowflake dbt

Key

- Copy the

Public key

from the Omni

dbt

settings

tab

and paste it into this field.

Grant write permissions to this key

Check this box if you want to push changes made in Omni to the repository

Click

Add key

Azure DevOps

Browse to the Azure DevOps web portal (ex:

https://dev.azure.com/<your-org-name>/

Click the

User settings

icon next to your avatar in the top right corner of the page.

Click

SSH public keys

On the page that displays, click

+ New Key

In the

Add New SSH Key

panel that displays, fill in the following:

Name

- Enter a descriptive name, such as

Omni Snowflake dbt

Public Key Data

- Copy and paste the

Public key

from the Omni

dbt

settings

tab

Click

Add

Step 4: Sync dbt metadata

In Omni, click the

Settings

tab on the connection page and locate the

Schema

section. In this section, click the

Refresh now

button.

This will sync metadata from your dbt repository into the connection's Omni model. The majority of the information Omni pulls is sourced from the

schema.yml

files that live alongside your project's models.

When a schema refresh is triggered, Omni compiles the dbt code and uses the resulting dbt manifest, which includes information such as finalized schema names and model dependencies.

If metadata changes in dbt, you’ll need to refresh the schema again in Omni. This can be done via the model menu in the IDE,

the connection page

(either manual or on a cron schedule), or by using the

Omni API

Requirements

Step 1: Retrieve the dbt repository's SSH URL

Step 2: Create the dbt connection in Omni

Step 3: Add the deploy key to your repository

Step 4: Sync dbt metadata

---

*This content was automatically extracted from [https://docs.omni.co/docs/integrations/dbt/setup](https://docs.omni.co/docs/integrations/dbt/setup) on 2025-07-23.*
