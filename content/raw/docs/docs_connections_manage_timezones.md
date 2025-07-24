# Database timezone settings

**Source URL:** [https://docs.omni.co/docs/connections/manage/timezones](https://docs.omni.co/docs/connections/manage/timezones)  
**Extracted:** 2025-07-23 21:44:07  
**Source:** Omni Analytics Documentation

---

On this page

Omni can convert time-based data to different timezones, performing the conversion when it generates SQL for a query. The underlying data is not changed. Instead, Omni converts the query results using the connection's timezone settings.

In this guide, you'll learn how:

To define timezone settings for data connections

Omni uses the settings to determine the converting timezone

To prevent timezone conversion on fields

Connection timezone settings

Connections have a few settings that allow you to specify how time-based data is converted:

Setting

Description

Default

Database Timezone

Defines the timezone the database is in. The specified timezone is used as the source timezone for any timezone conversions.

UTC

Query Timezone

Defines the timezone to convert data to when querying. If

Do Not Convert

is selected, the

Query Timezone

will be UTC and no conversion will occur. If a timezone is selected:

When querying, data will be converted from the

Database timezone

to the selected timezone

In Omni, fields with timezone data will display in the

Query Timezone

. This also applies to filters with references to relative times and dates, such as today, yesterday, and so on.

And the connection is to Snowflake

, if you specify any

timestamp_tz

fields will be displayed in that timezone. Otherwise, they will keep their timezone offset as-is.

Do not convert

Allow User-specific Timezones

If enabled, individual users'

Query Timezone

setting will be used as the query timezone for the connection.

Disabled

Determining the converting timezone

Trying to determine how these settings impact the timezone used for conversion? Check out the following diagram to step through how Omni uses these settings.

Preventing timezone conversion

To prevent timezone conversion for a field, add the

convert_tz: false

property to the

field in model

Note

: This applies only to fields that don't contain timezone information.

Connection timezone settings

Determining the converting timezone

Preventing timezone conversion

---

*This content was automatically extracted from [https://docs.omni.co/docs/connections/manage/timezones](https://docs.omni.co/docs/connections/manage/timezones) on 2025-07-23.*
