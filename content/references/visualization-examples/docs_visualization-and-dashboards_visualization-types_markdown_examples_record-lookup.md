# Record lookup Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/record-lookup](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/record-lookup)  
**Extracted:** 2025-07-23 21:45:16  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a card that contains details for a single record, such as a user profile.

Example code

style

.md-card

display

grid

gap

var

--size6

grid-template-columns

max-content

.md-card-info

grid-row

grid-column

font-size

.md-card-info

font-size

margin-bottom

.md-card-info

margin

.md-profile

grid-row

span

grid-column

.md-profile

img

display

block

width

border-radius

.md-profile

text-align

center

font-size

color

var

--color-text1

margin

.md-card-metrics

grid-row

display

flex

gap

var

--size4

margin

padding

list-style

none

.md-card-metrics

padding-block

var

--size4

.divider

background-color

var

--color-border2

width

margin-inline

var

--size2

margin-block

var

--size4

.md-metric-label

font-size

color

var

--color-text2

.md-metric-value

font-size

font-weight

bold

style

div

class

md-card

div

class

md-card-info

{{result.0.users.full_name.value}}

href

mailto:{{result.0.users.email.value_static}}

{{result.0.users.email.value}}

{{result.0.users.city.value}}, {{result.0.users.state.value}} {{result.0.users.zip.value}}

href

http://www.google.com/maps/search/?api=1&query={{result.0.users.zip.value_static}}

target

_blank

view map

div

div

class

md-profile

img

src

https://robohash.org/{{result.0.users.email.value_static}}

Robots lovingly delivered by Robohash.org

div

class

md-card-metrics

div

class

md-metric-value

{{result.0.users.age.value}}

div

div

class

md-metric-label

{{fields.users.age.label}}

div

class

divider

div

class

md-metric-value

{{result.0.order_items.order_count.value}}

div

div

class

md-metric-label

{{fields.order_items.order_count.label}}

div

class

divider

div

class

md-metric-value

{{result.0.order_items.sale_price_sum.value}}

div

div

class

md-metric-label

{{fields.order_items.sale_price_sum.label}}

div

div

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/record-lookup](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/record-lookup) on 2025-07-23.*
