# Using Excel

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/table-calculations](https://docs.omni.co/docs/querying-and-sql/table-calculations)  
**Extracted:** 2025-07-23 21:44:38  
**Source:** Omni Analytics Documentation

---

On this page

Table calculations create ad-hoc metrics that are performed post query processing on the result set à la Excel or Sheets. They can build contextual metrics like percent of row or column, period over period changes, or other calculations to customize analyses or visualizations.

These Excel-style functions can be used to create formulas that manipulate data and calculate strings and numbers.

Table calculations in Omni

What are functions

Functions are predefined formulas designed to make calculations on values easier. For example:

NOW()           # Returns the current date and time, ex: 2025-05-09 18:23:30.521

TODAY()         # Returns the current date, ex: 2025-05-09

What are aguments

Some functions can accept

arguments

, which is the input or information provided to the function. In the following example, the arguments are

1, 2, 3

SUM(1,2,3)         # Returns 6

Arguments can be a handful of types (listed below), which can be thought of as the compositional building-blocks of calculations:

String literals

- Strings of text, which must be wrapped in double quotes. For example:

"Hello, Blobby!"

Number literals

- Numbers, such as

. Can be used alone or as arguments.

Logical literals

- Boolean values (

TRUE

FALSE

Note

: Must be all caps or the values will be interpreted as a cell reference.

Unary Operators / Negation

- Negates (

) or adds (

) a value. Can be thought of as operators with only a right operand. For example:

-daily_budget     # Returns the negative value of daily_budget, ex: -500

Note

: The

operator can also be used as a unary. However, Omni typically ignores them because

and

are logically equivalent.

Cell references

- Points to a specific cell in a dataset. The row can be omitted to reference only the column.

Omni handles cell references by typically being in reference to the first row of data. Calculations will be applied to all following rows with the number changed to offset how many rows down you are.

C1                    # Reference column C in row 1

C2 + 10               # Reference column C in row 2

users.count + 10      # Reference users.count column

Cell range references

- Compound cell reference that describes a span between one cell and another. Can be used to reference an entire column or a subset of the column's data.

Note

: Cell ranges are inclusive.

C1:C5                 # Include cells C1,C2,C3,C4,C5

C:C                   # Include all of column C

What functions does Omni support

Refer to the

Omni supported functions reference

for a list of the functions Omni currently supports.

Are Omni functions the same as Excel or Google Sheets

Omni aims to be compatible with Excel or Sheets wherever possible. The Google Sheets documentation included in the

Omni supported functions references

is useful for enhancing your understanding of Omni's functions.

Note

: For some functions, there are some differences between Omni's implementation and Google Sheets'. Refer to the reference for the Omni function for details.

What are the OMNI_PIVOT functions in the query's SQL

There are some other functions you may see in the SQL that are not meant for end user use, but help make the SQL blocks easier to parse in normal usage:

The

OMNI_PIVOT_ROW(dimensions)

and

OMNI_PIVOT(column_limit, pivots)

structure the pivot table experience.

OMNI_PIVOT_ROW

sets the query columns outside the pivot

OMNI_PIVOT

sets the query columns to pivot, along with a limit on columns

Creating table calculations

There are a few ways to create calculations in Omni:

Quick calculations

, which allow you to create calculations like a running total or % of previous with just a few clicks

Using AI

, which can help you get started quickly

Manually

, which allows you to iterate and build at your own pace

Every approach can use all of

Omni's supported functions

. Additionally, regardless of how the calculation is created, calculations can be

renamed, formatted

, and

promoted

Heads up!

Before you get started:

Make sure that the query includes the fields you want to use in the calculation

Keep in mind that all alphabetic characters must be wrapped in double quotes (

) unless referring to a specific cell or column. For example:

"Hello, Blobby!"

. Single quotes aren't valid for wrapping strings in Omni.

Quick calculations

Quick calculations, such as percent of total, can be used on

numeric

data in a workbook results table in the query builder or SQL editor. They can also be used across pivots. For example, a running total for a row.

To create a quick calculation:

Click the ⠇ (three dots) in the header of a numeric column in the results table, then

Calculations

Select an option from the

Calculations

menu. A new column will be created in the table:

The new column will be named using a convention of

<column_name> + <quick_calculation>

, but you can

rename it

if needed.

AI-generated

Short on time or not sure where to start? With Omni's AI, you can write complex, Excel-like formulas using natural language. Having AI create calculated fields for you reduces the time you'll have otherwise spent searching for the right syntax and iterating to get it just right.

For more information, refer to the

Creating AI formulas guide

Manually-created calculations

You can also manually create calculations in the results table of a query:

Click the

Add a column icon

to first add a new column to the table.

Note

: The new column will be named

Calculation

by default, but you can

rename it

In a cell or the function editor, enter

to start building the calculation.

Note

: The calculation must start with an

sign.

Build the calculation using Omni's

supported functions

. The following image shows an example of a

DATEDIF

calculation, which was used to calculate the number of days between the

Created At

and

Delivered At

columns:

Check out the

Examples

section to see some of what's possible, such as how to return nulls or reference column totals.

Renaming & formatting calculations

In the

Options

for the

Results

table, you can rename or change the formatting for calculations.

You can also rename a calculation by double-clicking the column header and entering a new name:

Promoting table calculations

To reuse a calculation in a workbook, you can promote it to the workbook model. Click the ⠇ (three dots) in the calculation column's header, then

Promote to workbook

Once promoted to the workbook model, you can then promote the calculation to the

shared model

Note

: Some limitations do exist, depending on the type of calculation, such as calculations based on other calculations or those that include a range. This is because some calculations depend on the shape of a specific results set. For example, a 7 day moving average that works when data is grouped by day, but not if the grouping is by month.

Examples

Return null values

To return a

null

value, use

1/0

as the calculation. Nulls will display as blanks.

Total references

Using row and column totals can be effective for more complex calculations across rows or columns independently. These aggregates can be referenced in calculations when they are activated for queries, which you can do in the

Options

menu for the

Results

table.

This example references:

Column total

${users.count:column_total}

Row total

${users.count:row_total}

Grand total (columns and rows, lower right

) -

${users.count:grand_total}

These can also be chained with other functions. For example:

# Percent of row

${users.count} * 100.0 / ${users.count:row_total}`.

Free text values

Calculations can also contain free text - just leave out the equals sign when creating the calculation. When you don't include the equals sign, Omni won't treat the cell's value as a formula.

To create this type of calculation, add a new column to the table and then enter text in the cells.

Free-text values can be used to cross-reference columns or cells in other workbook tabs. To do this, create a new column, enter an equal sign, and ` (backtick) to pull up the tab names in the cell:

Table calculations in Omni

Creating table calculations

Quick calculations

AI-generated

Manually-created calculations

Renaming & formatting calculations

Promoting table calculations

Examples

Return null values

Total references

Free text values

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/table-calculations](https://docs.omni.co/docs/querying-and-sql/table-calculations) on 2025-07-23.*
