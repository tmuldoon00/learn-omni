# Understanding SQL generation in Omni

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/sql-generation](https://docs.omni.co/docs/querying-and-sql/sql-generation)  
**Extracted:** 2025-07-23 21:44:37  
**Source:** Omni Analytics Documentation

---

On this page

When building an analysis - whether that's through the workbook or using AI - Omni generates SQL to execute against your data warehouse and returns the results.

Omni accomplishes this by leveraging the models, relationships, and topics defined in the semantic layer to dynamically build SQL statements. Through this process, Omni is able to optimize queries for application performance and readability while also providing graceful handling for data fanouts using symmetric aggregates.

Omni provides the flexibility to query data in two main ways:

Through the virtualized schema model

Directly using raw SQL.

When using raw SQL, Omni will not generate or override any SQL logic.

Key concepts

Semantic model

Think of a semantic model as instructions to Omni on how to write SQL on your behalf. Omni breaks down common SQL statements you might write into small, reusable pieces that can be pieced together on demand.

You don't have to run everything through a semantic model in Omni - and likely shouldn't! - but it can be a powerful tool for enabling self-service reporting, AI querying, and improved change management through your BI tool.

Views

View files

in Omni are virtualized representations of tables (or views) within your data warehouse that tell Omni how fields in the workbook map to fields in your data warehouse.

These map to the

FROM

and

JOIN

statements in SQL.

Relationships

Relationships tell Omni the join logic that should be used when the multiple views are used in the same analysis.

This maps to a

JOIN

statement in SQL.

Dimensions

Dimensions are field definitions, which can be either a column reference or a calculated field (e.g.

datediffs

case whens

). Dimensions are attributes that can be queried and grouped by.

These go into

SELECT

and

GROUP BY

statements in SQL.

Measures

Measures are field definitions specifically for aggregations -

sums

counts

averages

, etc.

These go into the

SELECT

statement in SQL, but won't be grouped by.

Topics

Topics

are not required for using Omni's semantic model but they are a helpful tool for adding an extra layer of curation on top of your semantic model.

They let you explicitly control how the UI looks and feels to users and have more control over what's allowed to be queried for specific contexts. This is especially helpful if they are less familiar with the data warehouse (e.g. tables, schemas, column names, etc.). For example, you may want to curate which fields, tables, and joins are allowed to be used together or perhaps there is a field calculation that has different logic based on the context that it's getting queried with. Topics will also enable you to manage row-level security, force default behaviors (filters, joins, etc.), and overwrite model and relationship logic if necessary.

In the context of SQL, topics can be curated to influence all elements of generated SQL.

Inspecting query SQL

A great way to learn what Omni is doing is to see the SQL generated when you build a query. You can view the generated SQL by opening a workbook.

For every query, Omni generates two layers of SQL:

SQL wrapped in Omni helper functions

Dialect SQL executed against the database

SQL wrapped in Omni helper functions

This layer contains

Omni's accelerator functions

and is optimized for cache performance and readability. You can inspect this SQL by clicking the

SQL

button in a workbook query tab:

In this example, the SQL looks like this:

SQL with Omni helper functions

SELECT

OMNI_SUM

${order_items

sale_price}

"order_items.total_sale_price"

OMNI_DATE

"CREATED_AT"

"order_items.created_at[date]"

FROM

"ORDER_ITEMS"

"order_items"

WHERE

${order_items

status

NOT

'Returned'

'Cancelled'

${order_items

status

NULL

GROUP

ORDER

NULLS

FIRST

Dialect SQL executed against the database

This layer of SQL is written in the same dialect used by the database backing the connection in Omni. All field references and Omni functions will be translated to the flavor of SQL used by your database. In fact, you could copy this SQL query and run it in another IDE pointed at the database.

You can view the dialect SQL by toggling the

Inspector

on in a workbook query tab:

In this example, the SQL looks like this:

Dialect SQL

SELECT

COALESCE

SUM

"SALE_PRICE"

"order_items.total_sale_price"

DATE_TRUNC

'DAY'

"CREATED_AT"

"order_items.created_at[date]__raw"

TO_CHAR

DATE_TRUNC

'DAY'

"CREATED_AT"

'YYYY-MM-DD'

"order_items.created_at[date]"

FROM

"ORDER_ITEMS"

"order_items"

WHERE

"STATUS"

NOT

'Returned'

'Cancelled'

"STATUS"

NULL

GROUP

ORDER

NULLS

FIRST

Examples

Let's look at a few examples to bring everything together. Click the following dropdowns to view the examples, each of which contains a clip of a workbook interaction that builds the

Omni-wrapped SQL

for a query and its corresponding

dialect SQL

Adding a measure (

SELECT

Dialect SQL

Dialect SQL

SELECT

COUNT

DISTINCT

"ID"

"ecomm__order_items.total_orders"

FROM

"ECOMM"

"ORDER_ITEMS"

"ecomm__order_items"

SQL with Omni helper functions

Adding a dimension (

SELECT

GROUP BY

Dialect SQL

Dialect SQL

SELECT

TO_CHAR

DATE_TRUNC

'DAY'

"CREATED_AT"

'YYYY-MM-DD'

"ecomm__order_items.created_at[date]"

COUNT

DISTINCT

"ID"

"ecomm__order_items.total_orders"

FROM

"ECOMM"

"ORDER_ITEMS"

"ecomm__order_items"

GROUP

ORDER

NULLS

FIRST

SQL with Omni helper functions

Adding a field from another view (

JOIN

Dialect SQL

Dialect SQL

SELECT

DATE_TRUNC

'DAY'

"ecomm__order_items"

"CREATED_AT"

"ecomm__order_items.created_at[date]__raw"

"ecomm__users"

"STATE"

"ecomm__users.state"

COUNT

DISTINCT

"ecomm__order_items"

"ID"

"ecomm__order_items.total_orders"

TO_CHAR

DATE_TRUNC

'DAY'

"ecomm__order_items"

"CREATED_AT"

'YYYY-MM-DD'

"ecomm__order_items.created_at[date]"

FROM

"ECOMM"

"ORDER_ITEMS"

"ecomm__order_items"

LEFT

JOIN

"ECOMM"

"USERS"

"ecomm__users"

"ecomm__order_items"

"USER_ID"

"ecomm__users"

"ID"

GROUP

ORDER

NULLS

FIRST

SQL with Omni helper functions

Filtering by a dimension (

WHERE

Dialect SQL

Dialect SQL

SELECT

DATE_TRUNC

'DAY'

"ecomm__order_items"

"CREATED_AT"

"ecomm__order_items.created_at[date]__raw"

"ecomm__users"

"STATE"

"ecomm__users.state"

COUNT

DISTINCT

"ecomm__order_items"

"ID"

"ecomm__order_items.total_orders"

TO_CHAR

DATE_TRUNC

'DAY'

"ecomm__order_items"

"CREATED_AT"

'YYYY-MM-DD'

"ecomm__order_items.created_at[date]"

FROM

"ECOMM"

"ORDER_ITEMS"

"ecomm__order_items"

LEFT

JOIN

"ECOMM"

"USERS"

"ecomm__users"

"ecomm__order_items"

"USER_ID"

"ecomm__users"

"ID"

WHERE

"ecomm__users"

"STATE"

'Michigan'

GROUP

ORDER

NULLS

FIRST

SQL with Omni helper functions

Filtering on a measure (

HAVING

Dialect SQL

Dialect SQL

SELECT

DATE_TRUNC

'DAY'

"ecomm__order_items"

"CREATED_AT"

"ecomm__order_items.created_at[date]__raw"

"ecomm__users"

"STATE"

"ecomm__users.state"

COUNT

DISTINCT

"ecomm__order_items"

"ID"

"ecomm__order_items.total_orders"

TO_CHAR

DATE_TRUNC

'DAY'

"ecomm__order_items"

"CREATED_AT"

'YYYY-MM-DD'

"ecomm__order_items.created_at[date]"

FROM

"ECOMM"

"ORDER_ITEMS"

"ecomm__order_items"

LEFT

JOIN

"ECOMM"

"USERS"

"ecomm__users"

"ecomm__order_items"

"USER_ID"

"ecomm__users"

"ID"

WHERE

"ecomm__users"

"STATE"

'Michigan'

GROUP

HAVING

COUNT

DISTINCT

"ecomm__order_items"

"ID"

ORDER

NULLS

FIRST

SQL with Omni helper functions

Implementing symmetric aggregates to handle fan out

Ensuring the correctness of data is every analyst's top priority.

Symmetric aggregates

allow you to ensure aggregateions are always correct without needing to be aware of table relationships and fan outs.

Understanding table fan out

To demonstrate why symmetric aggregates are so useful, let's start with explaining what table fan out means. Fan out occurs when a table containing metrics joins to a dimension table in a way that results in multiple matching rows, leading to inflated results during aggregation.

This example uses two tables -

customers

and

orders

Each row in the

customers

table represents a unique customer:

customer_id

name

loyalty_points

Bloberta Smith

Blobzilla Lee

Blobina Chen

And each row in the

orders

table represents a unique order placed by a customer:

order_id

customer_id

order_date

amount

2025-03-25

$50

2025-03-26

$30

2025-03-27

$80

2025-03-28

$20

2025-03-29

$40

Because

one

customer can have

many

orders, this

relationship

one-to-many

The fan out of data occurs when the tables are joined together. The following table demonstrates what a joined table might look like - note that the customer's

loyalty_points

are repeated for each order:

customer_id

name

loyalty_points

order_id

amount

Bloberta Smith

$50

Bloberta Smith

$30

Blobzilla Lee

$80

Blobina Chen

$20

Blobina Chen

$20

Blobina Chen

$40

Handling fan out from joins

If you were to sum the total

loyalty_points

for each customer from the join table, you'd end up overstating Bloberta's and Blobina's points by

the number of orders. To prevent incorrect results like these, it's important to declare a

primary_key

for tables and, when defining joins, a

relationship_type

Before Omni calculates an aggregation on a fanned out table, Omni will check the table's primary key - the unique key per row - to ensure values aren't double-counted in the aggregation. If Omni detects potential for fan out, it will prompt you to define primary keys within your views.

To handle the example from the previous section, you could define the following in the model:

customers table

customer_id

primary_key

true

orders table

order_id

primary_key

true

Relationship between customers and orders

join_from_view

customers

join_to_view

orders

join_type

always_left

relationship_type

one_to_many

on_sql

customers.customer_id

= $

orders.customer_id

Handling fan out in materialized tables

Let’s say you pushed the logic to join customers and orders down into your transformations layer. As this is now a single materialized table, Omni no longer has the context of the relationship between the underlying models.

In this scenario, you can leverage the

aggregate_type

and the

custom_primary_key_sql

parameters to tell Omni how to properly aggregate on nested fields:

Symmetric aggregates on a materialized table

dimensions

order_id

primary_key

true

# Defines the table's primary key

customer_id

loyalty_points

amount

measures

loyalty_points_sum

sql

loyalty_points

aggregate_type

sum_distinct_on

custom_primary_key_sql

customer_id

# Dedupe on customer_id

amount_sum

sql

amount

aggregate_type

sum

Handling fan out from unnested columns

While similar to the

join scenario

, this example performs an

unnest join

on an array instead of joining two tables together. For example, this could occur when you have an

orders

table and an array of objects that represent the individual order items.

You can leverage the

custom_primary_key_sql_for_quick_aggs

parameter to handle this scenario:

Symmetric aggregates on an unnested column

dimensions

order_id

# Defines the table's primary key

primary_key

true

order_items

# Repeated field

order_item_price

parent_field

order_items

nested_on_field

order_items

custom_primary_key_sql_for_quick_aggs

order_item_id

sql

price

measures

total_price

sql

order_item_price

aggregate_type

sum_distinct_on

custom_primary_key_sql

order_item_id

Quick aggregates for which a primary key is applicable - such as

SUM

but not

MIN

MAX

- based on the

order_item_price

dimension will be assigned a custom primary key of

order_item_id

. In this example, that will apply to the

total_price

measure.

Key concepts

Inspecting query SQL

SQL wrapped in Omni helper functions

Dialect SQL executed against the database

Examples

Implementing symmetric aggregates to handle fan out

Understanding table fan out

Handling fan out from joins

Handling fan out in materialized tables

Handling fan out from unnested columns

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/sql-generation](https://docs.omni.co/docs/querying-and-sql/sql-generation) on 2025-07-23.*
