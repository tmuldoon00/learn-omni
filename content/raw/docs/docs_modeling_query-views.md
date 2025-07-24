# Query view file parameters

**Source URL:** [https://docs.omni.co/docs/modeling/query-views](https://docs.omni.co/docs/modeling/query-views)  
**Extracted:** 2025-07-23 21:44:30  
**Source:** Omni Analytics Documentation

---

On this page

Query views are workbook queries that have been saved to the model as a view. This model file type has a file name structure of

<query_name>.query.view

. The

<query_name>

is dynamic based on what the query tab is named in the workbook. Query views created from a workbook will exist in the workbook model initally, if you want these to be used in other workbooks promote the query view to the shared model.

Parameters in query views are automatically generated when you save the view as a query from the model menu in a workbook.

The following example is a high-level look at the possible parameters in a query view file. Refer to individual sections for more information about each parameter's uses and accepted values.

# Reference this view as all_the_params

schema

PUBLIC

query

# The values in this map (e.g. created_at_year) are the aliases these get in the SQL.

fields

users.age

age

users.created_at

year

created_at_year

calc_1

calc_1

base_view

users

calculations

calc_1

sql

users.age

OMNI_FX_PLUS 2

default_group_by

false

filters

users.age_bin

users.created_at

"2021"

fill_fields

"users.created_at[year]"

sorts

field

users.created_at

year

join_via_map

orders

order_items

orders

topic

order_items

dimensions

age

created_at_year

calc_1

measures

count

aggregate_type

count

Query views can also point to a SQL query. These use the

sql

parameter to define the query, eg.

# Reference this view as sql_query_view

schema

PUBLIC

sql

select user_id

sum(sale_price) as total_sales from order_items group by 1

dimensions

user_id

total_sales

measures

count

aggregate_type

count

Parameters

dimensions:

Lists all of the fields selected in the query and makes them  dimensions to allow for aggregation in another query.

Syntax:

dimensions

<dimension_name>

<dimension_name>

<calc_name>

<measure_name>

Example:

dimensions

age

created_at_year

calc_1

measures:

A default parameter that creates a

COUNT(*)

in the query, counting all rows. This parameter is applied to the generated query view regardless of whether a measure is in the query table. No other aggregations are listed here because they have been dimensionalized and are listed as fields under the

dimensions:

parameter.

Syntax:

measures

count

aggregation_type

count

Example:

measures

count

aggregate_type

count

Query sub-parameters

base_view:

References which view is used in the

FROM

of the generated SQL. Alternatively, you can think of the base view as the view that all subsequent views will join to when building a query. There is only one base view per query. This is a sub parameter of

query:

Syntax:

base_view

<view_name

Example:

query

# The values in this map (e.g. created_at_year) are the aliases these get in the SQL.

fields

users.age

age

users.created_at

year

created_at_year

calc_1

calc_1

base_view

users

bind:

This is used when you want to pass filter values from other fields into the subquery defined in a query view.

Bind

will explicitly pass only the enumerated field to the query view.  If you want to pass any filters used in the UI into the query view, use

bind_all_filters

Syntax:

filters

view.field

bind

other_view.other_field

Examples:

# Here we bind any use of order_items.created_at to users.created_at

query

fields

users.id

order_items.sale_price_sum

sale_price_sum

base_view

order_items

filters

users.created_at

bind

order_items.created_at

sorts

field

order_items.sale_price_sum

desc

true

topic

order_items

### Here we use bind to push down a filter on a view we are re-aggregating over

### this will let us put filters on the re-aggregate (via filter field), but map

### to the underlying query rather than our query view

query

fields

order_items.user_id

user_id

order_items.count

dim_count

base_view

order_items

filters

users.created_at

bind

orders_by_user.created_at

sorts

field

order_items.count

desc

true

topic

order_items

dimensions

dim_count

user_id

primary_key

true

measures

count

aggregate_type

count

filters

created_at

type

timestamp

bind_all_filters:

When set to true, queries built on top of the query view will pass the chosen filters into the query view definition. In SQL, this allows the filters set in the outer query to be passed into the inner query.

Syntax:

bind_all_filters

<true_or_false

Example:

# This means when this fact table is joined,

# all filters from the main query will be brought into this fact table.

# Any non-joinable filters would be ignored.

query

fields

users.id

order_items.sale_price_sum

sale_price_sum

base_view

order_items

sorts

field

order_items.sale_price_sum

desc

true

topic

order_items

bind_all_filters

true

calculations:

Lists all of the calculations that are defined in the query. This parameter uses

OMNI SQL table calculation syntax

. This is a sub-parameter of

query:

Syntax

calculations

<name_of_calculation>

sql

<view_name

.<field_name

<OMNI SQL TABLE FUNCTION

Example:

query

fields

users.age

age

users.created_at

year

created_at_year

calc_1

age_plus_2

calculations

calc_1

sql

users.age

OMNI_FX_PLUS 2

default_group_by:

Enables or disables a

GROUP BY

. This parameter is automatically set to false if there are no measures in the query view.

Syntax:

default_group_by

<true_or_false

Example:

# This will group duplicate rows for users with the same name

query

fields

users.name

user_name

default_group_by

true

fields:

Lists out all of the fields in the query results tab of the workbook. This is a sub-parameter of

query:

Syntax:

fields

<view_name>.<field_name>

test

<view_name>.<field_name>

test2

calc_1

calc_name

calc_2

calc_name

Example:

query

fields

users.age

age

users.created_at

year

created_at_year

calc_1

age_plus_2

calculations

calc_1

sql

users.age

OMNI_FX_PLUS 2

fill_fields:

Lists the fields that are filled as an enumerated list. This is a sub-parameter of

query:

Syntax:

fill_fields

"<view_name>.<field_name>"

Note: for date fields the specific date timeframe is specified in brackets, like in the example below.

Example:

query

# This will make sure to show all the months in the 4-year period, and requires the time filter

fields

users.age

age

users.created_at

month

created_at_month

calc_1

calc_1

base_view

users

fill_fields

"users.created_at[year]"

filters

users.created_at

time_for_duration

4 years ago

4 years

filters:

The

filters:

parameter lists out all of the filters that are applied in the query. This is a sub-parameter of

query:

Syntax:

filters

<view_name>.<field_name>

<filter_condition>

<value

Example:

query

# Top ten users by spend

fields

users.id

order_items.sale_price_sum

sales

base_view

order_items

filters

users.age_bin

users.created_at

"2021"

order_items.created_at

time_for_duration

30 complete days ago

30 days

join_via_map:

This is generated if the query view contains a user-written SQL query and the joins are not default joins so Omni generates a map of how to make the joins possible.

Syntax:

join_via_map

<view_name>

<view_name>

<view_name_to_map_to

Example:

query

# Top ten users by spend

fields

users.id

order_items.sale_price_sum

sales

base_view

order_items

join_via_map

orders

order_items

orders

limit:

Defines the row limit of the query if a limit is set on the query in the workbook.

Syntax:

limit

<limit_value

Example:

query

# Top ten users by spend

fields

users.id

order_items.sale_price_sum

sales

base_view

order_items

field

order_items.sale_price_sum

desc

true

limit

query:

The overarching parameter that defines all of the sub-parameters of the query view.

Syntax:

query

Example:

query

# The values in this map (e.g. created_at_year) are the aliases these get in the SQL.

fields

users.age

age

users.created_at

year

created_at_year

base_view

users

sorts

field

users.created_at

year

schema:

References the query's underlying schema name from the chosen database connection.

Syntax:

<db_schema_name>

Example:

schema

ecommerce

query

# The values in this map (e.g. created_at_year) are the aliases these get in the SQL.

fields

users.age

age

users.created_at

year

created_at_year

base_view

users

sorts:

Lists the field(s) that the query is sorted by.

Note, you can sort a query by more than one column by holding down

control

CMD

plus the

shift

buttons on your keyboard while simultaneously clicking on the additional column header to add as a sort.

Syntax:

sorts

field

<view_name.field_name

Example:

query

fields

users.age

age

users.created_at

year

created_at_year

base_view

users

sorts

field

users.created_at

year

field

users.age

desc

true

topic:

Defines the topic the query is using. If the query is not based on a defined topic, then this parameter will not be included in the generated query view modeling.

Syntax:

topic

<topic_name

Example:

query

fields

users.age

age

users.created_at

year

created_at_year

topic

orders

Parameters

dimensions:

measures:

Query sub-parameters

base_view:

bind:

bind_all_filters:

calculations:

default_group_by:

fields:

fill_fields:

filters:

join_via_map:

limit:

query:

schema:

sorts:

topic:

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/query-views](https://docs.omni.co/docs/modeling/query-views) on 2025-07-23.*
