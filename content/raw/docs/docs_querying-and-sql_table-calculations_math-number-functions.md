# Supported math & number functions

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/table-calculations/math-number-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/math-number-functions)  
**Extracted:** 2025-07-23 21:44:40  
**Source:** Omni Analytics Documentation

---

On this page

Omni supports

cell formulas

typically found in most spreadsheet applications such as Google Sheets. This reference details the math and number functions supported by Omni.

Working with math functions

Some math expressions will contain binary operators. These are operators that take both a left and right operand. For example, in

1 + 2

is the left operand

is the binary operator

is the right operand

When working with expressions, note that they will follow the standard order of operations. This means the expression will multiply and divide before addition and subtraction. Use parenthesis to clarify the expression or alter the order.

Supported operators

Loading data...

ABS

Returns the absolute value of a number. The

value

argument can be a numeric value (

) or a reference to a cell, range, or column containing numeric data.

For more information, refer to the

Google Sheets documentation

ABS(value)

Example

ABS(-14)

ACOS

Returns the arccosine of a number. This function returns the angle whose cosine is the specified number.

For more information, refer to the

Google Sheets documentation

ACOS(number)

Example

ACOS(0.5)

ATAN

Returns the arctangent of a number. Specifically, this function returns the angle whose tangent is the specified number.

For additional information, refer to the

Google Sheets documentation

ATAN(number)

Example

ATAN(0.5)

AVERAGE

