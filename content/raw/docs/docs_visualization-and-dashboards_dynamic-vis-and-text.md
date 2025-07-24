# Dynamic variables

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/dynamic-vis-and-text](https://docs.omni.co/docs/visualization-and-dashboards/dynamic-vis-and-text)  
**Extracted:** 2025-07-23 21:44:57  
**Source:** Omni Analytics Documentation

---

On this page

Omni content can be made more dynamic by using the

Mustache syntax

to insert variables in different areas of the product - text tiles, dashboard titles, axis labels, and many more. Dynamic sections can read in variables like filters used and do basic lookups into the query payload.

Here are a few examples (text tiles showing filters, axis with summary stats that shows filters):

Text tiles

From the dashboard text tiles can be made to dynamically reference selected filters and controls.

Filters

Use the following syntax to reference a filter in a text tile on a dashboard:

## Breakdown by country

Filter applied: country **{{filters.users.country.summary}}**

# Breakdown by state

Filter applied: state **{{filters.users.state.summary}}**

# Reference a control

Controls

Use the following syntax to reference a control in a text tile on a dashboard:

# Reference the control's current value

{{controls.<control_id>.value}}

# Reference the control's label

{{controls.<control_id>.label}}

# Reference the control's summary

{{controls.<control_id>.summary}}

# Reference the raw JSON of the control

{{controls.<control_id>.json}}

To retrieve a control's ID, open the

Edit control

panel:

KPIs and Markdown Visualizations

Markdown visualizations (in the workbook) can be wired to reference specific values in the table, as well the filters via the rows returned:

There have been **{{result._totals._first.order_items.order_count.value}}** orders placed for **{{result._first.products.brand.value}}** in **{{result._first.users.state.value}}**, and the average selling price is **{{result._first.order_items.sale_price_average.value}}**.

See the 🗺📍 below for **{{result._first.products.brand.value}}** stores in the top selling city - **{{result._first.users.city.value}}, {{result._first.users.state.value}}**.

Iframes (via Markdown Visualization)

Similar to vanilla markdown tiles, iframes can be made dynamic as well, here using a Google Maps search with a dynamic URL:

<iframe src="https://www.google.com/maps/embed/v1/search?q={{result.0.products.brand.value_static}}+in+{{result._first.users.city.value_static}},{{result._first.users.state.value_static}}&key=AIzaSyCXfF4zpXaYkgVaBzj3oZUtmcDAxpdoOGk&" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

Visualization Axis Labels

Visualizations can also be made dynamic, here in the y-axis label to show summary values and the filter objects:

Order Count ({{result._totals.0.order_items.order_count.value}} Total Orders in {{result.0.users.state.value}})

HTML Escaping

When using the

{{ variable }}

syntax, all variables are HTML escaped by default.  If you want to return raw contents without escaping, use the triple mustache, ie.

{{{ variable }}}

For more specifics on syntax and gotchas, see the

Mustache docs

Mustache Syntax Reference for Query Data

These mirror references in

Markdown blocks

Part of the query

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

Filters

Label

{{filters.users.state.label}}

users.state

Filters

Summary

{{filters.users.state.summary}}

is: California,Virginia

* Note: There are two options for returning the field value:

.value

will return an interactive value where drilling is enabled,

.value_static

will return just the raw value with no interactivity.

Text tiles

Filters

Controls

KPIs and Markdown Visualizations

Iframes (via Markdown Visualization)

Visualization Axis Labels

HTML Escaping

Mustache Syntax Reference for Query Data

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/dynamic-vis-and-text](https://docs.omni.co/docs/visualization-and-dashboards/dynamic-vis-and-text) on 2025-07-23.*
