# Calendar heatmaps

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/calendar-heatmaps](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/calendar-heatmaps)  
**Extracted:** 2025-07-23 21:45:04  
**Source:** Omni Analytics Documentation

---

On this page

The code for these examples can be used in the

Markdown visualization

to create to create different styles of calendars with cells colored by a value.

Full year calendar

Setup

This query used for this example has the following structure:

Date field

- make sure to enable "fill in missing dates" to capture any days that are missing data and to extend to the full year

Value field

- a numeric field that we'll use to color the day by

Color calculation

- a simple % of the largest value to map colors (

=B1 / MAX(B:B)

Color bucket calculation

- name of the color "bucket" the date fits into so we can have fewer colors to work with (

=IFS(C1 = 0, "empty", C1 < 0.2, "lt20", C1 < 0.4, "lt40", C1 < 0.6, "lt60", C1 < 0.8, "lt80", TRUE, "lt100")

Example code

View example code

The example below is customized to work for 2025. For different years, you'll need to adjust the number of empty

<li>

tags to get the data starting on the right day of the week.

style

article

.calendar-grid

/* sizing */

--cell-width

--cell-height

--cell-gap

--weekday-width

calc

var

--cell-width

--calendar-label-size

/* colors */

--empty-color

rgba

0.05

--lt20

#c1e598

--lt40

#94d284

--lt60

#62bb6e

--lt80

#399d55

--lt100

#1a7d41

width

min-content

article

.calendar-grid

margin-top

article

.calendar-grid

list-style

none

margin

padding

article

.calendar-grid

ul li

list-style

none

margin

padding

color

var

--color-text1

article

.calendar-grid

.labels

display

grid

grid-template-columns

var

--weekday-width

repeat

gap

var

--cell-gap

& li

display

flex

align-items

center

text-align

center

justify-content

center

font-size

var

--calendar-label-size

text-transform

uppercase

article

.calendar-grid

.calendar

display

grid

display

grid

grid-template-rows

repeat

grid-auto-flow

column

grid-auto-columns

min-content

gap

var

--cell-gap

width

& li

border

solid

rgba

0.1

border-radius

width

var

--cell-width

height

var

--cell-height

display

flex

align-items

center

justify-content

center

position

relative

& li

.heading

border

none

width

var

--day-width

font-size

var

--calendar-label-size

text-transform

uppercase

text-align

right

justify-content

flex-end

padding-right

& li

.last-year

visibility

hidden

& li

.empty

background

var

--empty-color

& li

.lt20

background

var

--lt20

& li

.lt40

background

var

--lt40

& li

.lt60

background

var

--lt60

& li

.lt80

background

var

--lt80

& li

.lt100

background

var

--lt100

& li

.tooltip-content

visibility

hidden

position

absolute

z-index

bottom

left

transform

translateX

-50

width

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

opacity

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

& li

.tooltip-content

::after

content

position

absolute

top

left

margin-left

border-width

border-style

solid

border-color

#333

transparent

transparent

transparent

& li

:hover

.tooltip-content

visibility

visible

opacity

article

.calendar-grid

.legend

font-size

var

--calendar-label-size

text-transform

uppercase

display

flex

flex-direction

row

align-items

center

justify-content

flex-end

gap

var

--cell-gap

padding-top

& li

.legend-item

border

solid

rgba

0.1

border-radius

width

var

--cell-width

height

var

--cell-height

& li

.empty

background

var

--empty-color

& li

.lt20

background

var

--lt20

& li

.lt40

background

var

--lt40

& li

.lt60

background

var

--lt60

& li

.lt80

background

var

--lt80

& li

.lt100

background

var

--lt100

style

article

class

calendar-grid

2025 sales by day

class

labels

Jan

Feb

Mar

Apr

May

Jun

Jul

Aug

Sep

Oct

Nov

Dec

class

calendar

class

heading

class

heading

mon

class

heading

class

heading

wed

class

heading

class

heading

fri

class

heading

<!-- the following 3 LIs get our start weekday to Wednesday -->

class

last-year

class

last-year

class

last-year

{{#result}}

class

{{calc_2.value_static}}

div

class

tooltip-content

{{order_items.created_at[date].value_static}}

{{order_items.total_sale_price.value}}

div

{{/result}}

class

legend

Less

class

legend-item empty

class

legend-item lt20

class

legend-item lt40

class

legend-item lt60

class

legend-item lt80

class

legend-item lt100

More

article

Full year calendar, vertical

Setup

The setup for the vertical full year calendar is identical to the example above:

Date field

- make sure to enable "fill in missing dates" to capture any days that are missing data and to extend to the full year

Value field

- a numeric field that we'll use to color the day by

Color calculation

- a simple % of the largest value to map colors (

=B1 / MAX(B:B)

Color bucket calculation

- name of the color "bucket" the date fits into so we can have fewer colors to work with (

=IFS(C1 = 0, "empty", C1 < 0.2, "lt20", C1 < 0.4, "lt40", C1 < 0.6, "lt60", C1 < 0.8, "lt80", TRUE, "lt100")

Example code

View example code

style

article

.calendar-grid

/* sizing */

--cell-width

--cell-height

--cell-gap

--month-height

calc

var

--cell-height

--calendar-label-size

/* colors */

--empty-color

var

--color-border1

--lt20

#c1e598

--lt40

#94d284

--lt60

#62bb6e

--lt80

#399d55

--lt100

#1a7d41

article

.calendar-grid

margin-top

article

.calendar-grid

.calendar-wrapper

display

flex

flex-direction

row

gap

article

.calendar-grid

list-style

none

margin

padding

article

.calendar-grid

ul li

list-style

none

margin

padding

color

var

--color-text1

article

.calendar-grid

.labels

display

grid

grid-template-rows

var

--cell-height

repeat

gap

var

--cell-gap

var

--cell-gap

& li

display

flex

align-items

center

text-align

center

justify-content

center

font-size

var

--calendar-label-size

text-transform

uppercase

article

.calendar-grid

.calendar

display

grid

grid-template-columns

repeat

var

--cell-width

grid-auto-flow

row

grid-auto-columns

min-content

gap

var

--cell-gap

width

& li

border-radius

width

var

--cell-width

height

var

--cell-height

display

flex

align-items

center

justify-content

center

position

relative

font-size

var

--calendar-label-size

font-weight

bold

color

var

--color-text4

& li

.heading

width

var

--cell-width

font-size

var

--calendar-label-size

text-transform

uppercase

text-align

center

justify-content

center

& li

.last-year

visibility

hidden

& li

.empty

background

var

--empty-color

& li

.lt20

background

var

--lt20

& li

.lt40

background

var

--lt40

& li

.lt60

background

var

--lt60

& li

.lt80

background

var

--lt80

& li

.lt100

background

var

--lt100

& li

.tooltip-content

visibility

hidden

position

absolute

z-index

bottom

left

transform

translateX

-50

width

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

opacity

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

& li

.tooltip-content

::after

content

position

absolute

top

left

margin-left

border-width

border-style

solid

border-color

#333

transparent

transparent

transparent

& li

:hover

.tooltip-content

visibility

visible

opacity

article

.calendar-grid

.legend

font-size

var

--calendar-label-size

text-transform

uppercase

display

flex

flex-direction

row

align-items

center

justify-content

flex-start

gap

var

--cell-gap

padding-top

& li

.legend-item

border

solid

rgba

0.1

width

min

var

--cell-width

var

--cell-height

height

min

var

--cell-width

var

--cell-height

& li

.empty

background

var

--empty-color

& li

.lt20

background

var

--lt20

& li

.lt40

background

var

--lt40

& li

.lt60

background

var

--lt60

& li

.lt80

background

var

--lt80

& li

.lt100

background

var

--lt100

& li

:first-of-type

padding-left

var

--cell-width

padding-right

& li

:last-of-type

padding-left

style

article

class

calendar-grid

2024 {{fields.order_items.total_sale_price.label}} {{#filters.users.state.value}}for {{filters.users.state.value}}{{/filters.users.state.value}} by day

div

class

calendar-wrapper

class

labels

Jan

Feb

Mar

Apr

May

Jun

Jul

Aug

Sep

Oct

Nov

Dec

class

calendar

class

heading

class

heading

class

heading

class

heading

class

heading

class

heading

class

heading

class

Sunday last-year

<!-- placeholder to ensure 2024 starts on correct day of week -->

{{#result}}

class

month-day-{{order_items.created_at[day_of_month].raw}} {{calc_2.value_static}}

div

class

tooltip-content

{{order_items.created_at[date].value_static}}

{{order_items.total_sale_price.value}}

div

{{/result}}

div

class

legend

class

legend-label

Less

class

legend-item empty

class

legend-item lt20

class

legend-item lt40

class

legend-item lt60

class

legend-item lt80

class

legend-item lt100

class

legend-label

More

article

Single month heatmap

Fills a single month like a typical wall calendar, correctly laying out the days of the week no matter the month. Also adds a little

marker on today, if it is in view.

Setup

This example uses a lot of calculations make the drawing of any month possible. When referencing calculations in mustache, you need to use the ID of the field, which will automatically be assigned to the calculation when you create it. For example, the first calc you create will have the ID of

calc_1

, the second

calc_2

, etc. In the example query, the calc ID has been provided as part of the label so you can more easily connect the references to the calculation in the markdown code. When you create your own calculations, they may have different IDs.

Note:

Make sure to have "fill in missing rows" turned on for

Date

Day of month

and the

Day of week

columns in order to correctly display the full month.

Col

Name

Calculation formula

Purpose

Date

query data

Day of month

query data

Number in the calendar cell

Day of week num

query data

Need to know which day of week to start on

adjusted DoW num (calc_3)

=MOD(C1, 7) + 1

Our data starts counting week on Mondays. This adjusts the start day of the week to Sunday.

Users

query data

metric used to base color off of

pct of max (calc_1)

=E1 / MAX(E

create range for easy bucketing

color class (calc_4)

=IFS(F1 = 0, "empty", F1 < 0.2, "lt20", F1 < 0.4, "lt40", F1 < 0.6, "lt60", F1 < 0.8, "lt80", TRUE, "lt100")

define bucket ranges to simplify coloring

heading (calc_2)

=TEXT(A1, "mmmm yyyy")

nice formatting of the month for the heading

today (calc_5)

=IF(A1 = TODAY(), "today", "")

which cell to put a little "today" indicator

Example code

View example code

style

article

.calendar-grid

/* sizing */

--cell-width

--cell-height

--cell-gap

--calendar-label-size

/* colors */

--empty-color

var

--color-background-alt

--lt20

#b8c7e0

--lt40

#88b3d6

--lt60

#549fc8

--lt80

#258bab

--lt100

#077b7e

width

fit-content

margin

auto

article

.calendar-grid

margin

font-size

var

--font-sm

article

.calendar-grid

list-style

none

margin

padding

article

.calendar-grid

ul li

list-style

none

margin

padding

article

.calendar-grid

.calendar

display

grid

grid-template-columns

repeat

var

--cell-width

grid-auto-flow

row

grid-auto-columns

min-content

gap

var

--cell-gap

width

& li

border-radius

border

solid

rgba

0.1

width

var

--cell-width

height

var

--cell-height

display

flex

align-items

center

justify-content

center

position

relative

color

black

& li

.heading

width

var

--cell-width

font-size

var

--calendar-label-size

text-transform

uppercase

text-align

center

align-items

flex-end

color

var

--color-text1

border-width

:nth-of-type

/* adjusted DoW number: This is what gets us starting on the right day of the week */

grid-column-start:

result.0.calc_3.raw

& li span

.date

font-size

var

--calendar-label-size

font-weight

normal

display

flex

width

height

line-height

var

--cell-height

justify-content

center

text-align

center

align-items

center

& li

.empty

background

var

--empty-color

& li

.today

xborder-color

rgba

0.5

& li

.today

::before

content

"•"

position

absolute

bottom

& li

.today

.empty

color

var

--color-text1

& li

.lt20

background

var

--lt20

& li

.lt40

background

var

--lt40

& li

.lt60

background

var

--lt60

& li

.lt80

background

var

--lt80

color

white

& li

.lt100

background

var

--lt100

color

white

& li

.tooltip-content

visibility

hidden

position

absolute

z-index

bottom

left

transform

translateX

-50

width

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

opacity

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

text-transform

lowercase

& li

.tooltip-content

::after

content

position

absolute

top

left

margin-left

border-width

border-style

solid

border-color

#333

transparent

transparent

transparent

& li

:hover

.tooltip-content

visibility

visible

opacity

article

.calendar-grid

.legend

font-size

var

--calendar-label-size

text-transform

uppercase

display

flex

flex-direction

row

align-items

center

justify-content

flex-start

gap

var

--cell-gap

padding-top

& li

.legend-item

border

solid

rgba

0.1

width

height

& li

.empty

background

var

--empty-color

& li

.lt20

background

var

--lt20

& li

.lt40

background

var

--lt40

& li

.lt60

background

var

--lt60

& li

.lt80

background

var

--lt80

& li

.lt100

background

var

--lt100

& li

.legend-more

padding-left

color

var

--color-text1

& li

.legend-today

padding-left

color

var

--color-text1

style

article

class

calendar-grid

{{result._first.calc_2.value}} • {{fields.users.count.label}}

div

class

calendar-wrapper

class

calendar

class

heading

class

heading

class

heading

class

heading

class

heading

class

heading

class

heading

{{#result}}

class

{{calc_5.raw}} {{calc_4.value_static}}

span

class

date

{{users.created_at[day_of_month].value}}

span

div

class

tooltip-content

{{users.count.value}}

{{fields.users.count.label}}

div

{{/result}}

div

class

legend

class

legend-item empty

class

legend-item lt20

class

legend-item lt40

class

legend-item lt60

class

legend-item lt80

class

legend-item lt100

class

legend-more

More {{fields.users.count.label}}

class

legend-today

• today

article

Full year calendar

Setup

Example code

Full year calendar, vertical

Setup

Example code

Single month heatmap

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/calendar-heatmaps](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/calendar-heatmaps) on 2025-07-23.*
