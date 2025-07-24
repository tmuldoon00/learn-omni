# Supported logic functions

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/table-calculations/logic-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/logic-functions)  
**Extracted:** 2025-07-23 21:44:39  
**Source:** Omni Analytics Documentation

---

On this page

Omni supports

cell formulas

typically found in most spreadsheet applications such as Google Sheets. This reference details the logic functions supported by Omni.

AND

Returns

true

if all off the provided arguments are logically true. Returns

false

if any of the provided arguments are false. Can be combined with other functions like

to create advanced logical statements.

For more information, refer to the

Google Sheets documentation

AND(condition1, condition2, ...)

Example

AND(A1 > 5, B1 < 10)         # Returns true if both conditions are true

BITAND

Returns the bitwise boolean

AND

of two numbers.

For more information, refer to the

Google Sheets documentation

BITAND(value1, value2)

Example

BITAND(6, 3)

BITOR

Returns the bitwise boolean

of two numbers.

For more information, refer to the

Google Sheets documentation

BITOR(value1, value2)

Example

BITOR(6, 3)

BITRSHIFT

Shifts the bits of the input a certain number of places to the right. Bits on the left are filled with zeroes. This function accepts two arguments:

value

- The number to be shifted

shift_amount

- The number of places to shift the given value

For more information, refer to the

Google Sheets documentation

BITRSHIFT(value, shift_amount)

Example

BITRSHIFT(8, 2)

BITXOR

Returns a number that's the result of performing an

XOR

function at each bit of the two numbers given as arguments. This function is a bitwise XOR (exclusive or) of 2 numbers that returns a bit of

“1”

if 2 bits are different, and a bit of

“0”

otherwise.

For more information, refer to the

Google Sheets documentation

BITXOR(value1, value2)

Example

BITXOR(5, 3)

Returns the second argument if a logical expression is

TRUE

and the third argument if the expression is

FALSE

. To evaluate multiple conditions, use

IFS

For more information, refer to the

Google Sheets documentation

IF(condition, true_value, false_value)

Example

IF(A1 > 10, "big", "small")

IFERROR

Returns the specified value (

optional_value_if_error

) if the formula returns null due to an error; otherwise returns the result of the formula (

value

). If the second argument is absent, a blank will be returned.

For more information, refer to the

Google Sheets documentation

IFERROR(value, [optional_value_if_error])

Example

IFERROR(A1, "Error in cell A1")

IFNA

Returns the specified value if the formula returns null; otherwise returns the result of the formula.

For more information, refer to the

Google Sheets documentation

IFNA(value, default_value)

Example

IFNA(VLOOKUP("X", A1:B10, 2, FALSE), "Not Found")

IFS

Evaluates multiple conditions and returns a value that corresponds to the first true condition. Similar to

For more information, refer to the

Google Sheets documentation

IFS(condition1, value1, condition2, value2, ..., [default_value])

Example

IFS(A1 > 90, "A", A1 > 80, "B", A1 > 70, "C", TRUE, "F")

ISBLANK

Returns

TRUE

if a value is blank.

For more information, refer to the

Google Sheets documentation

ISBLANK(value)

Example

ISBLANK(A1)

ISNUMBER

Returns

TRUE

if a value is a number.

For more information, refer to the

Google Sheets documentation

ISNUMBER(value)

Example

ISNUMBER(10)

NOT

Returns the opposite of a logical value:

NOT(TRUE)

returns

FALSE

NOT(FALSE)

returns

TRUE

Because

has a logical value of

FALSE

and any non-zero numeric value has a logical value of

TRUE

NOT(0)

returns

TRUE

and

NOT(6)

returns

FALSE

. However, when non-numeric values are input into

NOT

, the function returns the error

#VALUE!

For more information, refer to the

Google Sheets documentation

NOT(logical_expression)

Example

NOT(1+1=2)        # FALSE

NOT(1+4=3)        # TRUE

Returns

true

if any of the provided arguments are logically true, and

false

if all of the provided arguments are logically false. Can be combined with other functions like

to create advanced logical statements.

For more information, refer to the

Google Sheets documentation

OR(condition1, condition2)

Example

OR(A1 < 1, A1 > 3)

AND

BITAND

BITOR

BITRSHIFT

BITXOR

IFERROR

IFNA

IFS

ISBLANK

ISNUMBER

NOT

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/table-calculations/logic-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/logic-functions) on 2025-07-23.*
