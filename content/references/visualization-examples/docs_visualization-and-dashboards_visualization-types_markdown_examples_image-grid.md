# Image grid Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/image-grid](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/image-grid)  
**Extracted:** 2025-07-23 21:45:11  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a grid of images, each of which contains a description and metric.

Example code

style

.product-image-grid

display

grid

grid-template-columns

repeat

gap

.product-image-item

display

flex

flex-direction

column

gap

.product-image

background-size

cover

background-position

center

height

position

relative

.product-rank-number

padding

position

absolute

top

left

background

var

--color-surface-invert

color

var

--color-text-inverse

.product-name

font-size

margin

.product-compare

align-items

center

display

flex

font-size

gap

font-weight

style

### Top Products This Month

div

class

product-image-grid

{{#result}}

div

class

product-image-item

section

class

product-image

style

background-image

url

https://{{product_images.image.value_static}}

class

product-rank-number

{{sale_price_sum_rank.value}}

section

section

class

product-compare

{{order_items.sale_price_sum.value_static}}

ChangeArrow

current

{{order_items.sale_price_sum.value_static}}

comparison

{{order_items.sale_price_sum_1.value_static}}

ChangeArrow

section

class

product-name

{{products.name.value_static}}

div

{{/result}}

div

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/image-grid](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/image-grid) on 2025-07-23.*
