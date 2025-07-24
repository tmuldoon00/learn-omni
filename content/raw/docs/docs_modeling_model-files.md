# Model file parameters

**Source URL:** [https://docs.omni.co/docs/modeling/model-files](https://docs.omni.co/docs/modeling/model-files)  
**Extracted:** 2025-07-23 21:44:29  
**Source:** Omni Analytics Documentation

---

On this page

Model files are used to define configuration for the analytical environment (topics, views, and so on) associated with a specific

connection

The following example is a high-level look at the possible parameters in a model file. Refer to individual sections for more information about each parameter's uses and accepted values.

# Limits access to specific fields through user attributes

access_grants

<access_grant_name>

user_attribute

<user_attribute

allowed_values

"value_1"

"value_2"

access_boostable

true

# Curates the list of topics available in the AI Assistant / chat

# Note: Does not apply to the workbook query helper

ai_chat_topics

sales

orders

# Forces all queries using the connection to require a run click to return new results

auto_run

true

# Sets a fiscal calendar in Omni

fiscal_month_offset

# Defines number formatting in the model

default_numeric_locale

en_US

# Defines a list of default timeframes for date and time fields in the model

default_timeframes

date

week

month

# Defines the day that weeks start on

week_start_day

Sunday

# For Embed usage. Creates a copy of a schema as a virtual schema.

dynamic_schemas

<dynamic_schema_name>

from_schema

<canonical_schema_name

user_attribute

<user_attribute_name

# If true, all filter suggestions in the workbook will be faceted to current filter selections

facet_workbook_filters

true

# Excludes a list of schemas from use in workbooks

ignored_schemas

<ignored_schema_1

<ignored_schema_2

# Includes a list of schemas for use in workbooks

included_schemas

<included_schema_1

<included_schema_2

# Excludes a list of views from use in workbooks

ignored_views

<ignored_view_1

<schema

.<ignored_view_2

<schema

__<ignored_view_3

# Defines a list of views from the database schema to include in the model

included_views

<included_view_1

<included_view_2

<included_view_2

# Creates cache policies for the model

cache_policies

<cache_policy_name>

max_cache_age

"2 hours"

filter_suggestions_must_obey_policy

true

# Sets a default cache policy for the model

default_cache_policy

<cache_policy_name

access_grants:

Access grants for topics and fields

Access grants can be set for topics and fields (dimensions and measures) using the

required_access_grants

setting. Refer to the

Topics

Dimensions

, and

Measures documentation

for more information.

Limits user access to a particular field (dimension or measure) through

user attributes

. Each grant targets a user attribute. Users will be granted access if their corresponding user attribute has any of the values specified in the grant.

Access grants are only applied to direct access and queries, meaning they don't impact references within the model. For example, if a user can't see field

but can see field

, and

references

, the user can still access and query using field

access_grants

region_access

# String that uniquely identifies the grant

user_attribute

"Region"

# Required. The user attribute the grant targets.

allowed_values

"California"

"Hawaii"

# Required. List of values the user attribute must have to grant access.

access_boostable

true

# Optional. If true, users with AccessBoost for a given document will bypass the access grant check for that specific document. Defaults to false.

ai_chat_topics:

Controls the topics that are accessible in the topic picker of the AI Assistant and

embedded chat instances

Limit access to specified topics

- Add the topic names in a list (

[ sales, orders ]

Exclude the entire model

- Specify an empty list (

Include all topics in the model

- Leave this parameter unset

## Limit access to specified topics

ai_chat_topics

sales

orders

# Exclude entire model

ai_chat_topics

Note

: This parameter doesn't apply to the

query helper used in workbooks

ai_context:

Sets context for the AI assistant that is applicable for the entire model. This can be useful for standardizing outputs of the AI assistant. Refer to the

Optimizing models for AI

guide for more information on best practices.

ai_context

You are an analyst for an eCommerce retailer called BlobsRUs.

After generating a query, always provide a summary of the data both English and Brazilian Portugese.

auto_run:

Forces all queries using the connection to require a run click to return new results. This may be a good option if there are cost concerns on running queries as they are built, but it will reduce UI interactivity.

auto_run

false

cache_policies:

Defines cache policies for the model. Each policy must have a

max_cache_age

parameter that defines the time limit for the policy.

Omni defaults to the following cache policy and filter suggestion retention period:

Default cache policy

- 6 hours; overridden with

max_cache_age

Filter suggestion retention

- 30 days; overridden when

filter_suggestions_must_obey_policy

true

Note

: This setting sets defaults for the model, but caching policies can also be set at the dashboard level. Editing cache policies in a workbook model or query model effectively applies the policy to the associated dashboard.

Refer to the

Topics documentation

for information about setting topic-level cache policies.

cache_policies

seconds_cache_policy

# String identifier for the cache policy

max_cache_age

59 seconds

# Required. Defines the policy's time limit.

filter_suggestions_must_obey_policy

false

# Optional. Determines if filter suggestions obey the cache policy.

daily_cache_policy

max_cache_age

24 hours

max_cache_age:

Required for use with

cache_policies

. Defines the time limit for the cache policy.

cache_policies

daily_cache_policy

max_cache_age

24 hours

# Must be between 0 seconds and 24 hours

minutes_cache_policy

max_cache_age

5 minutes

Accepted values must be between

0 seconds

and

24 hours

. If a value exceeding

24 hours

is entered Omni will default to the model's specified

default_cache_policy

. If a default policy isn't set, Omni's default policy of 6 hours will be used.

filter_suggestions_must_obey_policy:

Determines whether filter suggestions obey the cache policy. If

false

, filter suggestions will be retained for 30 days. Defaults to

false

Note

: This setting can't currently be removed if set, but it can be changed if needed.

cache_policies

dont_cache_at_all

max_cache_age

0 seconds

filter_suggestions_must_obey_policy

false

# Retain filter suggestions for 30 days

cache_for_a_day

max_cache_age

24 hours

filter_suggestions_must_obey_policy

true

# Obey cache policy & retain for 24 hours

default_cache_policy:

Defines a default

cache policy

for the model. If set, the cache policy will be applied to all topics in the model and override Omni's default cache policy. Refer to the

Topics documentation

for information about setting topic-level cache policies.

cache_policies

daily_cache_policy

max_cache_age

24 hours

default_cache_policy

daily_cache_policy

default_numeric_locale:

Defines global number formatting in the model.

default_numeric_locale

fr_FR

Accepted values:

en_US

Default

. Comma-delimited thousands, period-delimited decimals, dollar default currency

fr_FR

- Space-delimited thousands, comma-delimited decimals, Euro default currency

nl_NL

- Dot-delimited thousands, comma-delimited decimals, Euro default currency

default_topic_access_filters:

Defines a default

access filter

for all topics contained in the model. Access filters limit row-level access to data based on user attributes.

default_topic_access_filters

field

products.brand

# field used to determine access

user_attribute

customer

# user attribute to match to value

If an access filter can't be mapped to a topic, an error will surface in the model IDE. Add a blank

access_filters

parameter to the topic to resolve the issue:

Topic file

access_filters

default_topic_required_access_grants:

Defines a default required

access grant

for all topics contained in a model, unless other grants are applied at the topic level. Access grants control data access for topics in a model based on user attriubtes.

Refer to the

Controlling data access guide

for an example of overriding a default topic access grant.

default_topic_required_access_grants

finance

# default access grant for all topics

access_grants

nw_region

user_attribute

region

allowed_values

washington

idaho

oregon

wyoming

alaska

finance

user_attribute

omni_user_groups

allowed_values

Finance

marketing

user_attribute

omni_user_groups

allowed_values

Marketing

dynamic_schemas:

Creates a copy of the specified schema as a virtual schema. The views in the dynamic schema are generated from the schema specified in

from_schema

. When generating SQL against dynamic schema views, the

user_attribute

assigned to the user running the query is used to scope table references.

If you're using

embedding

, you can use this setting to partition customer data into separate, but identical schemas.

All modeling will reference views in the dynamic schema with this naming convention:

dynamic_schema_name__view_name

dynamic_schemas

<dynamic_schema_name>

# Name of the new dynamic schema

from_schema

<canonical_schema_name

# Required. The name of the schema to copy.

user_attribute

<user_attribute_name

# Required. User attribute to use to scope table references.

extends:

Enables extending a model. Check out this

community post

for more information.

facet_workbook_filters:

Facets all filter suggestions in the workbook to the current filter selections. This may result in filter suggestions taking more time to run complex queries with less caching. Additionally, results may not be returned when suggestions are expected.

Defaults to

false

meaning one filter won't facet another filter. For example, when selecting

state = California

country

would still suggest

and

facet_workbook_filters

true

fiscal_month_offset:

Sets a fiscal calendar in Omni and enables adding fiscal time metrics to time dimension groups and filters in the UI. A positive month offset will set the fiscal calendar in front of the

Gregorian calendar date

Note that

fiscal_quarter

and

fiscal_year

timeframes will not work without a

fiscal_month_offset

Examples:

Feb 1 start -

fiscal_month_offset: 11

(ie. FY Month 1 of 2025 = Feb 2024)

March 1 start -

fiscal_month_offset: 10

Feb 1 start but FY Month 1 of 2024 = Feb 2024 -

fiscal_month_offset: -1

fiscal_month_offset

ignored_views:

Excludes specific views from use in workbooks. Wildcard syntax (

) may be used to match multiple views within a schema.

Note

: Listed views will still be available for use in SQL queries.

This parameter can't be used if

included_views

is in use.

# Values can be provided as an indented list

ignored_views

users

main.products

# Schema and view separated by .

main__customers

# Schema and view separated by __

# Or as a comma-delimited list

ignored_views

users

products

ignored_schemas:

Excludes a list of schemas from workbooks.

Note

: Listed schemas will still be available for use in SQL queries.

This parameter can't be used if

included_schemas

is in use.

# Values can be provided as an indented list

ignored_schemas

dbt_test1

dbt_test2

# Or as a comma-delimited list

ignored_schemas

"dbt_test1"

"dbt_test2"

included_schemas:

Includes only the listed schemas for use in workbooks.

Note

: Schemas that aren't included will still be available for use in SQL queries.

This parameter can't be used if

ignored_schemas

is in use.

# Values can be provided as an indented list

included_schemas

public

core_data

# Or as a comma-delimited list

included_schemas

public

core_data

included_views:

Defines a list of views from the database schema to include in the model. Views that aren't included can't be referenced when modeling.

This parameter can't be used if

ignored_views

is in use.

included_views

products

users

orders

slot_reservation:

Supported only for Google BigQuery connections.

Specifies a

dedicated slot

for queries in the model to use. This setting is useful for ensuring that Omni-related workloads are isolated from other loads on your database.

slot_reservation

name

slot

reservation

The provided value must be an existing

reservation

template:

Used on abstract models

. Disables the content validator. This is useful because abstract models are logical constructs that aren't tied to data.  More

here

template

true

topics:

Deprecated

On December 10, 2024, we deprecated this field in favor of giving topics their own file. Model files that contain this field will continue to function as they always have, but going forward you'll encounter an error if you attempt to add

topics:

to a model file.

Refer to the

Topics documentation

for more information.

warehouse_override:

Workbook model-only parameter

This parameter can only be used in workbook models. It can't currently be promoted to the shared model. Adding this paramater to the workbook model does not cause any access warnings for viewer or restricted querier users even though it is a deviation from the shared model.

Supported only for Snowflake and Databricks connections.

Specifies a different warehouse to use for a given workbook or branch. This setting is useful for improving the performance of specific dashboards by providing more compute or isolating them from load on the default database.

warehouse_override

warehouse

name

## Name of alternate warehouse e.g. OMNI_WH

week_start_day:

Defines the day that all weeks start on. Defaults to

Monday

Note

OMNI_WEEK()

and

OMNI_DAY_OF_WEEK_NUMBER()

SQL operators are impacted by this setting.

week_start_day

Sunday

access_grants:

ai_chat_topics:

ai_context:

auto_run:

cache_policies:

max_cache_age:

filter_suggestions_must_obey_policy:

default_cache_policy:

default_numeric_locale:

default_topic_access_filters:

default_topic_required_access_grants:

dynamic_schemas:

extends:

facet_workbook_filters:

fiscal_month_offset:

ignored_views:

ignored_schemas:

included_schemas:

included_views:

slot_reservation:

template:

topics:

warehouse_override:

week_start_day:

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/model-files](https://docs.omni.co/docs/modeling/model-files) on 2025-07-23.*
