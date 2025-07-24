# Gauge Markdown visualizations

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/gauge](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/gauge)  
**Extracted:** 2025-07-23 21:45:08  
**Source:** Omni Analytics Documentation

---

On this page

The code for these examples can be used in the

Markdown visualization

to create gauges, or speedometer charts, that show where a single value falls in a predefined range.

Basic gauge

Example code

View example code

style

.gauge-chart

/* colors */

--track-color

var

--color-border1

--fill-color

var

--color-info

--mask-color

var

--color-background

/* dimensions */

--chart-size

--minmax-offset

var

--size2

--track-width-ratio

.70

--track-size

var

--chart-size

--mask-track-size

calc

var

--track-size

var

--track-width-ratio

/* values */

--fill-rotation: calc

result._first.calc_5.value

deg

display

flex

flex-direction

column

align-items

center

justify-content

center

gap

var

--size1

height

.gauge-wrapper

width

var

--chart-size

height

calc

var

--chart-size

overflow

hidden

.gauge

width

var

--chart-size

height

var

--chart-size

position

relative

list-style

none

margin

padding

.center

border-radius

position

absolute

top

left

transform

translate

-50

-50

.track

background-color

var

--track-color

width

var

--track-size

height

var

--track-size

.fill

width

var

--track-size

height

var

--track-size

background-image

conic-gradient

from

-90

deg

var

--fill-color

var

--fill-rotation

transparent

.mask

background-color

var

--mask-color

width

var

--mask-track-size

height

var

--mask-track-size

.metric

position

absolute

bottom

text-align

center

width

.metric-label

padding

margin

.metric-value

padding

margin

line-height

font-size

font-weight

.footer

width

var

--chart-size

display

flex

flex-direction

row

justify-content

space-between

color

var

--color-text1

& p

--label-width

calc

calc

var

--track-width-ratio

var

--chart-size

width

var

--label-width

text-align

center

margin

.legend

width

var

--chart-size

display

flex

flex-direction

row

font-size

var

--font-xs

align-items

center

justify-content

center

gap

var

--size1

color

var

--color-text1

padding-top

var

--size1

& p

margin

style

div

class

gauge-chart

div

class

gauge-wrapper

class

gauge

class

center track

class

center fill

class

center mask

class

metric

class

metric-label

{{fields.order_items.total_sale_price.label}}

class

metric-value

{{result._first.order_items.total_sale_price.value}}

div

div

class

footer

{{result._first.calc_4.value}}

div

div

Gauge with context

Setup

This markdown in this example references a lot of calculations to position and style elements. Below is a screenshot of the query as a reference.

Example code

View example code

style

.gauge-chart

/* colors */

--track-color

var

--color-border1

--fill-color

var

--color-info

--mask-color

var

--color-background

--minmax-color

color-mix

in srgb

var

--fill-color

transparent

--avg-color

color-mix

in srgb

var

--fill-color

black

/* dimensions */

--chart-size

--minmax-offset

var

--size2

--track-width-ratio

.70

--minmax-outer-size

var

--chart-size

--track-size

calc

var

--chart-size

var

--minmax-offset

--mask-track-size

calc

var

--track-size

var

--track-width-ratio

--minmax-inner-size

var

--mask-track-size

--mask-minmax-size

calc

var

--minmax-inner-size

var

--minmax-offset

/* values */

--fill-rotation: calc

result._first.calc_5.value

deg

--min-rotation: calc

result._first.calc_6.value

deg

--avg-rotation: calc

result._first.calc_8.value

deg

--max-rotation: calc

result._first.calc_7.value

deg

display

flex

flex-direction

column

align-items

center

justify-content

center

gap

var

--size1

height

.gauge-wrapper

width

var

--chart-size

height

calc

var

--chart-size

overflow

hidden

.gauge

width

var

--chart-size

height

var

--chart-size

position

relative

list-style

none

margin

padding

.center

border-radius

position

absolute

top

left

transform

translate

-50

-50

.track

background-color

var

--track-color

width

var

--track-size

height

var

--track-size

.fill

width

var

--track-size

height

var

--track-size

background-image

conic-gradient

from

-90

deg

var

--fill-color

var

--fill-rotation

transparent

.minmax

border-radius

background-image

conic-gradient

from

-90

deg

transparent

var

--min-rotation

var

--minmax-color

var

--min-rotation

var

--minmax-color

var

--avg-rotation

var

--avg-color

var

--avg-rotation

var

--avg-color

calc

var

--avg-rotation

deg

var

--minmax-color

calc

var

--avg-rotation

deg

var

--minmax-color

var

--max-rotation

transparent

.minmax

.minmax-outer

width

var

--minmax-outer-size

height

var

--minmax-outer-size

.minmax

.minmax-inner

width

var

--minmax-inner-size

height

var

--minmax-inner-size

.mask

background-color

var

--mask-color

.mask

.mask-track

width

var

--mask-track-size

height

var

--mask-track-size

.mask

.mask-minmax

width

var

--mask-minmax-size

height

var

--mask-minmax-size

.metric

position

absolute

bottom

text-align

center

width

.metric-label

padding

margin

.metric-value

padding

margin

line-height

font-size

color

var

--fill-color

font-weight

.footer

width

var

--chart-size

display

flex

flex-direction

row

justify-content

space-between

color

var

--color-text1

& p

--label-width

calc

calc

var

--track-width-ratio

var

--chart-size

width

var

--label-width

text-align

center

margin

.legend

width

var

--chart-size

display

flex

flex-direction

row

font-size

var

--font-xs

align-items

center

justify-content

center

gap

var

--size1

color

var

--color-text1

padding-top

var

--size1

& p

margin

.legend-title

padding-right

var

--size4

.legend-avg

margin-left

var

--size6

width

var

--size05

height

var

--size4

background-color

var

--avg-color

.legend-minmax

width

var

--size4

height

var

--size4

background-color

var

--minmax-color

display

inline-block

style

div

class

gauge-chart

div

class

gauge-wrapper

class

gauge

class

center track

class

center fill

class

center minmax minmax-outer

class

center mask mask-track

class

center minmax minmax-inner

class

center mask mask-minmax

class

metric

class

metric-label

{{fields.order_items.total_sale_price.label}}

class

metric-value

{{result._first.order_items.total_sale_price.value}}

div

div

class

footer

{{result._first.calc_4.value}}

div

div

class

legend

class

legend-title

Last 7 days

class

legend-minmax

class

legend-value

{{result._first.calc_2.value}} min

&mdash;

{{result._first.calc_3.value}} max

class

legend-avg

class

legend-value

{{result._first.calc_1.value}} avg

div

div

Basic gauge

Example code

Gauge with context

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/gauge](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/gauge) on 2025-07-23.*