Averages a list of numbers. The list can be composed of number literals (

), cell references (

), cell ranges (

B4:B9

), and column references (

C:C

When used, the function will apply to all values in the column.

For more details, refer to the

Google Sheets documentation

AVERAGE(value1, value2, ...)

Example

AVERAGE(1, 2, 3, 4)

AVERAGEIFS

Returns the average of a range depending on specified criteria.

For more details, refer to the

Google Sheets documentation

AVERAGEIFS(range_to_average, criteria_range1, criterion1, [criteria_range2, criterion2, ...])

Example

AVERAGEIFS(A1:A10, B1:B10, ">20")

CEILING

Rounds numbers up to the nearest integer multiple of (optional) specified significance. For more information, refer to the

Google Sheets documentation

CEILING(value, <significance-optional>)

Example

CEILING(A1, .05)

CORREL

Returns the correlation coefficient of the

array1

and

array2

cell ranges. For more information, refer to the

Google Sheets documentation

CORREL(array1, array2)

Example

CORREL(A1:A3, B1:B3)

COS

Returns the cosine of an angle, in radians. For more information, refer to the

Google Sheets documentation

COS(number)

Example

COS(45)

COT

Returns the cotangent of an angle, in radians. For more information, refer to the

Google Sheets documentation

COT(number)

Example

COT(45)

COUNT

Counts the number of cells that contain values in the column. When used, the formula will be applied to the entire column. For more information, refer to the see the

Google Sheets documentation

The value can be a reference to a cell (

), a range (

B4:B9

), or a column (

C:C

COUNT(value)

Example

COUNT(A1)

COUNT(A1:A12)

COUNT(D:D)

COUNTA

Counts the number of cells that are not empty. The value can be a reference to a cell (

), a range (

B4:B9

), or a column (

C:C

). For more information, refer to the

Google Sheets documentation

COUNTA(value)

Example

COUNTA(A1)

COUNTIF

Counts the number of cells that contain values that meet a given criteria. This function takes two arguments:

cell_range

– The range the

criteria

argument is applied to

criteria

– The condition applied to the specified

cell_range

Note

: Criteria arguments are not case sensitive.

COUNTIF(cell_range, criteria)

Example

COUNTIF(A2:A5, A1 >= 2)

Limitations

string

data types are not supported for

COUNTIF

Only works with conditional counts with a single criterion. To use multiple criteria, use

COUNTIFS

For more information, refer to the

Google Sheets documentation

COUNTIFS

Counts the number of cells that contain values that meet given criteria.

cell_range

– The range the

criteria

argument is applied to

criteria

– The condition - which can include multiple arguments - applied to the specified

cell_range

Note

: Criteria arguments are not case sensitive.

For more information, refer to the

Google Sheets documentation

COUNTIF(cell_range, criteria1, [criteria2-optional])

Example

COUNTIFS(A1:A5, A1 > 2, B3:B10, B1 > A1)

Limitations

string

data types are not supported for

COUNTIF

COVAR

Returns covariance, the average of the products of deviations. Equivalent to

COVAR.S

For more information, refer to the

Google Sheets documentation

COVAR(array1, array2)

Example

COVAR(A1:A10, B1:B10)

COVARIANCE.P

Returns covariance, the average of the products of deviations of a population.

COVARIANCE.P(array1, array2)

Example

COVARIANCE.P(A1:A3, B1:B3)

DEGREES

Converts radians to degrees. For more information, refer to the

Google Sheets documentation

DEGREES(radians)

Example

DEGREES(1.047)

EXP

Returns

raised to the power of a given number.

For more information, refer to the

Google Sheets documentation

EXP(number)

Example

EXP(2)

FLOOR

Rounds a number down to the nearest integer multiple of specified significance.

For more information, refer to the

Google Sheets documentation

FLOOR(value, <significance-optional>)

Example

FLOOR(A1, .05)

INT

Rounds a number down to the nearest integer that is less than or equal to it. Alias for

FLOOR

For more information, refer to the

Google Sheets documentation

INT(value)

Example

FLOOR(A1, .05)

INTERCEPT

Returns the intercept of the linear regression line through data points in X and Y data points. This function takes two arguments:

x_value

- Range of values representing the x-coordinate in a linear regression

y_value

- Range of values representing the y-coordinate in a linear regression

Note

: Any text of type

string

encountered in the value arguments will return null values.

For more information, refer to the

Google Sheets documentation

INTERCEPT(x_value, y_value)

Example

INTERCEPT(A1:A100, B1:B100)

LARGE

Returns the

nth

largest value in a data set. For more information, refer to the

Google Sheets documentation

LARGE(array, k)

Example

LARGE(A1:A100, 4)

Returns the natural logarithm of a number. For more information, refer to the

Google Sheets documentation

LN(number)

Example

LN(100)

LOG

Returns the logarithm of a number to the specified base. If

base

isn't specified, the default of

will be used.

For more information, refer to the refer to the

Google Sheets LOG() function documentation

LOG(number, [base-optional])

Example

LOG(100, 10)

LOG10

Returns the base-10 logarithm of a number. For more information, refer to the

Google Sheets documentation

LOG10(number)

Example

LOG(100)

MAX

Returns the largest number in a set. Only a single column or range may be provided as an argument.

For more information, refer to the

Google Sheets documentation

MAX(range)

Example

MAX(A1:A5)

MAXIFS

Returns the maximum value in a range of cells, filtered by a list of criteria.

For more information, refer to the

Google Sheets documentation

MAXIFS(max_range, criteria_range1, criteria1, [criteria_range2, criteria2], ... )'

Example

MAXIFS(D4:E5, F4:G5, “>5”, F6:G7, “<10”)

MEDIAN

Returns the median number in a set. Only a single column or range may be provided as an argument.

For more information, refer to the

Google Sheets documentation

MEDIAN(range)

Example

MEDIAN(B2:B8)

MIN

Returns the smallest number in a set. Only a single column or range may be provided as an argument.

For more information, refer to the

Google Sheets documentation

MIN(range)

Example

MIN(C1:C10)

MOD

Returns the remainder from division. For more information, refer to the

Google Sheets documentation

MOD(dividend, divisor)

Example

MOD(10, 3)

MODE

Returns the most common number in a set. Only a single column or range may be provided as an argument.

For more information, refer to the

Google Sheets documentation

MODE(range)

Example

MODE(A1:A5)

RAND

Generates a random number between 0 and 1. For more information, refer to the

Google Sheets documentation

RAND()

Example

RAND()

RANK

Returns the rank of a number in a list of numbers. The

direction

argument is optional, and if omitted will default to

descending

For more information, refer to the

Google Sheets documentation

RANK(number, ref, [direction])

Example

RANK(number, ref, [direction])

tip

Use in combination with a

filter

on this calculation to get a top

list. For example,

calc <= 5

ROUND

Rounds a number to a specified number of digits. The

num_digits

argument is optional and will default to

if not provided.

For more information, refer to the

Google Sheets documentation

ROUND(number, [num_digits])

Example

ROUND(100.1234, 2)

ROUNDDOWN

Rounds a number down, towards zero, to a specified number of digits. The

num_digits

argument is optional and will default to

if not provided.

For more information, refer to the

Google Sheets documentation

ROUNDDOWN(number, [num_digits])

Example

ROUNDDOWN(100.1234, 2)

ROUNDUP

Rounds a number up, away from zero, to a specified number of digits. The

num_digits

argument is optional and will default to

if not provided.

For more information, refer to the

Google Sheets documentation

ROUNDUP(number, [num_digits])

Example

ROUNDUP(100.1234, 2)

SLOPE

Returns the slope of the linear regression line through data points in Ys and Xs. This function accepts two arguments:

x_value

- The range representing the array or matrix of dependent data

y_value

- The range representing the array or matrix of independent data

Note

: Any text of type

string

encountered in the value arguments will return null values.

For more information, refer to the

Google Sheets documentation

SLOPE(x_value, y_value)

Example:

SLOPE (A1:A100, D1:D100)

SMALL

Returns the nth smallest value in a data set. For more information, refer to the

Google Sheets documentation

SMALL(array, n)

Example

SMALL(A1:A100, 4)

SQRT

Returns a positive square root. For more information, refer to the

Google Sheets documentation

SQRT(number)

Example

SQRT(100)

STDEV

Estimates the standard deviation based on a population of values. This function accepts a single argument:

value

- Can be a reference to a cell (

), a range (

B4:B9

), or a column (

C:C

Note

: If the value contains references to text values, the calculation will be returned as

null

STDEV(value)

Examples

STDEV(A1)

STDEV(A1:A5)

Limitations

There is not full parity of functionality between the

STDEV

function in Google Sheets and Omni. For more information, refer to the

Google Sheets documentation

STDEV.P

Estimates the standard deviation based on an entire population. This function accepts a single argument:

value

- Can be a reference to a cell (

), a range (

B4:B9

), or a column (

C:C

Note

: If the value contains references to text values, the calculation will be returned as

null

STDEV.P(value)

Examples

STDEV.P(A1)

STDEV.P(A1:A5)

Limitations

There is not full parity of functionality between the

STDEV.P

function in Google Sheets and Omni. For more information, refer to the

Google Sheets documentation

SUM

Adds all the numbers in a range of cells. For more information, refer to the

Google Sheets documentation

SUM(range)

Example

SUM(A1:A5)

SUMIF

Adds the cells specified by a given criteria. For more information, refer to the

Google Sheets documentation

SUMIF(range, criteria, [sum_range-optional])

Example

SUMIF(B2:B8, B2 > 5, C2:C8)

Limitations

Text (

string

) criteria is not supported.

SUMIFS

Adds the cells specified by multiple criteria criteria. For more information, refer to the

Google Sheets documentation

SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ... )

Example

SUMIF(B2:B8, C2:C8, B2 > 5)

Limitations

Text (

string

) criteria is not supported.

SUMPRODUCT

Returns the sum of the products of corresponding array components. For more information, refer to the

Google Sheets documentation

SUMPRODUCT(range1, range2, ...)

Example

SUMPRODUCT(A1:A5, B1:B5)

TRUNC

Truncates a number to an integer by removing the decimal portion of a number. Alias for

FLOOR

For more information, refer to the

Google Sheets documentation

TRUNC(number)

Example

TRUNC(8.9)

VALUE

Converts a text argument to a number. For more information, refer to the

Google Sheets VALUE() function documentation

VALUE(text)

Example

VALUE("123")

VAR

Calculates the variance based on a sample of values. This function accepts a single argument,

value

. The

value

can be a number or a range of numbers.

VAR(value)

Examples

VAR(1)

VAR(A1)

VAR(A2:A25)

Limitations

There is not full parity of functionality between the

VAR

function in Google Sheets and Omni. For additional information, see the

Google Sheets documentation

VAR.P

Returns the variance of a population. The value can be a number (

), a reference to a cell (

), a range (

B4:B9

), or a column (

C:C

For more information, refer to the

Google Sheets documentation

VAR(value)

Examples

VAR(1)

VAR(A1)

VAR(A2:A25)

Working with math functions

Supported operators

ABS

ACOS

ATAN

AVERAGE

AVERAGEIFS

CEILING

CORREL

COS

COT

COUNT

COUNTA

COUNTIF

COUNTIFS

COVAR

COVARIANCE.P

DEGREES

EXP

FLOOR

INT

INTERCEPT

LARGE

LOG

LOG10

MAX

MAXIFS

MEDIAN

MIN

MOD

MODE

RAND

RANK

ROUND

ROUNDDOWN

ROUNDUP

SLOPE

SMALL

SQRT

STDEV

STDEV.P

SUM

SUMIF

SUMIFS

SUMPRODUCT

TRUNC

VALUE

VAR

VAR.P

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/table-calculations/math-number-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/math-number-functions) on 2025-07-23.*
