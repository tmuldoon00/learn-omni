# Writing SQL in Omni

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/sql](https://docs.omni.co/docs/querying-and-sql/sql)  
**Extracted:** 2025-07-23 21:44:37  
**Source:** Omni Analytics Documentation

---

On this page

When querying data in Omni behind the scenes we’re generating

Omni SQL operators

that are intended to simplify complex syntax. Omni SQL is an abstraction on top of the dialect SQL that makes writing SQL in Omni even faster than a standard SQL editor.

If you want to see the Omni SQL being generated you can always pop open the SQL dialog box by clicking the

SQL

button in the top right hand corner of the workbook or by going to the

View Menu

SQL

If you leave that dialog open, you will see the generated SQL as you manipulate data through the field picker and UI gestures.

Editing Omni SQL

The Omni SQL is editable by clicking the button in the top right and corner of the SQL dialog box

Advanced Editor

. For field references, use

${ }

notation, fully scoped to the view, ie

${user_facts.lifetime_value//}

To run the new SQL query you’ve edited, you can use the keyboard shortcut on Macs 'Command + Enter` or select the run (▶️) button in the top right hand corner of the workbook.

If Omni can’t interpret the SQL functions used, an error message will appear with the option to open a

SQL tab

. To undo any changes to the query use the back button in the web browser.

Query Fields (Query Models)

Query Models represent temporary or localized modifications to how data fields are interpreted or displayed within a single query's context, rather than permanently changing the way those fields are defined in the underlying shared or workbook model.

Query models only exist in the scope of one specific query.

Query models do not affect the global data model or how the same field behaves in other workbooks or queries.

In most cases, these modifications should be promoted to the workbook model rather than remain in the query model.

For example:

When you edit Omni SQL in the Advanced Editor, Omni will try to parse it. If the resulting SQL contains fields that don't match those that exist in the workbook or shared model, Omni will represent them in the UI by creating query fields that are specific to that query. These are called query fields, and can often have nice friendly names if you’ve given them aliases in the query which may look something like 'Custom Field 0'.

Once you've finished editing SQL in the Advanced Editor you may either promote those query fields to the workbook (and then optionally promote to the shared model) or save that new query as a view (query view).

Best practice is to work out of a SQL tab which will allow you to write SQL without generating any query fields.

Omni SQL operators

Omni offers a handful of accelerator functions that make writing SQL easier and faster. When you build queries through the UI, you may see these show up in the SQL editor. You can also write these directly when hand-writing SQL.

List of Omni SQL operators

Date functions:

OMNI_DATE

OMNI_DATETIME_INTERVAL_ADD

OMNI_DATETIME_LITERAL

OMNI_DATETIME_UNIT_INTERVAL_ADD

OMNI_DAY_OF_MONTH

OMNI_DAY_OF_QUARTER

OMNI_DAY_OF_WEEK

OMNI_DAY_OF_WEEK_INDEX

OMNI_DAY_OF_YEAR

OMNI_HOUR

OMNI_HOUR_OF_DAY

OMNI_MILLISECOND

OMNI_MINUTE

OMNI_MONTH

OMNI_MONTH_NAME

OMNI_MONTH_NUM

OMNI_QUARTER

OMNI_QUARTER_OF_YEAR

OMNI_SECOND

OMNI_WEEK

OMNI_YEAR

Calculations:

OMNI_OFFSET

OMNI_PERCENT_CHANGE_FROM_PREVIOUS

OMNI_PERCENT_OF_PREVIOUS

OMNI_PERCENT_OF_TOTAL

OMNI_RANK

OMNI_RUNNING_PRODUCT

OMNI_RUNNING_TOTAL

Custom SQL Filters

Enabling custom SQL filters directly from a workbook is possible by creating custom SQL queries using templated filter syntax. By implementing the

templated filter syntax

, you can link dashboard filters to specific fields or filter fields in the query. Although the process can be a bit complex, it offers flexibility in filtering data within SQL queries and ultimately allowing dashboard tiles based on SQL queries to have dynamic filters.

Setup Instructions

Video Tutorial

To set this up write a SQL query like this example:

SELECT * FROM order_items as items

WHERE

{{# order_items.created_at.filter }} items.created_at {{/ order_items.created_at.filter}}

AND {{# order_items.status.filter }} items.status {{/ order_items.status.filter}}

LIMIT 100

This query will parse out the filters so they can be altered from the UI and even be mapped to dashboard filters. The field referenced in the

{{ # filter_name_here }}

has to be a field or filter field that exists in a table and referenced the exactly as it is modeled. In this example,

order_items.created_at.filter

is written with the view referenced

order_items

even though the SQL query aliases the table as

items

because

order_items

is the modeled view's name.

SQL tabs

Workbooks can also be used as a SQL IDE for ad hoc analysis by selecting

Start from SQL

on a new workbook at the bottom of the page and then write queries in the appropriate dialect for your database and select the run (▶️) button. Queries generated in this state will be shown as a tab with

SQL

prefacing the title of the tab.

When using the SQL tab, the field picker will be hidden by default and fields will not be selectable. The results from the query will also not be editable (yet) however all of the chart options and other Omni functionalities will be available to users (eg. downloading, appearing on dashboards, visualizing the data etc.)

Editing Omni SQL

Query Fields (Query Models)

Omni SQL operators

Custom SQL Filters

SQL tabs

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/sql](https://docs.omni.co/docs/querying-and-sql/sql) on 2025-07-23.*
