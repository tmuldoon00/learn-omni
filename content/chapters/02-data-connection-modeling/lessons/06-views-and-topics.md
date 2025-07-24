# Database views

**Source URL:** [https://docs.omni.co/docs/modeling/views](https://docs.omni.co/docs/modeling/views)  
**Extracted:** 2025-07-23 21:44:33  
**Source:** Omni Analytics Documentation

---

On this page

View files contain view configuration, fields (dimensions, measures, and filters), relationships, and query definition (if the view is based upon a query in Omni rather than a database table).

View files will re-order on save:

Metadata

This defines attributes of the view

name

label

tags

ignored

hidden

Definition

This defines the table or query the given view is based upon

schema

table_name

query

sql

primary_key

Fields

These are the modeled objects that allow for self-service querying

dimensions

measures

filters

Adding New Views

Views can be added via the menu bar under File.  The model will contain a view for each table in the database.  Tables and views are nested under their schemas, and will be auto-foldered when a schema is defined in a view.

Additionally, modelers may toggle between user-defined fields in Omni, 'Model', or all fields including the untouched fields from the database schema, 'Combined'. Note that 'Model' and 'Combined' are relative to which model layer you are in. When you are viewing the Shared model, like the screenshot below, 'Model' refers to user defined fields in the Shared model. However, if you are in a Workbook model then 'Model' refers to the user-defined changes only for the workbook and does not include the user-defined fields in the Shared model or the untouched fields from the database schema:

Aliased Views

Often views need to be aliased or duplicated, for example in a two sided market with buyers and sellers pointing to a users table.  These aliased views are automatically created via joins.  This means if, rather than users, you want joins for buyers and sellers, you'd create two joins.  Note joins that are then required for buyers and sellers would also need to be declared to these aliased names.

join_to_view

users

join_to_view_as

buyers

join_type

always_left

relationship_type

many_to_one

on_sql

order_items.user_id

= $

buyers.id

reversible

false

join_to_view

users

join_to_view_as

sellers

join_type

always_left

relationship_type

many_to_one

on_sql

order_items.user_id

= $

sellers.id

reversible

false

View Definition

This section defines the data used in a given view. Views are defined from a single-schema, and either a table or a query.

extends:

Allows for inheriting from another view inside of Omni. The extended view will inherit the attributes of the base or template view. Additional attributes - such as joins or filters - can be added to the extended view and will be scoped only to the extended view.

extends

view_name

If attributes included in the extended view are also defined in the base view, the values in the extended view will override the values in the base view. For example:

base_view

description

This is a base view

extended_view

extends

base_view

# Description for extended_view will be

# `This is an extended view from the base view` instead of base_view's `This is a base view`

description

This is an extended view from the base view

🎥 Check out a video walkthrough!

fill_fields:

query

fields

"lead.created_date[week]"

lead.count

base_view

lead

filters

lead.created_date

time_for_duration

30 weeks ago

30 weeks

fill_fields

"lead.created_date[week]"

sorts

field

lead.created_date

week

fill_fields

will fill an enumerated list, usually dates

Most useful when you want a

query view

as a base table for other date objects and want to ensure all dates are represented in the data set.  This will avoid any ad hoc date series building.

Note that to fill, Omni requires knowledge of the beginning and end of the fill set (ie

last 200 days

).  If the date series is unbounded on either side, Omni will not fill the dimension.

Expects one or more dimensions from the query

primary_key_sql:

Primary keys have been moved inside fields for simpler declaration and organization.  See the

docs here

If you'd like to define a compound / composite primary key for a view (i.e. use multiple fields as the view's primary key), see

custom_compound_primary_key_sql

below.

custom_compound_primary_key_sql:

The

custom_compound_primary_key_sql

parameter allows you to define an array of field names that make up the view's compound primary key (also known as a composite primary key).

Recommended Usage

custom_compound_primary_key_sql

field1

field2

...

General recommendation:

Simply enter field names directly without any quotes or special formatting. Omni will automatically adapt the field references to match your database's specific requirements when saving.

# Recommended approach that works across all databases

custom_compound_primary_key_sql

created_at_month

Database-Specific Behavior

When you save your view definition, Omni will automatically format field references according to your database type:

Snowflake

Field names are automatically converted to uppercase and wrapped in double quotes

Example:

[ id, created_at_month ]

becomes

[ '"ID"', '"CREATED_AT_MONTH"' ]

BigQuery

Field names remain as provided without additional quotes

Example:

[ id, created_at_month ]

becomes

[ id, created_at_month ]

Example View Definition

# Reference this view as user_orders_per_month

schema

PUBLIC

# Define compound primary key based on month and user id

custom_compound_primary_key_sql

created_at_month

query

fields

