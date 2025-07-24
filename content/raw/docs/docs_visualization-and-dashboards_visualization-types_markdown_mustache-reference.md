# Markdown Mustache syntax reference

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/mustache-reference](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/mustache-reference)  
**Extracted:** 2025-07-23 21:45:20  
**Source:** Omni Analytics Documentation

---

On this page

When creating a

Markdown visualization

, you can reference data and other query elements using Mustache syntax. For example,

{{fields.order_items.sale_price_sum.view_label}}

Query data

This section describes the elements available in a Markdown visualization for

referencing query data

Fields

Query part

Element

Example Syntax

Example Output

Field

View name

{{fields.order_items.sale_price_sum.view_label}}

Order Items

Field

Field name

{{fields.order_items.sale_price_sum.label}}

Sale Price Sum

Field

First row value

{{result._first.Female.order_items.sale_price_sum.value}}

$21.60K

Field

Last row value

{{result._last.Female.order_items.sale_price_sum.value}}

$28.82K

Field

Any row value (array syntax starting with 0)

{{result.5.Female.order_items.sale_price_sum.value}}

$31.29K

Field

Column total

{{result.totals._first.Female.order_items.sale_price_sum.value}}

$870.97K

Field

Row total (array syntax starting with 0)

{{result.5.row_total.order_items.sale_price_sum.value}}

$62.87K

Field

Grand total

{{result.totals._first.row_total.order_items.sale_price_sum.value}}

$1.63M

Returning field values

There are two options for returning field values:

.value

returns an interactive value where drilling is enabled

.value_static

returns only the raw value with no interactivity

Filters

Query part

Element

Example syntax

Example output

Filters

Label

{{filters.users.state.label}}

users.state

Filters

Summary

{{filters.users.state.summary}}

is: California,Virginia

Controls

Query part

Element

Example syntax

Example output

Controls

Label

{{controls.control_id.label}}

Select user ID

Controls

Summary

{{controls.control_id.summary}}

Order ID

Controls

Value

{{controls.control_id.value}}

order_items.order_id

Query data

Fields

Filters

Controls

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/mustache-reference](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/mustache-reference) on 2025-07-23.*
