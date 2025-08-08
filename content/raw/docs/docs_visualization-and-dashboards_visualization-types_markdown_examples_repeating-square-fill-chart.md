# Repeating square fill charts Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-square-fill-chart](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-square-fill-chart)  
**Extracted:** 2025-07-23 21:45:17  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a series of percentage-filled squares, one for each row in your results. Squares will automatically adjust size and wrap to the next line.

Setup

These charts use the Mustache iterator syntax to draw a shape for each row in the results. Your query should have a dimension that determines the number of pies and their labels and the values for the numerator and denominator to calculate the percentage fill. Then you'll need to add a few calculations. The following table explains each field used in the example, including the calculation formulas.

Col

Name

Description or formula

Purpose

Category

query field

determines number of squares to make and their labels

Products Count

query field

denominator for % calculation

Products over $50

query field

numerator for % calculation

% over $50 (

calc_1

=C1 / B1

calculation for filling square, label

inside or outside (

calc_3

=IF(D1 < 0.1, "outside", "inside")

calculation to help position and color the label

square root (

calc_4

=SQRT(D1)

calculation to get the length of the side of the square

Example code

style

margin-top

.percent-fill-boxes

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

margin

padding

.big-box

width

aspect-ratio

background-color

var

--color-border2

position

relative

display

flex

flex-direction

column-reverse

.little-box

aspect-ratio

display

block

background-color

var

--color-info

position

relative

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

.inside

text-align

right

top

right

color

var

--color-text-inverse

.outside

top

calc

var

--line-height-xxs

right

text-align

left

color

var

--color-text2

& p

.label

text-align

left

style

article

class

percent-fill-boxes

% of products over $50

{{#result}}

div

class

big-box

class

little-box

style

width:

calc_4.value

span

class

{{calc_3.value}}

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

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-square-fill-chart](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-square-fill-chart) on 2025-07-23.*
