# Using data input tables to enter & upload data

**Source URL:** [https://docs.omni.co/docs/connections/upload-csvs](https://docs.omni.co/docs/connections/upload-csvs)  
**Extracted:** 2025-07-23 21:44:08  
**Source:** Omni Analytics Documentation

---

On this page

Sometimes you may want to utilize data in an analysis that isn't in one of your

database connections

, whether it's for data enrichment or an initial exploration. Creating a data input table allows you to add data to Omni, whether by manually entering data or uploading a CSV or XLSX, without needing to touch your data pipelines.

Requirements

To add data input tables, you'll need:

Restricted Querier

Querier

, or

Connection Admin

permissions

To enable the

Upload data ability

. This setting must be enabled for the

organization

and, if a document is shared with others, also in the

document's settings

Recommended:

Create a schema in your database where Omni can write the CSV files. See the

setup guide for your database

for more instructions on write backs.

Limitations

Currently, data input tables:

Must be added in a workbook

Are limited to

500,000

rows

Can't be used in joins unless the table is pushed to a database. Setting the connection's

Schema for table upload

property enables this functionality. Refer to the

setup guide for your database

for more information.

Adding a data input table to a workbook

Data input tables can be added in the workbook of any document. There are two ways to add a data input table:

From an existing query

Adding a blank table

From an existing query

To create a data input table from an existing query:

In the workbook, open the query tab.

Click

Model > Save as a source table

When prompted, enter a name for the table.

Click

Create

A new

Source

tab will be created. At this point, you can directly edit the data in the table.

When finished editing, click

Save changes

New blank table

In a workbook, navigate to

Edit > New blank table

. A new tab with a blank data input table will display.

To get data into the table, you can manually enter it or upload a CSV or XLSX:

Manually enter data

In the first row, add the names of the columns. The first row must be a header row to allow Omni to generate a schema for the table.

Enter data into the cells. To add line breaks, use

Ctrl + Enter

To add rows or columns, use the

Add Row

and

Add Column

options.

When you're finished editing the table, click

Save CSV

near the top right corner of the page.

Enter a name for the table and click

Save

Upload a CSV or XLSX

CSV and XLSX requirements

To upload a CSV or XLSX:

The first row must be a header row

The file can't exceed

500,000

rows

Additionally, if the XLSX file contains multiple tabs, only the first sheet will be uploaded.

Click the

Upload CSV

option near the top right corner of the page.

Browse for or drag the file you want to upload into the upload dialog.

If you have

Querier or Connection Admin

permissions

, you'll see a

Create topic

checkbox. Checking this box will create a topic from the uploaded file. If you're a

Restricted Querier

, a topic will automatically be created from the file.

Click

Upload

to upload the file.

Once there's data in the table, click

Query CSV

to create a query using the data. The table will also become available in the field picker in other queries.

Querying & joining data input tables

Data input tables can be queried like any other table, including using the field picker,

SQL editor

, or working with

calculations and formulas

Note

: To make the data available outside of the workbook, you'll need to

promote it to the shared model

How you join data from a data input table to other data depends on whether table uploads are enabled for the database connection used by the workbook:

Traditional joins (Requires database uploads)

If database uploads are enabled for the connection, you can use

traditional joins

- whether via the UI or in SQL - to create relationships between data input tables and other data.

Workbook tab joins with XLOOKUP

If database uploads aren't enabled for the connection, you won't be able to use traditional joins with data input tables. You can, however, use

XLOOKUP

to perform cross-tab analysis in a workbook:

=XLOOKUP(lookup_value, <query_tab_name>!<lookup_range>, <query_tab_name>!<return_range>)

For example, you have a workbook with two tabs:

Sales

, which is backed by a topic, and

Products Upload

, which is a query on a data input table. You want to include the names of products purchased in an order alongside other sales data. To join the data in the

Products Upload

tab to your sales, you could use an

XLOOKUP

formula like the following to create a new calculation in the

Sales

tab:

=XLOOKUP(A1,'Products Upload'!B:B, 'Products Upload'!C:C)

Modeling & promoting data input tables

When a data input table is added to a workbook, a few things will happen in the

workbook model

. To make the changes available outside of the workbook,

they must be promoted to the shared model

view

representing the data input table will be created

. These views can be identified by the presence of an

uploaded_table_name

parameter:

products.view

# Reference this view as products

uploaded_table_name

products.csv

1a3497f5

cba8

47c0

bab9

b2df84d1b141

topic

based on the view representing the data input table will be created if

Create topic

was selected while uploading a CSV or XLSX, or

A Restricted Querier performed the upload

Views and topics created from data input tables can be modeled like any other view or topic. However, if the data input table hasn't been pushed to the connection's database, attempting to use the data input table in a join in the IDE will result in the following content validation error:

View "<view_name>" references an uploaded table. Uploaded tables cannot be used in joins.

If data from a data input table hasn't been pushed to a database, only

XLOOKUP

can be used to perform joins to other tabs in a workbook. Refer to the

Querying & joining data

section for more information and examples.

Updating data input table data

When making updates to a data input table, keep the following in mind:

Changes must be promoted to the shared model to be accessible outside the workbook

. This is necessary even if the table was previously promoted to the shared model.

If table uploads (writebacks) are enabled for the connection

, Omni will create a new table in the database each time the table is saved. You can manage previous versions of the table in the

Upload management

page

To update a data input table's data:

In a workbook, locate the table in a query tab.

Click the options menu next to the table's name, then

Edit Table

The data input table will open in a new tab where you can edit the data as needed.

Click

Save changes

when finished.

Upon a successful save, the updated table will immediately become available in the workbook. Omni will also log a new version of the table in the

Upload management

page

Managing previous table versions

Every time you

create

update

a data input table, Omni adds an entry in the

Upload management

page. Each item in the list represents a version of the table. Entries are sorted by the time they were created, beginning with the most recent.

Navigate to

Settings > Uploads

to access this page:

Querying previous table versions

To create a query using a specific version of a table, click the

View in New Analysis

button next to the table version. This will open a new workbook that uses the specified version of the table.

Note

: If you promote the changes from an older version of the table, it will overwrite the data currently in the shared model.

Deleting table versions

Heads up!

Deleting a table version can't be undone

. Before continuing, note that:

The version of the table will be permanently deleted from your Omni instance. If table uploads (writebacks) are enabled, the version of the table will also be deleted from the database.

Queries, views, and topics built on the version will result in an error after the deletion

The

Upload management

page can be used to delete previous versions of a data input table.

Note

: Table versions are listed in the order they were created, meaning that the most recent version of a table will be higher in the list.

Navigate to

Settings > Uploads

Locate the version you want to remove and click

Delete

After the deletion is complete, you'll also need to:

Remove views and topics built on the version from the model

Update or remove queries using the version

Requirements

Limitations

Adding a data input table to a workbook

From an existing query

New blank table

Querying & joining data input tables

Modeling & promoting data input tables

Updating data input table data

Managing previous table versions

Querying previous table versions

Deleting table versions

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/upload-csvs](https://docs.omni.co/docs/connections/upload-csvs) on 2025-07-23.*
