# Honeycomb categorical chart Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-categorical](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-categorical)  
**Extracted:** 2025-07-23 21:45:10  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a hexagonal grid with a label and value in each cell. Cells are colored by a categorical value, in this case by the gender majority per age. This chart uses the Mustache iterator syntax to draw a shape for each row in the results.

Setup

Your query should have a dimension that determines the number of hexagons, their labels and some way to determine color. The following table explains each field used in the example, including the calculation formulas.

Col

Name

Description or formula

Purpose

Age

query field

determines number of hexagons to make and their labels

Determine Gender Majority (

calc_1

=IF(PIVOTOFFSET(C1, 0, 0) - PIVOTOFFSET(C1, 0, 1) > 0, "female", "male")

more male or female calculation

Users Count

query field

values to count

Pivot

Gender

query field

breakdown

Example code

style

margin-block

margin-top

color

var

--color-text1

font-size

var

--font-sm

.honeycomb2

--hc-width

--hc-height

calc

1.1547

var

--hc-width

/* 1.1547 ~= 2/sqrt(3) */

--hc-gap

/* calculate width based on # of cells you want per row

will also need to adjust the css below for offsets */

width

calc

12.5

var

--hc-width

var

--hc-gap

margin

padding

list-style

none

display

flex

flex-wrap

wrap

flex-direction

row

gap

var

--hc-gap

& li

width

var

--hc-width

height

var

--hc-height

margin

padding

display

flex

background-color

var

--color-border1

clip-path

polygon

display

grid

grid-template-rows

margin-top

calc

var

--hc-height

.hex-label

text-align

center

font-size

width

.hex-value

display

flex

flex-direction

column

justify-content

flex-end

align-items

center

font-size

font-weight

bold

& li

.female

background-color

var

--color-critical4

& li

.male

background-color

var

--color-info4

/* # of cells */

& li

:nth-of-type

12n

margin-left

calc

var

--hc-width

var

--hc-gap

& li

:first-of-type

& li

:nth-of-type

24n

margin-left

& li

:nth-of-type

margin-top

style

Are there more male or female shoppers?

Broken down by age of shopper

class

honeycomb2

{{#result}}

class

{{calc_1.value}}

span

class

hex-value

{{users.age.value}}

span

span

class

hex-label

{{calc_1.value}}

span

{{/result}}

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-categorical](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/honeycomb-categorical) on 2025-07-23.*
