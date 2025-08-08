# Topic file parameters

**Source URL:** [https://docs.omni.co/docs/modeling/topics/parameters](https://docs.omni.co/docs/modeling/topics/parameters)  
**Extracted:** 2025-07-23 21:44:32  
**Source:** Omni Analytics Documentation

---

On this page

Topic files are used to define configuration for individual

topics

The following example is a high-level look at the possible parameters in a topic file. Refer to individual sections for more information about each parameter's uses and accepted values.

# Defines the base view for the topic

base_view

<view_name

# Defines the workbook display name of the base view when it's accessed from the topic

base_view_label

<Some Display Name

# Limits access to rows based on user attributes

access_filters

field

<view_name

.<field_name

user_attribute

<user_attribute

values_for_unfiltered

<value_1

<value_2

...

# Information that provides context to the AI Query Helper

ai_context

<some information

# Inserts a non-removable filter

always_where_filters

<view_name>.<field_name>

<filter_conditions

# Inserts a non-removable filter into the WHERE clause of the generated SQL block of all queries in the topic

always_where_sql

<view_name

.<field_name

<condition

# Forces all queries using the topic to require a run click to return new results

auto_run

true

# Defines the cache policy for the topic

cache_policy

<cache_policy

# Defines a removable filter that's applied to all rows in a topic

default_filters

<view_name>.<field_name>

<filter_conditions

# Description of the topic, which will display in the workbook

description

<brief summary

# Determines the order in which the topic displays

display_order

<integer

# Curates the fields available in the topic

fields

all_views.*

# Defines the group the topic belongs to; useful for organizing multiple topics in a model

group_label

<group name

# Removes the topic from the workbook

hidden

false

# Declares other views as part of the topic

joins

<view_name>

# Defines a display name for the topic, which will be visible in the workbook

label

<topic display name

# Defines a list of topic-level joins

relationships

join_from_view

<view_one

join_to_view

<view_two

join_to_view_as

<name_of_view

join_type

always_left

on_sql

<name_of_view

.id

= $

<view_one

.some_id

relationship_type

many_to_one

# Defines a list of access grants to apply to the topic

required_access_grants

<access_grant_name

# Adds example queries to the topic, useful for AI

sample_queries

query_name

query

fields

<view_name

base_view

<view_name

calculations

<name>

limit

<limit

sorts

field

<view_name

.<field_name

topic

<topic

description

<description

# If false, query will display as an example when topic is selected

hidden

false

prompt

<ai prompt

ai_context

<context

# If true, query is excluded from AI context for the topic

exclude_from_ai_context

false

# Allows customization of views only in the context of the topic

views

<view_name>

<customization

access_filters:

Limits access to rows based on

user attributes

. When enabled, users will be limited to rows in the topic that match their user attribute value. Refer to the

Controlling data access guide

for more information.

To allow specific users to access all data for a field, add the

values_for_unfiltered

parameter. Users with this user attribute value will not have the access filter applied, allowing them to access all data for the specified field.

Note

: Omni expects every user to have a non-null value for any assigned access filter. Errors will arise if the user attribute value is null.

access_filters

field

products.brand

# Required. Defines the field to use as a filter.

user_attribute

brand_id

# Required. The user attribute to filter on.

values_for_unfiltered

is_admin

# Optional. User attribute value to allow unrestricted access.

enable_sql_like_wildcards

true

# Optional. Determines if exact match or `%` wildcard syntax should be applied

ai_context:

Free text that can provide context to the

AI query helper

. Refer to the

Optimizing models for AI

guide for more information on best practices.

For example, context could include behavioral prompting:

ai_context

you are the head of finance. you are concerned with the status of customer payments. you often need to project into the future how many invoices are due and for how much. you also need to know if any invoices are late so you can reach out to those customers.

Want to provide sample queries?

Check out the

sample_queries

parameter!

ai_fields:

Curates the fields in the topic that are provided to the AI query helper. If defined, only the specified fields will be used. Refer to the

Optimizing models for AI

guide for more information on best practices.

This parameter accepts the

same operators as the

fields

parameter

, such as

and

tag:

ai_fields

all_views.*

tag

dont_use_for_AI

distribution_centers.*

always_where_filters:

Applies a filter to all rows in a query using

filter syntax

. This parameter is functionally identical to

always_where_sql

, but uses filter syntax instead of SQL.

When defined, a filter will be inserted into the

WHERE

clause of the generated SQL block of all queries in the topic. Users with the

Querier

role can't change this filter and it will be visible only in the underlying SQL of any queries. This filter is additive to any filters specified in the workbook. For optional filter conditions, use

default_filters

This parameter is useful for removing invalid data from the topic, such as deleted records or internal testing.

always_where_filters

users.state

California

always_where_sql:

Applies a filter to all rows in a query using SQL. This parameter is functionally identical to

always_where_filters

, but uses SQL instead of

filter syntax

When defined, a filter will be inserted into the

WHERE

clause of the generated SQL block of all queries in the topic. Users with the

Querier

role can't change this filter and it will be visible only in the underlying SQL of any queries. This filter is additive to any filters specified in the workbook. For optional filter conditions, use

default_filters

This parameter is useful for removing invalid data from the topic, such as deleted records or internal testing.

Conditions should be written using

${}

syntax to reference fields defined in Omni.

Did you know?

You can generate a syntactically correct condition using the workbook:

In a workbook, add the filter using the UI.

Click the

SQL

button near the top-right corner of the page.

Copy the content of the

WHERE

clause.

Then, you can paste it right into the

always_where_sql

parameter!

base_view

order_items

always_where_sql

order_items.sale_price

auto_run:

Forces all queries using the topic to require a run click to return new results.

Note

: This will override the model-level

auto_run

parameter.

auto_run

false

# Accepted values are true or false

base_view:

Defines the base view for the topic. Values should be unquoted. Quotes will be removed/ignored upon saving.

base_view

users

# Use <schema>__<view> to specify a schema

base_view

main__users

base_view_label:

Defines the display name of the table in the workbook when it is accessed from the topic. This can be helpful for conveying the table's meaning in a specific context.

For example, the

order_items

view can be referred to as

Sold Items

in a financial context, which could help a Finance team understand that the table contains sale records.

base_view

order_items

base_view_label

Sold Items

# Values should be unquoted. Quotes will be removed/ignored upon saving.

cache_policy:

Defines the cache policy for the topic. The value should be a cache policy defined in the topic's model (

cache_policies

cache_policy

daily_cache_policy

default_filters:

Applies a filter to all rows in a topic. Filters created using this parameter are visible in workbooks and can be removed by users. For required filter conditions, use

always_where_sql

Refer to the

Filters documentation

for filter examples and syntax details.

default_filters

users.state

California

description:

Free text that describes the table. For example, you could add copy that describes the type of analyses users can create using the topic.

Descriptions are visible in the workbook, specifically in the topic switcher of the

Fields & Topics

panel.

Values should be unquoted. Quotes will be removed/ignored upon saving.

# Single line description

description

All transactions related to orders from the online store.

# Multi-line description

# Use this approach to include colons ( : )

description

Transactions from: California, Washington, and Oregon

display_order:

Defines the order that topics display in the field picker. By default, topics are sorted alphabetically. Defining a

display_order

will override this default for the topic.

The value must be a whole number, such as

, and so on.

display_order

extends:

Allows for inheriting and overriding another topic inside of Omni. The extended topic will inherit the attributes of the base or template topic. Additional attributes - such as joins or filters - can be added to the extended topic and will be scoped only to the extended topic.

extends

topic_name

If attributes included in the extended topic that are also defined in the base topic, the values in the extended topic will override the values in the base topic. For example:

base_topic

default_filters

state

California

extended_topic

extends

base_topic

# Default filters for extended_topic will be `New York` instead of base_topic's `California`

default_filters

state

New York

🎥 Check out a video walkthrough!

fields:

Curates the fields available in the topic. By default, all fields from the base view and joined views are included in the topic.

This parameter supports the following operators:

Operator

Description

Order of operations

all_views.*

Targets all fields from all views in the topic

view.*

Targets all fields in a view

tag:<value>

Targets fields and views with the specified tag

view.field

Targets a specific field

Omni will evaluate the operators according to the

Order of operations

value in the above table. This means all views is evaluated first, then specific views, and so on. This allows you to exclude views and then add specific fields back in.

To exclude a view, tag, or field, prefix the clause with a

. For example:

-users.*

# Include only the users view

fields

users.*

# Exclude the users view

fields

all_views.*

users.*

# Exclude only the users.id field

fields

all_views.*

users.id

# Exclude fields with the `pii` tag

fields

all_views.*

tag

pii

# Add the user_facts.lifetime_value back in after excluding the user_facts view

fields

all_views.*

user_facts.*

user_facts.lifetime_value

# Remove the users.acquisition_cost field from the fields targeted by the marketing tag

fields

all_views.*

tag

marketing

users.acquisition_cost

group_label:

Defines the group the topic belongs to. This is useful for improving the organization and navigation of topics in workbooks or the IDE. For example, you could create group topics together by dataset (

Salesforce

), team (

Marketing

), or analytical area (

Product usage

Note

: Topics without a

group_label

will display as 'ungrouped' below topic groups in the topic switcher.

group_label

Marketing

# Values should be unquoted. Quotes will be removed/ignored upon saving.

hidden:

Removes the topic from the workbook. The topic can still be referenced in the model.

hidden

true

# Value must be true or false

joins:

note

Topics created from

data input tables or uploaded CSV/XLSX files

can't be joined to other data.

Declares other views as part of the topic. To include multiple tables, nest the table under the table it joins through.

Note

: The final table in each node - specifically, those without children - requires an empty bracket pair

joins

inventory_items

# Includes inventory_items in the topic

products

# Joins products to inventory_items

distribution_centers

# Joins distribution_centers to products

users

# Includes users in the topic

label:

Defines a display name for the topic. This will override the topic's name as it displays in the workbook.

Values should be unquoted. Quotes will be removed/ignored upon saving.

label

California

relationships:

note

Views representing a

data input table or uploaded CSV/XLSX files

can't be used in a join unless the table has been uploaded to a database.

Defines a list of topic-level joins. Joins defined using this parameter will only be available to the topic where they are declared. This can be useful for one-off use cases, rare aliasing, or utilizing different join organization schemes. Refer to the

Relationships & Joins documentation

for more information about top-level and global relationships.

The syntax for this parameter is identical to that of the

relationships file

topics

order_items

joins

buyers

sellers

relationships

# Join order_items to users as buyers using order_items.buyer_id

join_from_view

order_items

join_to_view

users

join_to_view_as

buyers

join_type

always_left

on_sql

buyers.id

= $

order_items.buyer_id

relationship_type

many_to_one

# Uses user attributes ({{ omni_attributes.<user_attribute> }}) to create an access filtered join

# This can be useful when you want to keep all rows in the data set but permiss the metadata

# This example will only return data for the specific seller_org_id associated with each user

join_from_view

order_items

join_to_view

users

join_to_view_as

sellers

join_type

always_left

on_sql

sellers.id

= $

order_items.seller_id

AND $

sellers.organization_id

omni_attributes.seller_org_id

relationship_type

many_to_one

# Another single-use example

# Note this from is not aliased in the context of the join,

# but connection is implied by nesting in topic above

relationships

join_from_view

users

join_to_view

user_attributes

join_to_view_as

seller_attributes

join_type

always_left

on_sql

users.id

= $

seller_attributes.user_id

relationship_type

one_to_one

required_access_grants:

Defines a list of access grants for the topic, which are used to control access. The values of this parameter must match the name of an access grant in the

model file

. Refer to the

Controllilng data access guide

for more information and examples.

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

sample_queries

Defines a list of sample queries that could be performed on the topic, which is used:

To present example queries

when a topic is selected in the workbook or using the

embedded version of the query helper

To hide the query, set the

hidden

parameter to

true

By the

AI query helper

to improve results.

To exclude the query from the topic's AI context, set the

exclude_from_ai_context

true

You can add a workbook query to this parameter by clicking

Model > Save as sample query to topic

in the workbook.

sample_queries

Summary Stats

# query name

query

fields

order_items.sale_price_sum

users.count

calc_1

base_view

order_items

calculations

calc_1

sql

OMNI_FX_SAFE_DIVIDE($

order_items.sale_price_sum

users.count

limit

sorts

field

order_items.sale_price_sum

topic

order_items

description

Total Revenue

Users and Revenue per User

hidden

false

prompt

show me total revenue

count of users and revenue per user

ai_context

uses a calculation to compute avg. revenue per user

exclude_from_ai_context

false

What's this preview query?

On each topic, Omni adds an example query as a getting started point:

You can safely remove or edit this query as needed.

views:

Allows customization of views only in the context of the topic. For example, you can use this parameter to:

Create aliases for joins between tables in the topic. When aliasing a join for a specific topic, often topic-specific relationships are the best way to model, field names may also be adjusted or renamed or relabeled (see above).

Define topic-specific drilling

Define topic-specific aggregate awareness

# Defines the order in which views in the topic display

views

order_items

display_order

users

display_order

products

display_order

Extended example

The following example customizes the

opp_line_item_daily_facts

view to analyze metrics at different points in a contract's lifecycle (start, now, end).

Custom, context-specific names are applied to the

drr_sum

and

arr_sum

measures to analyze the metric at each point in the life cycle. For example,

Starting ARR

and

Current ARR

Then, topic-specific

joins

are used to apply different dates - such as a contract start or end date -  and create views specific to each point of the contract lifecycle.

views

# First extension; focuses on contract start

opp_line_item_start_facts

extends

opp_line_item_daily_facts

dimensions

drr_sum

label

Starting DRR

# Topic-specific name for the drr_sum base metric

arr_sum

label

Starting ARR

# Topic-specific name for the arr_sum base metric

measures

# Creates a Starting ARR Sum measure

arr_sum_sum

sql

opp_line_item_start_facts.arr_sum

label

Starting ARR Sum

aggregate_type

sum

# Second extension; focuses on current contract state

opp_line_item_current_facts

extends

opp_line_item_daily_facts

dimensions

drr_sum

label

Current DRR

arr_sum

label

Current ARR

measures

arr_sum_sum

sql

opp_line_item_current_facts.arr_sum

label

Current ARR Sum

aggregate_type

sum

# Third extension; focuses on contract end

opp_line_item_end_facts

extends

opp_line_item_daily_facts

dimensions

drr_sum

label

Ending DRR

arr_sum

label

Ending ARR

measures

arr_sum_sum

sql

opp_line_item_end_facts.arr_sum

label

Ending ARR Sum

format

USDCURRENCY_0

aggregate_type

sum

### Topic-specific joins of the same fact table but with different dates

### to understand ARR at different points of the contract lifecycle (start, now, end)

relationships

join_from_view

opp_line_item_facts

join_to_view

opp_line_item_start_facts

join_type

always_left

on_sql

salesforce__opportunity.id

= $

opp_line_item_start_facts.opp_id

AND

opp_line_item_start_facts.date

opp_line_item_facts.oli_first_date

relationship_type

one_to_one

join_from_view

opp_line_item_facts

join_to_view

opp_line_item_end_facts

join_type

always_left

on_sql

salesforce__opportunity.id

= $

opp_line_item_end_facts.opp_id

AND

DATEADD(day

opp_line_item_end_facts.date

) =

opp_line_item_facts.oli_last_date

relationship_type

one_to_one

join_from_view

opp_line_item_facts

join_to_view

opp_line_item_current_facts

join_type

always_left

on_sql

salesforce__opportunity.id

= $

opp_line_item_current_facts.opp_id

AND $

opp_line_item_current_facts.date

date

= CURRENT_DATE()

relationship_type

one_to_one

access_filters:

ai_context:

ai_fields:

always_where_filters:

always_where_sql:

auto_run:

base_view:

base_view_label:

cache_policy:

default_filters:

description:

display_order:

extends:

fields:

group_label:

hidden:

joins:

label:

relationships:

required_access_grants:

sample_queries

views:

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/topics/parameters](https://docs.omni.co/docs/modeling/topics/parameters) on 2025-07-23.*
