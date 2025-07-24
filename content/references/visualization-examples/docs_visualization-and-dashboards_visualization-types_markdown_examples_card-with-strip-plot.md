# Card with strip plot Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-with-strip-plot](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-with-strip-plot)  
**Extracted:** 2025-07-23 21:45:06  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a card with a strip plot:

Example query

The example code references a lot of calculations to position and style elements. Below is a screenshot of the query as a reference.

Example code

style

.tick-chart

display

grid

grid-template-columns

min-content

min-content

gap

var

--size2

align-items

center

height

var

--size8

.tick-label

font-size

var

--font-xxs

color

var

--color-text3

.min-label

text-align

right

.max-labell

text-align

left

.ticks

margin

padding

height

var

--size6

position

relative

list-style

none

& li

position

absolute

background-color

#4269D0

height

var

--size6

width

margin

padding

& li

.focus-tick

width

background-color

var

--color-text4

height

var

--size10

top

.compare-table

margin

var

--size4

padding

color

var

--color-text3

font-size

var

--font-xs

width

& td

border-bottom

solid

var

--color-border1

height

var

--size6

padding

.compare-label

width

.compare-value

padding-inline

var

--size2

text-align

right

.compare-change

width

var

--size5

.change-icon

height

var

--size5

width

var

--size5

display

none

.compare-change

.up

color

#3ca951

.up-arrow

display

flex

.compare-change

.down

color

#ff725c

.down-arrow

display

flex

.compare-change

.same

color

var

--color-text1

.no-change

display

flex

.last-row

border-bottom

.bignum

font-size

var

--font-sm

color

#4269D0

margin

font-size

var

--font-xl

color

var

--color-key

margin

color

var

--text4

font-weight

bold

.footnote

font-size

var

--font-xs

color

var

--color-text1

padding-block

var

--size1

style

div

class

bignum

Avg Sales Price

{{result._first.order_items.sale_price_average.value}}

div

table

class

compare-table

class

compare-label

1-week change

class

compare-value

{{result._first.calc_6.value}}

class

compare-change {{result._first.calc_9.value}}

span

class

change-icon up-arrow

svg

xmlns

http://www.w3.org/2000/svg

width

height

viewBox

0 0 24 24

fill

none

stroke

currentColor

stroke-width

1.5

stroke-linecap

round

stroke-linejoin

round

path

stroke

none

M0 0h24v24H0z

fill

none

path

M17 7l-10 10

path

M8 7l9 0l0 9

svg

span

span

class

change-icon down-arrow

svg

xmlns

http://www.w3.org/2000/svg

width

height

viewBox

0 0 24 24

fill

none

stroke

currentColor

stroke-width

1.5

stroke-linecap

round

stroke-linejoin

round

path

stroke

none

M0 0h24v24H0z

fill

none

path

M7 7l10 10

path

M17 8l0 9l-9 0

svg

span

span

class

change-icon no-change

svg

xmlns

http://www.w3.org/2000/svg

width

height

viewBox

0 0 24 24

fill

none

stroke

currentColor

stroke-width

1.5

stroke-linecap

round

stroke-linejoin

round

path

stroke

none

M0 0h24v24H0z

fill

none

path

M5 12l14 0

svg

span

class

compare-label

1-year change

class

compare-value

{{result._first.calc_7.value}}

class

compare-change {{result._first.calc_10.value}}

span

class

change-icon up-arrow

svg

xmlns

http://www.w3.org/2000/svg

width

height

viewBox

0 0 24 24

fill

none

stroke

currentColor

stroke-width

1.5

stroke-linecap

round

stroke-linejoin

round

path

stroke

none

M0 0h24v24H0z

fill

none

path

M17 7l-10 10

path

M8 7l9 0l0 9

svg

span

span

class

change-icon down-arrow

svg

xmlns

http://www.w3.org/2000/svg

width

height

viewBox

0 0 24 24

fill

none

stroke

currentColor

stroke-width

1.5

stroke-linecap

round

stroke-linejoin

round

path

stroke

none

M0 0h24v24H0z

fill

none

path

M7 7l10 10

path

M17 8l0 9l-9 0

svg

span

span

class

change-icon no-change

svg

xmlns

http://www.w3.org/2000/svg

width

height

viewBox

0 0 24 24

fill

none

stroke

currentColor

stroke-width

1.5

stroke-linecap

round

stroke-linejoin

round

path

stroke

none

M0 0h24v24H0z

fill

none

path

M5 12l14 0

svg

span

class

compare-label

4-week average

class

compare-value

{{result._first.calc_8.value}}

class

compare-change empty

class

last-row

class

compare-label

52-week average

class

compare-value

{{result._totals._first.order_items.sale_price_average.value}}

class

compare-change empty

table

div

class

tick-chart

div

class

tick-label min-label

{{result._first.calc_4.value}}

div

class

ticks

{{#result}}

style

left:

calc_1.value

{{/result}}

style

left:

result._first.calc_1.value

class

focus-tick

div

class

tick-label max-label

{{result._first.calc_5.value}}

div

div

div

class

footnote

52 week range

div

Example query

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-with-strip-plot](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-with-strip-plot) on 2025-07-23.*
