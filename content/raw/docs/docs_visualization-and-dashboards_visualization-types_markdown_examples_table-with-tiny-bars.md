# Table with tiny bar charts

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/table-with-tiny-bars](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/table-with-tiny-bars)  
**Extracted:** 2025-07-23 21:45:19  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a styled table with a small bar chart in each row of. A row in the markdown table corresponds to a row in the results.

Setup

These charts use the Mustache iterator syntax to draw a chart for each row in the results. Your query should have a column for each bar that you want to display and then a calculation column for each bar that determines the height of each bar. The calculation in this example calculates the bar height as a percentage of the total for all the traffic sources. Adjust your calculation as needed for different analyses, but make sure you use the % formatting on the calculation column.

The following table explains each field used in the example, including the calculation formulas.

Col

Name

Description or formula

Purpose

State Groups

query field

used to make cute little badges in each row

State

query field

main label for the row

Events Count

query field

Total events used in table for displaying and to calculate denominator for bar height

Adwords

query field

Blue bar

Adwords % (

calc_7

=D1 / C1

% fill for blue bar (make sure to format as %)

Adwords

query field

Yellow bar

Adwords % (

calc_8

=F1 / C1

% fill for yellow bar (make sure to format as %)

Adwords

query field

Pink bar

Adwords % (

calc_9

=H1 / C1

% fill for pink bar (make sure to format as %)

Adwords

query field

Teal bar

Adwords % (

calc_10

=J1 / C1

% fill for teal bar (make sure to format as %)

Adwords

query field

Orange bar

Adwords % (

calc_11

=L1 / C1

% fill for orange bar (make sure to format as %)

Example code

style

<style

article

.fancy-table

--color-adwords

--color-email

--color-facebook

--color-organic

--color-youtube

--bar-height

--color-source

--color-opacity

0.1

--color-west

--color-south

--color-midwest

--color-northeast

.adwords

--color-source

var

--color-adwords

.email

--color-source

var

--color-email

.facebook

--color-source

var

--color-facebook

.organic

--color-source

var

--color-organic

.youtube

--color-source

var

--color-youtube

.west

--color-tag

var

--color-west

.south

--color-tag

var

--color-south

.midwest

--color-tag

var

--color-midwest

.northeast

--color-tag

var

--color-northeast

& ul

list-style

none

margin

padding

& li

padding

margin

article

.fancy-table

.source-legend

display

flex

flex-direction

row

gap

padding

& li

display

flex

flex-direction

row

gap

align-items

center

color

var

--color-text1

font-size

var

--font-xs

& span

display

block

width

height

background-color

rgb

var

--color-source

article

.fancy-table

table

width

border-collapse

collapse

& thead

display

none

& th

white-space

nowrap

& td

padding-block

padding-inline

border-bottom

dotted

var

--color-border2

vertical-align

bottom

& td

.metrics

& th

.metrics

text-align

right

& td

.metrics

font-size

var

--font-md

& td

.summary

display

flex

flex-direction

column

gap

justify-content

center

.type

span

display

inline-block

background

rgba

var

--color-tag

0.1

padding

border-radius

font-size

var

--font-xxs

text-transform

uppercase

color

rgb

var

--color-tag

.title

color

var

--color-text4

font-size

var

--font-md

& td

.sources

display

flex

flex-direction

row

height

var

--bar-height

gap

justify-content

center

& li

width

height

background-color

rgba

var

--color-source

var

--color-opacity

border-radius

display

flex

flex-direction

column-reverse

position

relative

--tooltip-width

--tooltip-height

--translate-tip

calc

var

--tooltip-width

& span

.bar

display

block

width

height

border-radius

background-color

rgb

var

--color-source

& span

.tooltip-content

visibility

hidden

opacity

position

absolute

z-index

bottom

left

calc

top

calc

var

--bar-height

transform

translateX

var

--translate-tip

height

var

--tooltip-height

width

var

--tooltip-width

background-color

#333

color

white

text-align

center

border-radius

padding

font-size

font-weight

normal

transition

opacity

0.15

box-shadow

rgba

0.2

line-height

1.4

word-wrap

break-word

white-space

normal

border-left

solid

rgb

var

--color-source

& span

.tooltip-content

::after

content

position

absolute

top

Calc

right

margin-right

border-width

border-style

solid

border-color

#333

transparent

transparent

transparent

transform

rotate

-90

deg

& li

:hover

.tooltip-content

visibility

visible

opacity

style

article

class

fancy-table

class

source-legend

class

adwords

span

span

Adwords

class

email

span

span

Email

class

facebook

span

span

Facebook

class

organic

span

span

Organic

class

youtube

span

span

YouTube

table

thead

class

summary

Article

class

metrics

Total Views

class

sources

Source

thead

tbody

{{#result}}

class

summary

class

type {{events.state_groups.raw}}

span

{{events.state_groups.value}}

span

class

title

{{events.state.value}}

class

metrics

{{events.count.value}}

class

sources

class

adwords

span

class

bar

style

height:

calc_7.value_static

span

span

class

tooltip-content

{{fields.events.count_adwords.label}}

{{events.count_adwords.value}} • {{calc_7.value_static}}

span

class

email

span

class

bar

style

height:

calc_8.value_static

span

span

class

tooltip-content

{{fields.events.count_email.label}}

{{events.count_email.value}} • {{calc_8.value_static}}

span

class

facebook

span

class

bar

style

height:

calc_9.value_static

span

span

class

tooltip-content

{{fields.events.count_adwords.label}}

{{events.count_adwords.value}} • {{calc_9.value_static}}

span

class

organic

span

class

bar

style

height:

calc_10.value_static

span

span

class

tooltip-content

{{fields.events.count_organic.label}}

{{events.count_organic.value}} • {{calc_10.value_static}}

span

class

youtube

span

class

bar

style

height:

calc_11.value_static

span

span

class

tooltip-content

{{fields.events.count_you_tube.label}}

{{events.count_you_tube.value}} • {{calc_11.value_static}}

span

{{/result}}

tbody

table

article

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/table-with-tiny-bars](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/table-with-tiny-bars) on 2025-07-23.*
