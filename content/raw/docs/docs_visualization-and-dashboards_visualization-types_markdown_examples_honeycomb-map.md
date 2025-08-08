# Honeycomb map Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-map](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-map)  
**Extracted:** 2025-07-23 21:45:10  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a stylized map of the United States.

Setup

This example requires your data be sorted alphabetically by state name, as individual cell positions are referenced to set the cell color. This dataset did not, unfortunately, include Hawaii.

Depending on your data, you may need to manually adjust cell references to ensure that the value for coloring is correctly assigned.

Col

Name

Description or formula

State

must be sorted A to Z

Users Count

value for color coding

Categorize values (

calc_1

=IF(B1 > (0.8 * MAX(B

)), "p80", IF(B1 > (0.6 * MAX(B

)), "p60", IF(B1 > (0.4 * MAX(B

)), "p40", IF(B1 > (0.2 * MAX(B

)), "p20", "p0"))))

Example code

style

.honeycomb

--hc-width

--hc-height

calc

1.1547

var

--hc-width

/* 1.1547 ~= 2/sqrt(3) */

--hc-gap

width

margin

auto

padding

list-style

none

display

flex

flex-direction

column

& li

margin

padding

display

flex

gap

var

--hc-gap

margin-top

calc

var

--hc-height

& li

:nth-of-type

margin-left

calc

var

--hc-width

var

--hc-gap

& li

:first-of-type

margin-top

.hex

box-sizing

content-box

width

var

--hc-width

height

var

--hc-height

clip-path

polygon

display

flex

justify-content

center

align-items

center

text-align

center

font-size

font-weight

bold

text-transform

uppercase

background-color

var

--color-border1

.hex

:empty

background-color

transparent

& li

.hc-legend

margin-top

padding-block

var

--size8

var

--size2

gap

var

--size6

justify-content

center

div

display

flex

flex-direction

row

gap

var

--size2

align-items

center

font-size

var

--font-xs

.hc-legend-swatch

display

block

border-radius

var

--radius-sm

width

var

--size4

height

var

--size4

.p80

background-color

#44337D

color

white

.p60

background-color

#306C8C

color

white

.p40

background-color

#219D8A

color

white

.p20

background-color

#63C960

color

#333

.p0

background-color

#D7E225

color

#333

.nodata

background-color

var

--color-border2

style

class

honeycomb

row1

div

class

hex {{result.1.calc_1.value}}

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex {{result.18.calc_1.value}}

div

row2

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex {{result.44.calc_1.value}}

div

div

class

hex {{result.28.calc_1.value}}

div

row3

div

class

hex

div

div

class

hex {{result.46.calc_1.value}}

div

div

class

hex {{result.25.calc_1.value}}

div

div

class

hex {{result.33.calc_1.value}}

div

div

class

hex {{result.22.calc_1.value}}

div

div

class

hex {{result.48.calc_1.value}}

div

div

class

hex

div

div

class

hex {{result.21.calc_1.value}}

div

div

class

hex

div

div

class

hex {{result.31.calc_1.value}}

div

div

class

hex {{result.20.calc_1.value}}

div

div

class

hex {{result.38.calc_1.value}}

div

row4

div

class

hex

div

div

class

hex {{result.11.calc_1.value}}

div

div

class

hex {{result.49.calc_1.value}}

div

div

class

hex {{result.40.calc_1.value}}

div

div

class

hex {{result.14.calc_1.value}}

div

div

class

hex {{result.12.calc_1.value}}

div

div

class

hex {{result.13.calc_1.value}}

div

div

class

hex {{result.34.calc_1.value}}

div

div

class

hex {{result.37.calc_1.value}}

div

div

class

hex {{result.29.calc_1.value}}

div

div

class

hex {{result.6.calc_1.value}}

div

div

class

hex

div

row5

div

class

hex

div

div

class

hex {{result.36.calc_1.value}}

div

div

class

hex {{result.27.calc_1.value}}

div

div

class

hex {{result.5.calc_1.value}}

div

div

class

hex {{result.26.calc_1.value}}

div

div

class

hex {{result.24.calc_1.value}}

div

div

class

hex {{result.16.calc_1.value}}

div

div

class

hex {{result.47.calc_1.value}}

div

div

class

hex {{result.9.calc_1.value}}

div

div

class

hex {{result.19.calc_1.value}}

div

div

class

hex {{result.7.calc_1.value}}

div

div

class

hex

div

row6

div

class

hex

div

div

class

hex {{result.4.calc_1.value}}

div

div

class

hex {{result.43.calc_1.value}}

div

div

class

hex {{result.30.calc_1.value}}

div

div

class

hex {{result.15.calc_1.value}}

div

div

class

hex {{result.3.calc_1.value}}

div

div

class

hex {{result.41.calc_1.value}}

div

div

class

hex {{result.39.calc_1.value}}

div

div

class

hex {{result.32.calc_1.value}}

div

div

class

hex {{result.45.calc_1.value}}

div

div

class

hex

div

div

class

hex

div

row7

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex {{result.2.calc_1.value}}

div

div

class

hex {{result.36.calc_1.value}}

div

div

class

hex {{result.17.calc_1.value}}

div

div

class

hex {{result.23.calc_1.value}}

div

div

class

hex {{result.1.calc_1.value}}

div

div

class

hex {{result.10.calc_1.value}}

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

row8

div

class

hex nodata

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex {{result.42.calc_1.value}}

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

div

class

hex {{result.9.calc_1.value}}

div

div

class

hex

div

div

class

hex

div

div

class

hex

div

class

hc-legend

div

span

class

hc-legend-swatch p80

span

span

class

hc-legend-label

Most

span

div

div

span

class

hc-legend-swatch p60

span

span

class

hc-legend-label

More

span

div

div

span

class

hc-legend-swatch p40

span

span

class

hc-legend-label

Medium

span

div

div

span

class

hc-legend-swatch p20

span

span

class

hc-legend-label

Less

span

div

div

span

class

hc-legend-swatch p0

span

span

class

hc-legend-label

Least

span

div

div

span

class

hc-legend-swatch nodata

span

span

class

hc-legend-label

No data

span

div

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-map](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-map) on 2025-07-23.*