order_items.created_at

month

created_at_month

users.id

order_items.count

dim_count

base_view

order_items

filters

order_items.created_at

time_for_duration

6 months ago

6 months

sorts

field

order_items.created_at

month

topic

order_items

dimensions

created_at_month

dim_count

measures

count

aggregate_type

count

Field names should match the dimension names in your view definition

tip

An alternative to

custom_compound_primary_key_sql

is to create a concatenated field that contains those fields, and then setting the dimension level parameter of

primary_key: true

for that field. This will increase readability and potentially make things easier in the case of debugging primary key related errors.

primary_key_field:

sql: concat(${field_1},'-',${field_2})

primary_key: true

hidden: true

query:

query

fields

order_items.created_at

date

created_at

order_items.user_id

user_id

order_items.total_sales

filters

orders.amount_returns

not

base_view

order_items

### note dimension names will match the aliased names above after the colon

dimensions

created_at

timeframes

date

sql

created_at

user_id

sql

user_id

sales

sql

order_items__total_sales

### example with a field that was not aliased in block above

This will define a view from a workbook query. The query argument specifies the spec of the query for the view (fields, filters, base_view).

Often the easiest way to build

query views

is via the UI and then promoting the view into the model.

Fields in the query can be aliased using a colon to create cleaner names downstream (

user_id

instead of

order_items__user_id

schema:

schema

GITHUB

table_name

ASSET

Defines the database schema for the given

table_name

sql:

sql

SELECT *

FROM users

LIMIT 10

dimensions

sql

primary_key

true

first_name

sql

first_name

For views defined from raw SQL queries

It's recommended to build SQL views from the workbook UI and push down to the model

table_name:

schema

Ecomm

table_name

Orders

Omni will infer

table_name: {view_name}

if it is not defined explicitly.

uploaded_table_name:

uploaded_table_name

products.csv

1a3497f5

cba8

47c0

bab9

b2df84d1b141

Applicable to views created from

uploaded CSV/XLSX files

. A unique identifier used by Omni to identify the table in Omni storage.

View Metadata

ai_context:

Free text that can provide context to the

AI query helper

. Refer to the

Optimizing models for AI

guide for more information on best practices.

For example, context could include behavioral prompting:

ai_context

you are the head of finance. you are concerned with the status of customer payments. you often need to project into the future how many invoices are due and for how much. you also need to know if any invoices are late so you can reach out to those customers.

Or example queries and structured Omni results:

View example

ai_context

question: which customers are behind due on payment?

answer

"limit"

"sorts"

"column_name"

"share_rillet_omni_omni__invoices.due_date"

"sort_descending"

true

"is_column_sort"

false

"null_sort"

"OMNI_DEFAULT"

"table"

"share_rillet_omni_omni__invoices"

"fields"

"share_rillet_omni_omni__invoices.customer_id"

"share_rillet_omni_omni__invoices.customer_name"

"share_rillet_omni_omni__invoices.invoice_number"

"share_rillet_omni_omni__invoices.due_date"

"share_rillet_omni_omni__invoices.total_amount"

"pivots"

"dbtMode"

false

"filters"

"share_rillet_omni_omni__invoices.due_date"

"is_negative"

false

"kind"

"BEFORE"

"right_side"

"today"

"type"

"date"

"ui_type"

"BEFORE"

"share_rillet_omni_omni__invoices.status"

"type"

"string"

"kind"

"EQUALS"

"values"

"unpaid"

"is_negative"

false

"case_insensitive"

true

"modelId"

"aeb6f3f4-b0e5-4abb-97eb-eaeb42a16944"

"version"

"rewriteSql"

true

"row_totals"

"fill_fields"

"calculations"

"column_limit"

"join_via_map"

"column_totals"

"userEditedSQL"

"dimensionIndex"

"default_group_by"

true

"join_paths_from_topic_name"

"invoices"

aliases:

Occasionally the name of a table may change in your database, which can cause content pointing at that table to break. Rather than going through and tracking down everywhere that the content broke we can simply add

aliases:

to the new view file. This will point all references from the old table's name to the updated table, restoring content and eliminating content related errors.

For example, below we had the

OLD_ORDER_ITEMS_NAME

table renamed in our database to

ORDER_ITEMS

. Upon refreshing the schema in Omni, our content built on top of this table broke due to the change in name. By making the below update to the

ORDER_ITEMS.view

file in the model IDE, our content will now be fixed

# Reference this view as order_items

Schema: PUBLIC

table_name: ORDER_ITEMS

primary_key_sql: [ "${order_items.id}" ]

aliases: [OLD_ORDER_ITEMS_NAME]

default_drill_fields:

default_drill_fields

user_id

users.full_name

inventory_items.product_name

sale_price

margin

"order_items.created_at[date]"

status

This will set the default drill set for all measures in a given view

default_drill_fields

will be overridden by a given fields

drill_fields

(more

here

Empty

default_drill_fields

will remove drill from a field (i.e.

default_drill_fields: []

display_order:

table_name

Orders

display_order

Omni expects a whole number

This will override the sort order for the field picker amongst views

display_order

will supersede alphabetical sorting

For example, if the orders view is given a

display_order:

it will float to the top of the field picker, and the remaining views would be sorted alphabetically

hidden:

hidden

true

Remove the view from the UI. Still reference-able in the model; hidden in the workbook UI.

Note that views will not be removed from the schema itself, so will be available through SQL querying

The core difference between ignoring and hiding is that ignoring will block model references to the view, while hidden will not, in both cases the view will be hidden from the topic pivottable experience

Expects 'true' or 'false'

ignored:

ignored

true

Effectively removes the view from the model (soft delete, for example to hide undesirable schema tables). This will result in the breakage of references to the specific view.

Note that views will not be removed from the schema itself, so will be available through SQL querying

Expects 'true' or 'false'

label:

schema

Ecomm

table

Users

label

Users With Orders

Label will override the view name for all UI appearances of the view

Omni expects unquoted text (quotes will be removed / ignored)

required_access_grants:

Limits a user's ability to query a view based on an assigned user attribute. The referenced

access_grant

must already exist in the model file. Refer to the

Controlling data access guide

for more information.

You can also conditionally allow access by using pipes (

) and commas (

) to create

and

AND

conditions.

required_access_grants

grant_one

# Grant access if conditions are met for either access grant

required_access_grants

grant_one

grant_two

# Grant access if conditions are met for:

# grant_one

# OR

# grant_two AND grant_three

required_access_grants

grant_one

grant_two

grant_three

materialized_query:

(Aggregate Awareness)

## This table would be built from the underlying user_facts table declared as:

## SELECT users.id as user_id,

##        order_items.created_at[month] as month,

##        COUNT(order_items.id) as count,

##        SUM(order_items.sale_price) as total_sale_price

## FROM order_items

## JOIN users ON users.id = order_items.user_id

## GROUP BY 1,2

name: user_facts

## SQL declaration used to ensure column order matches the materalized query below

sql: >

SELECT user_id, month, count, total_sale_price

FROM user_facts

dimensions:

user_id: {}                          ## user_facts.user_id

month: {}                            ## user_facts.month

count: {}                            ## user_facts.count

total_sale_price: {}                 ## user_facts.total_sale_price

materialized_query:

fields:

users.id,

"order_items.created_at[month]",

order_items.count,

order_items.total_sale_price

base_view: order_items

Materialized query allows you to configure aggregate awareness between two different views. This is to be used on the aggregated view to direct Omni when to point at the aggregated table based on a set of fields from the base table that are being used.

For example:

If we had an

order_items

table with several metrics in Omni, we could build a

user_facts

view rolling up this table (note, Omni field names as the reference points).  Order in the SQL statement matches order in the query reference (so using

sql:

can be better than

table:

to ensure order).

user_facts.user_id

-->

${users.id}

user_facts.month

-->

${order_items.created_at[month]}

user_facts.count

-->

${order_items.count}

user_facts.total_sale_price

-->

${order_items.total_sale_price}

Note the mapping is done entirely with column order (fact table itself and

materialized_query

See more about aggregate awareness

here

name:

# Reference this view as ecomm__users

schema

Ecomm

table

Users

label

Users With Orders

Name is implicit in the file name of the view. This is how the view and fields are referenced, independent of the labels applied.

tags:

tags

foo

bar

tags

foo

bar

foobar

Hidden feature, this will be used to curate view and field groups for UI curation and sharing

Expects a comma-delimited array of strings

template:

Used on abstract models

. Disables the content validator. This is useful because abstract models are logical constructs that aren't tied to data. More

here

template

true

Joins

note

Views representing a

data input table or uploaded CSV/XLSX file

can't be used in a join unless the table has been uploaded to a database.

Refer to the

Relationships & Joins

documentation.

Fields

Refer to the

Dimensions

and

Measures

documentation.

Adding New Views

Aliased Views

View Definition

extends:

fill_fields:

primary_key_sql:

custom_compound_primary_key_sql:

query:

schema:

sql:

table_name:

uploaded_table_name:

View Metadata

ai_context:

aliases:

default_drill_fields:

display_order:

hidden:

ignored:

label:

required_access_grants:

materialized_query:

(Aggregate Awareness)

name:

tags:

template:

Joins

Fields

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/views](https://docs.omni.co/docs/modeling/views) on 2025-07-23.*
