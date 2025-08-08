# Supported text functions

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/table-calculations/text-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/text-functions)  
**Extracted:** 2025-07-23 21:44:41  
**Source:** Omni Analytics Documentation

---

On this page

Omni supports

cell formulas

typically found in most spreadsheet applications such as Google Sheets. This reference details the text functions supported by Omni.

CHAR

Returns the character specified by a number. Char values follow the ASCII value mapping.

For more information, refer to the

Google Sheets documentation

CHAR(number)

Example

CHAR(10)

CONCAT

Concatenates (combines) any number of strings into a single string.

For more information, refer to the

Google Sheets documentation

CONCAT(string1, string2, ...)

Example

CONCAT("Hello", " ", "World")       # Results in "Hello World"

CLEAN

Returns text with the non-printable ASCII characters removed. Unicode characters that aren't in ASCII are not removed.

For more information, refer to the

Google Sheets documentation

CLEAN(text)

Example

CONCAT("Hello"&CHAR(31))

FIND

Returns the position of one string inside another.

For more information, refer to the

Google Sheets documentation

FIND(find_text, within_text, [start_num])

Example

FIND("n", "Omni")

Limitations

Unlike Google Sheets or Excel, Omni's

FIND

does not accept a third argument for

start number/index

LEFT

Returns the specified number of characters from the start of a text string.

For more information, refer to the

Google Sheets documentation

LEFT(text, [num_chars])

Example

LEFT("Hello", 3)

LEN

Returns the length (number of characters) of a string.

For more information, refer to the

Google Sheets documentation

LEN(text)

Example

LEN("Hello")

LOWER

Converts text to lowercase.

For more information, refer to the

Google Sheets documentation

LOWER(text)

Example

LOWER("Hello")

MID

Returns a specific number of characters from a text string starting at the specified position.

For more information, refer to the

Google Sheets documentation

MID(text, start_num, num_chars)

Example

MID("Hello", 2, 3)

REPLACE

Replaces characters in a string with new text.

For more information, refer to the

Google Sheets documentation

REPLACE(old_text, start_num, num_chars, new_text)

Example

REPLACE("Hello", 2, 3, "i")

RIGHT

Returns the specified number of characters from the end of a text string.

For more information, refer to the

Google Sheets documentation

RIGHT(text, [num_chars])

Example

RIGHT("Hello", 3)

Finds one text value within another, ignoring case.

For more information, refer to the

Google Sheets documentation

SEARCH(find_text, within_text, [start_num])

Example

SEARCH("blobs","The happiest place on earth is Blobs R Us")

SEARCH("blob","Hello, Blob", 6)

Returns string arguments as text.

For more information, refer to the

Google Sheets documentation

T(value)

Example

T(A1)

T("2025-01-01")

TEXT

Converts a number into text according to a specified format.

For more information, refer to the

Google Sheets documentation

TEXT(value, "format")

Example

TEXT(1.23,"$0.00")

TEXT(DATE(1969,7,20),"yyyy-MM")

CHAR

CONCAT

CLEAN

FIND

LEFT

LEN

LOWER

MID

REPLACE

RIGHT

TEXT

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/table-calculations/text-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/text-functions) on 2025-07-23.*
