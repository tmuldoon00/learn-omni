# Supported date & time functions

**Source URL:** [https://docs.omni.co/docs/querying-and-sql/table-calculations/date-time-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/date-time-functions)  
**Extracted:** 2025-07-23 21:44:39  
**Source:** Omni Analytics Documentation

---

On this page

Omni supports

cell formulas

typically found in most spreadsheet applications such as Google Sheets. This reference details the date and time functions supported by Omni.

DATE

Creates a date from day, month, and year components. For more information, refer to the

Google Sheets documentation

DATE(year, month, day)

DATE(2022, 12, 22)

DATEDIF

Finds the difference between two dates in specified units, such as days.

For more information, refer to the

Google Sheets documentation

DATEDIF(start_date, end_date, "unit")

Example

DATEDIF(A1, B1, "M")

DAY

Returns the day of the month from a date.

For more information, refer to the

Google Sheets documentation

DAY(date)

Example

DAY("2022-12-22")

DAYS

Finds the difference in days between two dates. Similar to

DATEDIF

For more information, refer to the

Google Sheets documentation

DAYS(start_date, end_date)

Example

DAYS(A1, B1)

DAYS(“2/28/2016”, “2/28/2017”)

EOMONTH

Returns the date of the last day of a month from a date or datetime value. This function takes two arguments:

date_value

- The date from which to calculate the result

offset_months

- The number of months before (negative) or after (positive) the

date_value

to consider

For more information, refer to the

Google Sheets documentation

EOMONTH(date_value, offset_months)

Example

EOMONTH("3/1/2024", 0)

HOUR

Returns the hour as a number from

12:00 A.M.

) to

11:00 P.M.

For more examples, refer to the

Google Sheets documentation

HOUR(time)

Example

HOUR(A1)

HOUR("15:30")

HOUR("20:49:59")

MINUTE

Returns the minute as a number from

For more examples, refer to the

Google Sheets documentation

MINUTE(time)

Example

MINUTE(A1)

MINUTE("15:30")

MINUTE("20:49:59")

NOW

Returns the current date and time as a date-time value. To create a date without the current time, use

TODAY

For more information, refer to the

Google Sheets documentation

NOW()

Example

NOW()

SECOND

Returns the second from as a number from 0 to 59.

For more examples, refer to the

Google Sheets documentation

SECOND()

Example

SECOND()

TODAY

Returns the current date as a date value. Does not accept arguments. To create a date with the current time, use

NOW

For more examples, refer to the

Google Sheets documentation

TODAY()

Example

TODAY()

WEEKDAY

Returns the day of the week as a number from

For more information, refer to the

Google Sheets documentation

WEEKDAY(date)

Example

WEEKDAY("2022-12-22")

WEEKNUM

Returns a number representing the week of the year where the provided date falls. This function accepts two arguments:

date

- The date for which to calculate the week number. Must be a date, a function returning a date type, or a number.

type

Optional

. A number representing the day that a week starts on. Defaults to

(Sunday).

For more information, refer to the

Google Sheets documentation

WEEKNUM(date, [type])

Example

WEEKNUM("2022-12-22", 2)

YEAR

Returns the year from a date.

For more information, refer to the

Google Sheets documentation

YEAR(date)

Example

YEAR("2022-12-22")

DATE

DATEDIF

DAY

DAYS

EOMONTH

HOUR

MINUTE

NOW

SECOND

TODAY

WEEKDAY

WEEKNUM

YEAR

---

*This content was automatically extracted from [https://docs.omni.co/docs/querying-and-sql/table-calculations/date-time-functions](https://docs.omni.co/docs/querying-and-sql/table-calculations/date-time-functions) on 2025-07-23.*
