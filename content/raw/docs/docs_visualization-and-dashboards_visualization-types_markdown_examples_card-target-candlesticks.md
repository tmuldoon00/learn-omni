# Card with target candlesticks Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-target-candlesticks](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-target-candlesticks)  
**Extracted:** 2025-07-23 21:45:05  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create cards with conditional coloring, based on the current value versus the target.

In this visualization, the card is green if the KPI at or beating target and red if not.

Setup

This markdown in this example complex and references a lot of calculations to position and style elements. Use this sample dataset, instructions, and code to recreate this example in your own instance.

Download the sample CSV

Upload the sample CSV to your instance. Refer to the

Data input tables guide

for instructions.

In a new query tab, select all fields except

Candlesticks Count

Format the fields as follows:

Currency

Total Sales

and

Target Sales

Percent

Progress Bar Value

Progress Bar Target

From Target

Candle Value

Candle Target

Change Py

, and

Change Pm

Format

Created At Month

to the month abbreviation with 2 digits for the year.

Sort the query so the most recent month in the data set,

Feb 25

, is first.

Your query should look like this:

You can now click

Chart

and select the

Markdown

chart type. Copy and paste the sample code below into the markdown editor.

Note:

To recreate this with your own data set, you'll need a to create your own calculations for most fields. The formulas below refer to the column positions in the screenshot above:

Col

Name

Calculation formula

Purpose

Progress Bar Range

=MAX(B1, C1)

Denominator for the progress bar

Progress Bar Value

=B1 / D1

% fill for the progress bar

Progress Bar Target

=C1 / D1

% position for the target mark

Delta From Target

=B1 - C1

value change from target

% From Target

=G1 / C1

% change from target (used in up/down arrows )

Delta Direction

=IF(G1 >= 0, "pos", "neg")

class name used to color the card header, progress bars and candle dots

12mo Min

=MIN(B

smallest of all the Total Sales and Target values

12mo Max

=MAX(B

largest of all the Total Sales and Target values

12mo Range

=K1 - J1

the denominator for all the candle position calculations

Candle Value

=(B1 - J1) / L1

% fill for each candle

Candle Target

=(C1 - J1) / L1

% position for each candle target mark

% Change Py

=(B1 - B13) / B13

% change from previous year (used in up/down arrows)

Py Direction

=IF(O1 >= 0, "pos", "neg")

class name used to point previous year change arrow up or down

% Change Pm

=(B1 - B2) / B2

% change from previous month (used in up/down arrows)

Pm Direction

=IF(Q1 >= 0, "pos", "neg")

class name used to point previous month change arrow up or down

Example code

style

.card

--color-pos

#6BABB4

--color-neg

#D64467

/* --color-fill does the primary card and progress bar coloring */

--color-fill: var

--color-

result._first.candlesticks.delta_direction.value_static

--card-inline-padding

var

--size4

background

var

--color-background

border

solid

var

--color-border2

border-radius

var

--radius-lg

display

flex

flex-direction

column

height

overflow

hidden

& h2

margin

padding

var

--size2

var

--card-inline-padding

font-size

var

--font-md

color

white

background

var

--color-fill

.card-body

padding

var

--size2

var

--card-inline-padding

.card-kpi

padding-block

var

--size4

& h3

margin

font-size

var

--font-xxl

& h4

margin

font-size

var

--font-sm

& span

font-size

var

--font-xs

font-variation-settings

"wght"

.card-progress

height

position

relative

padding

/* Since we are using the first row values for the big horizontal progress bar

we can hard code the progress bar width and target mark in the css */

.progress-bar

background-color

var

--color-fill

width:

result._first.candlesticks.progress_bar_value.value_static

height

.progress-target

width

height

background

var

--color-text4

position

absolute

top

left: calc

result._first.candlesticks.progress_bar_target.value_static

.card-compare

list-style

none

margin

padding

var

--size2

display

flex

flex-direction

row

justify-content

space-between

align-items

center

& li

display

grid

grid-template-columns

min-content

gap

var

--size2

.up

color

var

--color-text-inverse

background

var

--color-surface-invert

width

height

text-align

center

border-radius

grid-row

.down

color

var

--color-text-inverse

background

var

--color-surface-invert

width

height

text-align

center

border-radius

grid-row

.compare-change

font-variation-settings

"wght"

line-height

var

--line-height-xs

.compare-label

font-size

var

--font-xs

& li

.pos

.up

display

inline-block

.down

display

none

& li

.neg

.up

display

none

.down

display

inline-block

.card-columns

list-style

none

margin

padding

var

--size6

display

flex

flex-direction

row-reverse

justify-content

space-between

& li

display

flex

flex-direction

column

gap

width

& li

:last-of-type

/* If you don't want to include the previous year, hide it! */

display

none

.column-progress

height

display

flex

flex-direction

column-reverse

align-items

center

position

relative

.column-progress-bar

background

var

--color-foreground4

width

display

block

.column-progress-target

height

width

background

var

--color-text4

position

absolute

.column-dot

background

var

--color-background-alt

width

height

border-radius

display

inline-block

margin

.neg

.column-dot

background

var

--color-neg

.pos

.column-dot

background

var

--color-pos

.column-date

transform

rotate

-90

deg

transform-origin

top left

display

inline-block

font-size

var

--font-xxs

width

height

top

position

relative

text-align

right

style

article

class

card {{result._first.candlesticks.delta_direction.value_static}}

Category

section

class

card-body

section

class

card-kpi

{{result._first.candlesticks.total_sales.value}}

span

vs target

span

{{result._first.candlesticks.target.value}}

section

section

class

card-progress

div

class

progress-bar

div

div

class

progress-target

div

section

class

card-compare

class

{{result._first.candlesticks.delta_direction.value_static}}

span

class

down

&searr;

span

span

class

&nearr;

span

span

class

compare-change

{{result._first.candlesticks.__from_target.value}}

span

span

class

compare-label

vs target

span

class

{{result._first.candlesticks.pm_dir.value_static}}

span

class

down

&searr;

span

span

class

&nearr;

span

span

class

compare-change

{{result._first.candlesticks.__change_pm.value}}

span

span

class

compare-label

vs PM

span

class

{{result._first.candlesticks.py_direction.value_static}}

span

class

down

&searr;

span

span

class

&nearr;

span

span

class

compare-change

{{result._first.candlesticks.__change_py.value}}

span

span

class

compare-label

vs PY

span

class

card-columns

{{#result}}

class

{{candlesticks.delta_direction.value_static}}

span

class

column-progress

span

class

column-progress-bar

style

height:

candlesticks.candle_value.value_static

span

span

class

column-progress-target

style

bottom:

candlesticks.candle_target.value_static

span

span

span

class

column-dot

span

span

class

column-date

{{candlesticks.created_at_month.value}}

span

{{/result}}

section

article

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-target-candlesticks](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-target-candlesticks) on 2025-07-23.*
