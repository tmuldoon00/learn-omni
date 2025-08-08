# Metric tree Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/metric-tree](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/metric-tree)  
**Extracted:** 2025-07-23 21:45:14  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a tree of interdependent metrics.

Setup

This tree is highly customized to this exact tree shape. If you're willing to dig into some html/css it could be massaged to some other examples as well. It also leverages our sparkline component to draw the tiny chart. Below is the results set of sample data used to draw this tree.

Example code

style

.metric-tree

--node-gap

--node-width

--double-node-width

calc

var

--node-width

var

--node-gap

--connector-color

var

--color-border2

--connector-style

solid

--connector-width

--connector-radius

--connector-height

list-style

none

margin

padding

var

--size1

display

flex

flex-direction

column

& li

display

grid

justify-content

center

box-sizing

content-box

& li

.level1

grid-template-columns

var

--double-node-width

& li

.level2

grid-template-columns

repeat

var

--double-node-width

& li

.level3

grid-template-columns

repeat

var

--double-node-width

& li

.level4

grid-template-columns

repeat

var

--double-node-width

& li

.lines

.level1

grid-template-columns

calc

var

--double-node-width

& li

.lines

.level2

grid-template-columns

repeat

var

--double-node-width

& li

.lines

.level3

grid-template-columns

repeat

var

--double-node-width

& li

.lines

.line

height

var

--connector-height

position

relative

& li

.lines

.line

.line-before

content

width

var

--connector-width

height

background

var

--connector-color

position

absolute

left

calc

var

--connector-width

& li

.lines

.line

.line-after

content

border-color

var

--connector-color

border-style

var

--connector-style

border-width

var

--connector-width

var

--connector-width

var

--connector-width

border-radius

var

--connector-radius

var

--connector-radius

position

absolute

width

calc

var

--connector-width

height

bottom

left

calc

var

--connector-width

.metric-tree

article

.node

margin-inline

var

--node-gap

display

flex

flex-direction

column

justify-content

flex-end

border-color

var

--color-border1

border-radius

var

--connector-radius

border-width

border-style

var

--connector-style

.header

display

flex

flex-direction

column

padding

var

--size2

.graph

display

flex

flex-direction

row

justify-content

center

align-items

flex-end

.metric-tree

& h4

padding

margin

text-align

center

display

none

& h2

padding

margin

text-align

center

font-size

var

--font-lg

line-height

1.2

& h3

padding

margin

text-align

center

font-size

var

--font-sm

line-height

1.2

color

var

--color-text1

.disclaimer

padding

width

margin

auto

color

var

--color-text1

text-align

center

style

class

metric-tree

class

level1

article

class

node

div

class

header

{{fields.calc_1.label}}

Our most important metric

{{result._totals._first.calc_1.value}}

div

div

class

graph

sparkline

field

calc_1

height

width

type

area

color

#78A851

show-axis

sparkline

div

article

class

level1 lines

div

class

line

span

class

line-before

span

span

class

line-after

span

div

class

level2

article

class

node

div

class

header

{{fields.order_items.total_sale_price.label}}

Money from customers

{{result._totals._first.order_items.total_sale_price.value}}

div

div

class

graph

sparkline

field

order_items.total_sale_price

height

width

type

area

color

#5D6471

show-axis

sparkline

div

article

article

class

empty

article

article

class

node

div

class

header

{{fields.inventory_items.cost_sum.label}}

Money we pay out

{{result._totals._first.inventory_items.cost_sum.value}}

div

div

class

graph

sparkline

field

inventory_items.cost_sum

height

width

type

area

color

#FF6161

show-axis

sparkline

div

article

class

level2 lines

div

class

line

span

class

line-before

span

span

class

line-after

span

div

article

class

empty

article

div

class

line

span

class

line-before

span

span

class

line-after

span

div

class

level3

article

class

node

div

class

header

{{fields.users.count.label}}

that actually purchased stuff

{{result._totals._first.users.count.value}}

div

div

class

graph

sparkline

field

users.count

height

width

type

bar

color

#5D6471

show-axis

sparkline

div

article

article

class

node

div

class

header

{{fields.order_items.sale_price_average.label}}

per order

{{result._totals._first.order_items.sale_price_average.value}}

div

div

class

graph

sparkline

field

order_items.sale_price_average

height

width

type

line

color

#5D6471

show-axis

sparkline

div

article

article

class

node

div

class

header

{{fields.calc_2.label}}

What it took to make the stuff

{{result._totals._first.calc_2.value}}

div

div

class

graph

sparkline

field

calc_2

height

width

type

bar

color

#FF6161

show-axis

sparkline

div

article

article

class

node

div

class

header

{{fields.calc_3.label}}

Cost to move stuff around

{{result._totals._first.calc_3.value}}

div

div

class

graph

sparkline

field

calc_3

height

width

type

bar

color

#FF6161

show-axis

sparkline

div

article

class

level3 lines

div

class

line

span

class

line-before

span

span

class

line-after

span

div

class

level4

article

class

node

div

class

header

{{fields.calc_4.label}}

to our website

{{result._totals._first.calc_4.value}}

div

div

class

graph

sparkline

field

calc_4

height

width

type

bar

color

#5D6471

show-axis

sparkline

div

article

article

class

node

div

class

header

{{fields.calc_5.label}}

Description

{{result._totals._first.calc_5.value}}

div

div

class

graph

sparkline

field

calc_5

height

width

type

line

color

#5D6471

show-axis

sparkline

div

article

class

disclaimer

This tree is highly customized to basically this exact metric tree shape. If you're willing to dig into some html/css it could be massaged to some other examples as well.

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/metric-tree](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/metric-tree) on 2025-07-23.*
