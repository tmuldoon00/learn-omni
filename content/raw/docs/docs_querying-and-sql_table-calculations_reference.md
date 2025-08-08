# Supported table calculation functions

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/table-calculations/reference](https://docs.omni.co/docs/querying-and-sql/table-calculations/reference)  
**Extracted:** 2025-07-23 21:44:41  
**Source:** Omni Analytics Documentation

---

On this page

Use this reference to learn more about the functions Omni supports for creating table calculations. For general information about table calculations, such as how they work and how you can create them, refer to the

Using Excel-style functions to create table calculations guide

Date & time functions

Name

Description

DATE

Creates a date from day, month, and year components.

DATEDIF

Finds the difference between two dates in specified units, such as days.

DAY

Returns the day of the month from a date.

DAYS

Finds the difference in days between two dates.

EOMONTH

Returns the date of the last day of a month from a date or datetime value.

HOUR

Returns the hour as a number from 0 to 23.

MINUTE

Returns the minute as a number from 0 to 59.

NOW

Returns the current date and time as a date-time value.

SECOND

Returns the second from as a number from 0 to 59.

TODAY

Returns the current date as a date value.

WEEKDAY

Returns the day of the week as a number from

WEEKNUM

Returns a number representing the week of the year where the provided date falls.

YEAR

Returns the year from a date.

Logic functions

Name

Description

AND

Returns true if all of the provided arguments are logically true.

BITAND

Returns the bitwise boolean AND of two numbers.

BITOR

Returns the bitwise boolean OR of two numbers.

BITRSHIFT

Shifts the bits of the input a certain number of places to the right.

BITXOR

Returns a number that's the result of performing an

XOR

function at each bit of the two numbers given as arguments.

Returns the second argument if a logical expression is true and the third argument if the expression is false.

IFERROR

Returns the specified value if the formula returns null due to an error; otherwise returns the result of the formula. If the second argument is absent, a blank will be returned.

IFNA

Returns the specified value if the formula returns null; otherwise returns the result of the formula.

IFS

Evaluates multiple conditions and returns a value that corresponds to the first true condition.

ISBLANK

Returns true if a value is blank.

ISNUMBER

Returns true if a value is a number.

NOT

Returns the opposite of a logical value.

Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.

Math & number functions

Name

Description

ABS

Returns the absolute value of a number.

ACOS

Returns the arccosine of a number.

ATAN

Returns the arctangent of a number. Specifically, this function returns the angle whose tangent is the specified number.

AVERAGE

Averages a list of numbers.

AVERAGEIFS

Returns the average of a range depending on specified criteria.

CEILING

Rounds numbers up to the nearest integer multiple of (optional) specified significance.

CORREL

Returns the correlation coefficient of the

array1

and

array2

cell ranges.

COS

Returns the cosine of an angle, in radians.

COT

Returns the cotangent of an angle, in radians.

COUNT

Counts the number of cells that contain values in the column. When used, the formula will be applied to the entire column.

COUNTA

Counts the number of cells that are not empty. The value can be a reference to a cell (

), a range (

B4:B9

), or a column (

C:C

COUNTIF

Counts the number of cells that contain values that meet a given criteria.

COUNTIFS

Counts the number of cells that contain values that meet given criteria.

COVAR

Returns covariance, the average of the products of deviations. Equivalent to

COVAR.S

COVARIANCE.P

Returns covariance, the average of the products of deviations of a population.

DEGREES

Converts radians to degrees.

EXP

Returns

raised to the power of a given number.

FLOOR

Rounds a number down to the nearest integer multiple of specified significance.

INT

Rounds a number down to the nearest integer that is less than or equal to it. Alias for

FLOOR

INTERCEPT

Returns the intercept of the linear regression line through data points in X and Y data points.

LARGE

Returns the

nth

largest value in a data set.

Returns the natural logarithm of a number.

LOG

Returns the logarithm of a number to the specified base.

LOG10

Returns the base-10 logarithm of a number.

MAX

Returns the maximum value in a data set.

MAXIFS

Returns the maximum value in a range of cells, filtered by a list of criteria.

MEDIAN

Returns the median number in a set.

MIN

Returns the minimum value in a data set.

MOD

Returns the remainder of a division.

MODE

Returns the most common number in a set.

RAND

Generates a random number between 0 and 1.

RANK

Returns the rank of a number in a list of numbers.

ROUND

Rounds a number to a specified number of digits.

ROUNDDOWN

Rounds a number down, towards zero, to a specified number of digits.

ROUNDUP

Rounds a number up, away from zero, to a specified number of digits.

SLOPE

Returns the slope of the linear regression line through data points in Ys and Xs.

SMALL

Returns the nth smallest value in a data set.

SQRT

Returns a positive square root.

STDEV

Estimates the standard deviation based on a population of values.

STDEV.P

Estimates the standard deviation based on an entire population.

SUM

Adds all the numbers in a range of cells.

SUMIF

Adds the cells specified by a given criteria.

SUMIFS

Adds the cells specified by multiple criteria.

SUMPRODUCT

Returns the sum of the products of corresponding array components.

TRUNC

Truncates a number to an integer by removing the decimal portion of a number.

VALUE

Converts a text argument to a number.

VAR

Calculates the variance based on a sample of values.

VAR.P

Returns the variance of a population.

Position functions

Name

Description

INDEX

Returns the content of a cell, specified by row and column offset.

MATCH

Returns the relative position of an item in a range that matches a specified value.

PIVOT

Returns a value from a specific pivot in the data table.

PIVOTINDEX

Returns the index of the current pivot.

PIVOTOFFSET

Returns a pivot value offset from the current pivot column.

PIVOTROW

Returns the values of a specified row in a pivot.

ROW

Returns the current row number.

SWITCH

Evaluates an expression against a list of values and returns the result corresponding to the first matching value.

VLOOKUP

Searches for a value in a range and returns the value in the specified column.

XLOOKUP

Searches for a value in a specified range in another query/tab and returns the corresponding value from the range.

Text functions

Name

Description

CHAR

Returns the character specified by a number.

CONCAT

Concatenates (combines) any number of strings into a single string.

CLEAN

Returns text with the non-printable ASCII characters removed. Unicode characters that aren't in ASCII are not removed.

FIND

Returns the position of one string inside another.

LEFT

Returns the specified number of characters from the start of a text string.

LEN

Returns the length (number of characters) of a string.

LOWER

Converts text to lowercase.

MID

Returns a specific number of characters from a text string starting at the specified position.

REPLACE

Replaces characters in a string with new text.

RIGHT

Returns the specified number of characters from the end of a text string.

Finds one text value within another, ignoring case.

Returns arguments as text.

TEXT

Converts a number into text according to a specified format.

Date & time functions

Logic functions

Math & number functions

Position functions

Text functions

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/table-calculations/reference](https://docs.omni.co/docs/querying-and-sql/table-calculations/reference) on 2025-07-23.*
