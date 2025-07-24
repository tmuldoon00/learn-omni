# Filters

**Source URL:** [https://docs.omni.co/docs/modeling/filters](https://docs.omni.co/docs/modeling/filters)  
**Extracted:** 2025-07-23 21:44:26  
**Source:** Omni Analytics Documentation

---

On this page

Looking to make your filters dynamic or driven by user input?

See

Templated Filters

to see how to parameterize your SQL with custom inputs.

Topics and measures and can be filtered to curate both the UI and calculations, respectively.  The filter syntax was built to mirror filtering in the UI, and embed the filters into modeled objects for simpler curation.  They are structured with

filter:

(measures) or

default_filters:

(topics), followed by the field to filter, the filter type, and the values.

measures

count_minors

aggregate_type

count

filters

age

less_than

count_18_or_19

aggregate_type

count

filters

users.age

count_california_seniors

aggregate_type

count

filters

age

greater_than_or_equal_to

state

California

queries_last_28_days

aggregate_type

count

filters

created_at

time_for_duration

28 complete days ago

28 days

queries_2023

label

Queries in 2023

aggregate_type

count

filters

created_at

time_for_duration

'2023-01-01'

'365 days'

queries_after_today

label

Queries After Today

aggregate_type

count

filters

created_at

on_or_after

'today'

Topic arguments

default_filters:

After

default_filters

, one or more field references can be listed with a colon.

Fields should be fully scoped if they exist outside the current view.

Topic-level filter

west_coast_transactions

base_view

order_items

default_filters

users.state

California

Oregon

Washington

users.country

not

null

Measure arguments

filters:

filters:

will begin the filter block for a given measure. After

filters

, one or more field references can be listed with a colon.

Fields should be fully scoped if they exist outside the current view.

measures

count_minors

aggregate_type

count

filters

age

less_than

count_california_seniors

aggregate_type

count

filters

age

greater_than_or_equal_to

state

California

Syntax

Filtering is built to mirror the application's filter UI

Values for the filter are to be included after the colon unquoted

Calfornia

If using an array, values are included inside brackets

[1,2,3]

[California, Oregon, Washington]

Any filter argument can exist in negated form with

not_

day_of_week:

-->

not_day_of_week:

starts_with:

-->

not_starts_with:

Supported filters

The following filters apply to all filter types:

is:

not:

note the negated of is: should be

not:

instead of not_is

Supported time filters

day_of_week:

month_of_year:

quarter_of_year:

day_of_month:

day_of_year:

day_of_quarter:

hour_of_day:

between_dates:

on_or_after:

before:

time_for_duration:

(examples below)

date_offset_from_query:

(advanced, only supported in filtered measures, see below)

time_for_duration

filters

users.created_at

time_for_duration

starting_time

unit_of_time_length

filters

users.created_at

time_for_duration

7 days ago

7 days

Time for unit duration can be useful for filtering over all sorts of time periods.  To use this filter, Omni expects a starting point, using either relative time (

28 days ago

7 complete weeks ago

) or a fixed date (

2024-06-01

) and a length of time after that point (

30 days

1 year

date_offset_from_query

measures

count_signups_same_time_two_years_previously

aggregate_type

count

filters

created_at

cancel_query_filter

true

date_offset_from_query

2 years

date_offset_from_query

, rather than specifying a filter on its own, specifies a filter dynamically relative to the date filter in the query the user creates in the UI.

E.g. in the above example, if it's November 2024, and the user filters for "last month" in the UI and selects "count_signups_same_time_two_years_previously", they will

see the count from October 2022.

Note the usage with

cancel_query_filter

. In general,

date_offset_from_query

must be used in concert with

cancel_query_filter

to make sense. Without

cancel_query_filter

in our example above, the measure would be filtering for October 2024

and

October 2022, which presumably would return zero, a nonsense result.

These types of measures can be especially tricky. Omni will create these measures automatically for you if you use the Period Over Period functionality in the workbook, "Flatten Pivot", and add

the fields produced by "Flatten Pivot" to the workbook.

cancel_query_filter

measures

compare_to_users_in_california

aggregate_type

count

filters

state

cancel_query_filter

true

California

users_in_all_states_all_time

aggregate_type

count

filters

created_at

cancel_query_filter

true

# (no filter)

state

cancel_query_filter

true

# (no filter)

In addition to being used in tandem with

date_offset_from_query

(see above)

cancel_query_filter

can be added as an argument to any other filter on a measure. This creates a measure that ignores the value of the filter in the user query in favor of the filter on the measure (rather than implicitly applying an AND).

E.g. if, as a user, I am querying data filtered by

New York

, I can use the

compare_to_users_in_california

measure above to directly see the count in California, without changing the filter in my query. Without the

cancel_query_filter

, this measure would filter for users in California, within a query already filtered to New York, yielding zero.

Or, I can use the

users_in_all_states_all_time

to compare the all-time count, completely ignoring the filters on both

created_at

and

state

Supported numeric filters

greater_than_or_equal_to:

less_than_or_equal_to:

less_than:

greater_than:

between:

Supported string filters

starts_with:

ends_with:

contains:

case_insensitive:

- Defaults to

false

Examples

Time Filter Model Examples

Using filters in the model can be tricky, so it's often faster to use the UI to build the filter and save a query view to see the syntax in YAML.  Below are some examples of common time filters.

In the past 7 days:

filters

users.created_at

time_for_duration

7 days ago

7 days

In the past 7 complete days:

filters

users.created_at

time_for_duration

7 complete days ago

7 days

From 2023-04-01 to 2023-04-30 - note end dates are

exclusive

, so this will

not

include data from

2023-04-30

filters

users.created_at

between_dates

2023-04-01

2023-04-30

Before 2023-04-01:

filters

users.created_at

before

2023-04-01

On or after 2023-04-01:

filters

users.created_at

on_or_after

2023-04-01

On the day 2023-04-01

filters

users.created_at

2023-04-01

Is in the quarter Q2 2023:

filters

users.created_at

2023 Q2

Is hour of day 1 (note the quotes):

filters

users.created_at

hour_of_day

"1"

Is on Wednesdays:

filters

users.created_at

day_of_week

Wednesday

First 3 months of 2023:

filters

users.created_at

time_for_duration

2023-01-01

3 month

Compound filters (AND / OR / filter from query)

Complex use cases may require compound filter declarations (before yesterday and in the past week).  This can be done using the following syntax:

filters

users.created_at

and

time_for_duration

1 week ago

1 week

before

1 days ago

filters

users.state

starts_with

ends_with

filters

users.state

California

## this is "is empty" in the UI

null

## this is "is null" in the UI

### This is how to declare a filter object from another query

filters

users.state

field_name_in_query

users.state

query_structure

fields

users.state

users.count

base_view

users

limit

sorts

field

users.count

desc

true

topic

users

Handling true / false & nulls (Falsey)

At times, it makes sense to treat boolean as strictly true / false, and at times the distinction to use true / false / null is important.  For that reason, Omni uses a special boolean argument in filters called 'falsey' that represents false or null.  Filtering with falsey works just like any other field value.

This will count error is false and error is null:

non_error_count

aggregate_type

count

filters

is_error

falsey

This will only count error is false:

non_error_count

aggregate_type

count

filters

is_error

false

OR between columns

The native syntax does not natively support OR between columns ie

col1 > 0 or col2 > 0

.  To create a filtered measure with co-dependent logic, you want to create an intermediate field to capture the logic.  In this case something like:

col3

sql

col1

0 or  $

col2

#and then filter using said dimension:

my_measure

sql

aggregate_type

count_distinct

filters

col3

true

Topic arguments

default_filters:

Measure arguments

filters:

Syntax

Supported filters

Supported time filters

time_for_duration

date_offset_from_query

cancel_query_filter

Supported numeric filters

Supported string filters

Examples

Time Filter Model Examples

Compound filters (AND / OR / filter from query)

Handling true / false & nulls (Falsey)

OR between columns

---

*This content was automatically extracted from [https://docs.omni.co/docs/modeling/filters](https://docs.omni.co/docs/modeling/filters) on 2025-07-23.*
