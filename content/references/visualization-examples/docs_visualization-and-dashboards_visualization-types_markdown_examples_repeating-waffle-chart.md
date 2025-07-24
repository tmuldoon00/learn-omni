# Repeating waffle charts Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-waffle-chart](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-waffle-chart)  
**Extracted:** 2025-07-23 21:45:17  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a series of percentage-filled waffle charts, one for each row in your results. Squares will automatically adjust size and wrap to the next line.

Setup

These charts use the Mustache iterator syntax to draw a shape for each row in the results. Your query should have a dimension that determines the number of pies and their labels and the values for the numerator and denominator to calculate the percentage fill. Then you'll need to add a lot calculations. The following table explains each field used in the example, including the calculation formulas.

This chart is a bit crazy. We're not actually drawing 100 tiny squares for each waffle shape, but instead filling 10 bars per waffle and drawing some dividers on top of them to simulate a waffle.

Col

Name

Description or formula

Purpose

Category

query field

determines number of waffles to make and their labels

Products Count

query field

denominator for % calculation

Products over $50

query field

numerator for % calculation

% over $50 (

calc_1

=C1 / B1

calculation for filling waffle squares, label

1s (

calc_5

=IF(D1 >= 10, 100, 10 * D1)

how far to fill the 1s bar

10s (

calc_6

=IF(D1 >= 20, 100, MAX(0, (D1 - 10)) * 10)

how far to fill the 10s bar

20s (

calc_7

=IF(D1 >= 30, 100, MAX(0, (D1 - 20)) * 10)

how far to fill the 20s bar

30s (

calc_8

=IF(D1 >= 40, 100, MAX(0, (D1 - 30)) * 10)

how far to fill the 30s bar

40s (

calc_9

=IF(D1 >= 50, 100, MAX(0, (D1 - 40)) * 10)

how far to fill the 40s bar

50s (

calc_10

=IF(D1 >= 60, 100, MAX(0, (D1 - 50)) * 10)

how far to fill the 50s bar

60s (

calc_11

=IF(D1 >= 70, 100, MAX(0, (D1 - 60)) * 10)

how far to fill the 60s bar

70s (

calc_12

=IF(D1 >= 80, 100, MAX(0, (D1 - 70)) * 10)

how far to fill the 70s bar

80s (

calc_13

=IF(D1 >= 90, 100, MAX(0, (D1 - 80)) * 10)

how far to fill the 80s bar

90s (

calc_14

=IF(D1 >= 100, 100, MAX(0, (D1 - 90)) * 10)

how far to fill the 90s bar

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

& p

list-style

none

margin

padding

.big-box

--grid-background-color

var

--color-background

width

aspect-ratio

position

relative

display

grid

grid-template-rows

repeat

gap

.big-box

background-color

var

--color-border2

width

position

relative

.row-fill

background-color

var

--color-info

display

block

height

.row-dividers

position

absolute

width

height

top

left

background-image

linear-gradient

deg

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

transparent

transparent

var

--grid-background-color

var

--grid-background-color

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

span

class

row-fill

style

width:

calc_14.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_13.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_12.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_11.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_10.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_9.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_8.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_7.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_6.value

span

span

class

row-dividers

span

class

span

class

row-fill

style

width:

calc_5.value

span

span

class

row-dividers

span

div

class

label

span

{{products.category.value}}

&nbsp;

&nbsp;

{{calc_1.value}}%

span

{{/result}}

article

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-waffle-chart](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/repeating-waffle-chart) on 2025-07-23.*
