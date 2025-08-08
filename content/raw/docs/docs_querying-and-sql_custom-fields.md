# Custom fields

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/custom-fields](https://docs.omni.co/docs/querying-and-sql/custom-fields)  
**Extracted:** 2025-07-23 21:44:35  
**Source:** Omni Analytics Documentation

---

On this page

Most fields in the field picker come directly from your database schema. However, by using Custom Fields you can also create new ad-hoc dimensions and measures to define custom logic and calculations that can be reused.

Custom fields can use both SQL and modeled objects. Only users with "SQL Querier" access and up will be able to make SQL references in calculations (though any user that can touch the workbook page can create new fields from modeled objects). See more on permissions

here

Examples

Custom Dimension

CASE

WHEN ${users.state} = 'California' THEN 'West'

WHEN ${users.state} = 'New York' THEN 'East'

ELSE 'Other'

END

concat(${users.first_name}, ' ', ${users.last_name})

Custom Measure

count(distinct ${users.full_name})

Note how this custom measure also references the previously created full_name custom field. That logic is 'chained' together when expressed in the generated SQL.

Creating a Custom Field

There are a few ways to create a new Custom Field. Once saved, the Custom Field will become available in the field picker.

Fields can be created from field picker, using the "+ Add Field" menu at the bottom of the field list. Field can also be adjusted by right-clicking on any existing field and selecting 'Edit.'

Right click on any existing dimension and choose an aggregation (e.g. count distinct, sum, average, min, max). This will automatically create a new custom measure that appears in the field picker.

Fields can be added from parsed SQL. When queries are run in SQL, Omni will extract valid snippets into associated potential dimensions. They'll be show in a special section at the top of the field picker. To add these fields to the workbook, select "Add to Workbook" from the Query Fields section:

Custom Field Syntax

You can think of a Custom Field as a snippet of SQL logic that gets injected into the generated SQL query whenever the field is brought into the analysis plane.

To create one, simply write a snippet of SQL inside the editor.

Optionally, you can leverage the substitution operator,

${view.field}

, to reference other fields. The substitution operator makes code more reusable and modular, enabling you to reference other objects. It's particularly beneficial when you want to chain together logic. For example, if you previously created a different custom field, you can reference it without having to repeat the calculation again. And, if in the future you change the definition for that field, the change will propagate to everything else that relies on it.

When you add the custom field to a query, you can see the logic applied in the SQL block.

Create Filtered Measure From Results

To apply a filter to one but not all measures in a given query, you can create a filtered measure directly from the workbook. There are three different ways to to do this:

Add a filter to a new measure

You can create a new measure by picking a quick aggregation from an existing dimension (e.g. sum, average), or by duplicating an existing measure. When you go to edit the new measure, you will have the option to add filters. The gif below shows duplicating a measure and adding a filter:

Create from a pivot

Filtered measures can be created directly from pivots. Right clicking on the measure underneath a given pivot value and select

Create filtered measure

. This is a fast way to prototype and build filtered measures from existing fields, as the following gif shows:

Flatten a pivot

If you have a pivoted results table and want to create multiple filtered measures, you can flatten the pivot via the pivot header menu. If you need to turn many of your pivot columns into filtered measure, this is a great way to do it in a single swoop.

Note that when you flatten the pivot you have some options:

Add an "other" bucket

: Checking this box allows you to create a filtered measure for any values of the pivoted dimension

not

flattened. This could include values that have been filtered out of the current query or values that may appear for that dimension yet.

Only create measures for the first N pivot columns

: If you've checked to create an "other" bucket, you can also choose to specify how many of the columns are flattened into filtered measures. The other columns will be grouped into the "other" bucket.

Initially you will see the flattened pivot measures in a section called "Query View" in the field picker available only in the tab you create them in. If you want to use them across the workbook, you can add them to the workbook from the field picker field menu under Model. If you want to remove all the flattened pivot measures from the field picker you can use the keyboard shortcut (Mac) command+option+shift+k or (PC) ctrl+option+shift+k

Binning, Grouping, Bucketing

Omni offers some accelerators for common custom calculations. To bin or group strings or values, select "Group" from the field picker menu. String values can be grouped into grouplets, including a left over bucket for remaining values:

Numbers can be binned using a comma delimited list of values. Omni will auto-generate bins based upon the max value and a proportional split, but the boundaries can also be applied by hand:

As with other custom fields, explicit names or views can be applied alongside descriptions.

Binning and Regrouping Aggregates

A common workflow is looking at a distribution and then trying to understand patterns in the aggregation - percent of users by lifetime orders; distribution of brands by count of SKUs, distribution of sessions or activities by user.

For these analyses we can use saved views and binning to share distribution of aggregates. We got through the following multi-stage analysis to do this with UI, and we'll share an alternative in SQL.

Build baseline query where we want to analyze distribution. Here we'll look at lifetime orders per user:

Save a

query view

. Note Omni will strip the limit from the query view in order to retain the full data set.

Navigate to All Views & Fields to find our new table

Bin our aggregate (per section above)

Query and visualize:

As alternative path involves simply wrapping our first query in SQL, and inserting our own case statements. This is quicker, but will be more rigid if we need to adjust the underlying query. It is also a very simple approach to single-level re-aggregation (ie. wrap a sub-query in parentheses and count the number of rows).

Examples

Creating a Custom Field

Custom Field Syntax

Create Filtered Measure From Results

Add a filter to a new measure

Create from a pivot

Flatten a pivot

Binning, Grouping, Bucketing

Binning and Regrouping Aggregates

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/custom-fields](https://docs.omni.co/docs/querying-and-sql/custom-fields) on 2025-07-23.*
