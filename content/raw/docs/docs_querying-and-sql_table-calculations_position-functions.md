# Supported position functions

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/table-calculations/position-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/position-functions)  
**Extracted:** 2025-07-23 21:44:40  
**Source:** Omni Analytics Documentation

---

On this page

Omni supports

cell formulas

typically found in most spreadsheet applications such as Google Sheets. This reference details the position functions supported by Omni, which can be used to return data from specified points in a result table.

INDEX

Returns the content of a cell, specified by row and column offset. This function accepts three arguments:

reference

-  The range of cells from which values are returned

row

Optional

. The index of the row to be returned from within the

reference

. If set to

, values for the entire row will be returned.

column

Optional

. The index of the column to be returned from within the

reference

. If set to

, values for the entire column will be returned.

For more information, refer to the

Google Sheets documentation

INDEX(range, row, column)

Example

INDEX(A2:A25, 12)

INDEX(A2:A25, 1, 2)

Limitations

There is not full parity of functionality between this function in Google Sheets and Omni. Refer to the

Google Sheets documentation

for more information.

MATCH

Returns the relative position of an item in a range that matches a specified value.

Note

: This function will not returned the matched value.

For more information, refer to the

Google Sheets documentation

MATCH(search_key, range)

Example

MATCH("Jane", A10:A25)

Limitations

There is not full parity of functionality between this function in Google Sheets and Omni. Refer to the

Google Sheets documentation

for more information.

PIVOT

tip

In a workbook results table, add a static

PIVOT()

function by entering

"="

and selecting

CMD + click

(or

Control + click

) on the reference cell.

Returns a value from a specific pivot in the data table. This function accepts two arguments:

ref

- The reference to the range of data that includes the column from which to extract values. This only accepts a single column reference.

column_index

- The index number of the column within the referenced range from which to retrieve values.

PIVOT(ref, column_index)

Example

PIVOT(A2, 3)

PIVOTINDEX

Returns the index of the current pivot. This function does not require any arguments.

The values returned for this function are based on the position the pivoted column is on the table. For example,

"Cancelled"

= index

"Complete"

= index

, etc.

PIVOTINDEX()

Example

PIVOTINDEX()

PIVOTOFFSET

Returns a pivot value offset from the current pivot column. This function accepts the following arguments:

value_ref

- Reference to the starting cell or range

row_offset

- Number of rows to move. Positive = down, negative = up.

column_offset

- Number of columns to move. Positive = down, negative = up.

num_rows

Optional

. Number of rows in the returned range. Default is

num_cols

Optional

. Number of columns in the returned range. Default is

PIVOTOFFSET(value_ref, row_offset, column_offset, num_rows, num_cols)

Example

# Returns the value located 2 rows down and 1 column to the left from cell A1

PIVOTOFFSET(A1, 2, -1)

PIVOTROW

Returns the values of a specified row in a pivot. Can be used to aggregate the values in a row, such as summing all values in the row.

PIVOTROW()

Example

PIVOTROW(A1)               # Returns values in row A1

SUM(PIVOTROW(A1))          # Sums all values in row A1

SWITCH

Evaluates an expression against a list of values and returns the result corresponding to the first matching value. Values and results are provided in pairs, and the first matching pair is returned.

An optional

default

argument can be provided as the last argument, which will be used if no matches are found.

For more information, refer to the

Google Sheets documentation

SWITCH(expression, case1, result1, [case2, result2, ...], [default] )

Example

SWITCH(A1, "apple", "fruit", "banana", "fruit", "carrot", "vegetable", "unknown")

The following table contains what the result would be for each

case

(ex:

apple

) argument:

Value

Result

apple

fruit

banana

fruit

carrot

vegetable

Any other value

unknown

ROW

Returns the current row number. Arguments are not supported.

For more information, refer to the

Google Sheets documentation

ROW()

Example

ROW()

VLOOKUP

Searches for a value in a range and returns the value in the specified column.

For more information, refer to the

Google Sheets documentation

VLOOKUP(lookup_value, lookup_range, column_number)

Example

VLOOKUP(C1,'State Mottos'!A:A, 2)

XLOOKUP

Searches for a value in a specified range in another query and returns the corresponding value from the range. Can be used to perform cross-query analysis on queries in the same workbook. For example, fact look ups or joining time series across workbook tabs.

For more information, refer to the

Google Sheets documentation

XLOOKUP(lookup_value, <query_tab_name>!<lookup_range>, <query_tab_name>!<return_range>)

The

lookup_range

argument must reference a

full, single column

. For example,

'State Mottos'!A:A

but not

'State Mottos'!A:C

'State Mottos'!A1:A4

tip

Use the

Copy XLookup Reference

option in the column header's menu options to quickly copy an

XLOOKUP

reference.

Example

XLOOKUP(C1,'State Mottos'!A:A,'State Mottos'!B:B)

View example details

This example has two tabs:

State Mottos

, which contains

State

and

State Motto

columns

Query

, which contains a few columns, including

State

and a column for the

XLOOKUP

calculation

In this example, the calculation uses the

State

column in the

Query

tab as the lookup. It uses the values in the lookup column to search the

State

column in the

State Mottos

tab and find matches. When there's a match, the value in the

Mottos

column is returned.

Check out the video for a step-by-step walkthrough:

INDEX

MATCH

PIVOT

PIVOTINDEX

PIVOTOFFSET

PIVOTROW

SWITCH

ROW

VLOOKUP

XLOOKUP

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/table-calculations/position-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/position-functions) on 2025-07-23.*
