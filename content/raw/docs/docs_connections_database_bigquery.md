# Connecting Google BigQuery to Omni

**Source URL:** [https://docs.omni.co/docs/connections/database/bigquery](https://docs.omni.co/docs/connections/database/bigquery)  
**Extracted:** 2025-07-23 21:43:59  
**Source:** Omni Analytics Documentation

---

On this page

In this guide, you'll learn how to connect your Google BigQuery database to Omni.

Requirements

To follow the steps in this guide, you'll need:

Organization Admin permissions in Omni

Google Cloud admin permissions

, which are required to create a

service account

and

private key

The following details about the default dataset in your BigQuery project:

The

name

of the default dataset

Its

data location

Its

timezone

Need help finding the dataset?

Navigate to your BigQuery console.

Select the project your dataset resides in. Use the top middle drop-down menu to toggle between projects.

Select a dataset and the info will appear in the

Dataset info

menu. In this example:

The dataset

name

products

The

Data location

The

timezone

UTC-7

, as indicated in the

Last modified

field

Step 1: Create a BigQuery service account

Open the credentials page in the

Google Cloud Platform API Manager

and, if necessary, select your project.

Click

Create credentials

, located near the top center of the page, then

Service account

In the

Service account details

section:

Enter a name and description for the new service account, such as

Omni BigQuery

Click

Create and continue

In the

Grant this service account access to project

section, grant the service account access to the following

BigQuery roles

BigQuery Job User

BigQuery Data Viewer

After adding both roles, click

Done

. You'll be redirected to the

Credentials

page.

Step 2: Create a service account private key

In the

Service Accounts

section, click the service account you just created in

Step 1

On the service account details page, click the

Keys

tab near the top of the page.

Click

Add Key > Create new key

When prompted, select

JSON

as the key type and then click

Create

The JSON key will be saved to your computer.

After noting where the key was downloaded

, click

Close

Step 3: Set up a table upload dataset

note

This step is optional, but Omni recommends completing it as part of the initial connection setup.

In this step, you'll create a dedicated dataset to use for

table uploads

. This dataset can't be used for other modeled tables.

Navigate to your

BigQuery

project.

Create the dataset.

After the dataset is created, open it so that its details display.

Click

Sharing > Permissions

, located next to the

Copy

option near the top right corner of the page.

In the dialog that displays, click

Add principal

Fill in the fields as follows:

New principals

- Add the service account you created in

Step 1

Role

- Add the

BigQuery Data Editor

role

Click

Save

Step 4: Create the connection in Omni

In Omni, click

Settings > Connections

Click

Add connection

Click

BigQuery

Fill in the fields as follows:

Display name

Required

. Enter a name for the connection, which will display in the connections list in Omni.

Default dataset

- To include multiple projects, enter the names of the projects as a comma-separated list. For example,

project_2, project_3

Include schemas

- To only include specific

datasets

, enter the names of the

datasets

as a comma-separated list. Leaving this field blank will allow Omni to access all

datasets

in the

project

Note

: If you specified projects in the

Include other projects

field, reference the projects and datasets using dot notation. For example:

other_project.dataset

Service account JSON

- Add the JSON private key you created in

Step 2

Dataset

for Table Uploads

- Enter the name of the

dataset

where

table uploads

will be stored. If left blank, you'll still be able to upload tables but they won't be pushed to the database.

Region

Required

. Select the region the dataset resides in. This can be found in the BigQuery console, in the dataset's [

Data location

field]. Refer to the

Requirements

section

if you need help finding this information.

Database timezone

Required

. Select the timezone used by the dataset. This can be found in the BigQuery console, in the dataset's

Last modified

field. Refer to the

Requirements

section

if you need help finding this information.

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

Max Billing Bytes

- Enter the maximum number of bytes that are allowed to be processed for a single query made against the connection. The default is 1 TB.

When finished, click

Create connection

What's next?

Now that

BigQuery

is set up, you can:

Configure

user permissions, schema refreshes, environments

and

timezone settings

Learn how Omni

generates the model

associated with the connection

Requirements

Step 1: Create a BigQuery service account

Step 2: Create a service account private key

Step 3: Set up a table upload dataset

Step 4: Create the connection in Omni

What's next?

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/database/bigquery](https://docs.omni.co/docs/connections/database/bigquery) on 2025-07-23.*
