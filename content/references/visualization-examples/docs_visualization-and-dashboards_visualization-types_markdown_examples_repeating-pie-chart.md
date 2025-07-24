# Repeating pie charts Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-pie-chart](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-pie-chart)  
**Extracted:** 2025-07-23 21:45:16  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a series of pie charts, one for each row in your results. Pies will automatically adjust size and wrap to the next line.

Setup

These charts use the Mustache iterator syntax to draw a shape for each row in the results. Your query should have a dimension that determines the number of pies and their labels and the values for the numerator and denominator to calculate the percentage fill. Then you'll need to add a few calculations. The following table explains each field used in the example, including the calculation formulas.

Col

Name

Description or formula

Purpose

Category

query field

determines number of pies to make and their labels

Products Count

query field

denominator for % calculation

Products over $50

query field

numerator for % calculation

% over $50 (

calc_1

=C1 / B1

calculation for filling pie, label

rotation (

calc_4

=D1 * 360

calculation to get the degrees for drawing pie slice

label pos (

calc_5

=IF(D1 < 0.5, "left", "right")

calculation to help position and color the label

Example code

style

margin-top

.pie-party

--plate-color

var

--color-border2

--slice-color

var

--color-info

& ul

list-style

none

margin

padding

display

grid

grid-template-columns

repeat

auto-fit

minmax

gap

var

--size4

& li

list-style

none

margin

padding

& p

margin

padding

.pie-plate

aspect-ratio

background-color

var

--plate-color

margin

auto

border-radius

display

flex

align-items

center

justify-content

center

width

overflow

hidden

.pie-slice

width

height

position

relative

list-style

none

margin

padding

& span

display

block

font-size

var

--font-xxs

font-variant-numeric

tabular-nums

width

padding-right

line-height

var

--line-height-xxs

position

absolute

& span

.left

text-align

left

top

right

color

var

--color-text2

& span

.right

top

left

calc

text-align

right

color

var

--color-text-inverse

& p

.label

text-align

center

style

article

class

pie-party

% of products over $50

{{#result}}

div

class

pie-plate

class

pie-slice

style

background-image: conic-gradient

from 0deg

var

--slice-color

calc_4.value

deg

transparent

span

class

{{calc_5.value}}

{{calc_1.value}}

span

div

class

label

{{products.category.value}}

{{/result}}

article

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-pie-chart](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-pie-chart) on 2025-07-23.*
