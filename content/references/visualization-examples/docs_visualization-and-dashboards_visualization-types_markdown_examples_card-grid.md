# Card grid Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-grid](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-grid)  
**Extracted:** 2025-07-23 21:45:05  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a grid of responsive cards with metrics and images:

Example dataset

Example code

style

/* https://play.tailwindcss.com/vHqt0FBGy8 */

.deals-container

display

grid

padding

1.5

rem

grid-template-columns

repeat

minmax

column-gap

1.5

rem

row-gap

rem

list-style

none

grid-template-columns

repeat

minmax

@media

min-width

grid-template-columns

repeat

minmax

@media

min-width

grid-template-columns

repeat

minmax

column-gap

rem

@media

min-width

grid-template-columns

repeat

minmax

column-gap

rem

@media

min-width

grid-template-columns

repeat

minmax

column-gap

rem

.deal-container

overflow

hidden

border-radius

0.75

rem

border

solid

#E5E7EB

list-style

none

.deal-header

display

flex

padding

1.5

rem

column-gap

rem

align-items

center

border-bottom

solid

rgb

0.05

background-color

#F9FAFB

.deal-logo

object-fit

cover

flex

none

border-radius

0.5

rem

border

solid

rgb

box-shadow

calc

rgb

width

rem

height

rem

background-color

#ffffff

.deal-name

font-size

rem

line-height

1.25

rem

font-weight

line-height

1.5

rem

color

#111827

.deal-details

padding-top

rem

padding-bottom

rem

padding-left

1.5

rem

padding-right

1.5

rem

margin-top

-0.75

rem

margin-bottom

-0.75

rem

border-top-width

border-color

#F3F4F6

font-size

0.875

rem

line-height

1.25

rem

line-height

1.5

rem

.deal-details-inner

display

flex

padding-top

0.3

rem

padding-bottom

0.3

rem

column-gap

rem

justify-content

space-between

/* Tailwind Helpers */

.-my-3

margin-top

-0.75

rem

margin-bottom

-0.75

rem

.flex

display

flex

.flex-row

flex-direction

row

.flex-col

flex-direction

column

.grid

display

grid

.h-12

height

rem

.w-12

width

rem

.flex-none

flex

none

.grid-cols-1

grid-template-columns

repeat

minmax

.items-start

align-items

flex-start

.items-center

align-items

center

.justify-between

justify-content

space-between

.gap-x-2

column-gap

0.5

rem

.gap-x-4

column-gap

rem

.gap-x-6

column-gap

1.5

rem

.gap-y-8

row-gap

rem

.divide-y

:not

hidden

:not

hidden

border

border-style

solid

border-top-width

border-bottom-width

.divide-y

div

.deal-details-inner

:last-of-type

border-bottom-width

.divide-gray-100

:not

hidden

:not

hidden

border-color

rgb

.overflow-hidden

overflow

hidden

.rounded-lg

border-radius

0.5

rem

.rounded-md

border-radius

0.375

rem

.rounded-xl

border-radius

0.75

rem

.border

border-width

.border-b

border-bottom-width

.border-gray-200

border-color

rgb

.border-gray-900

\/5

border-color

rgb

0.05

.bg-gray-50

background-color

rgb

.bg-red-50

background-color

rgb

.bg-white

background-color

rgb

.object-cover

object-fit

cover

.p-6

padding

1.5

rem

.px-2

padding-left

0.5

rem

padding-right

0.5

rem

.px-6

padding-left

1.5

rem

padding-right

1.5

rem

.py-1

padding-top

0.25

rem

padding-bottom

0.25

rem

.py-3

padding-top

0.75

rem

padding-bottom

0.75

rem

.py-4

padding-top

rem

padding-bottom

rem

.text-sm

font-size

0.875

rem

line-height

1.25

rem

.text-xs

font-size

0.75

rem

line-height

rem

.font-medium

font-weight

.leading-6

line-height

1.5

rem

.text-gray-500

color

rgb

.text-gray-700

color

rgb

.text-gray-900

color

rgb

.text-red-700

color

rgb

.px-1

padding-left

0.25

rem

padding-right

0.25

rem

.pl-1

padding-left

0.25

rem

.pr-1

padding-right

0.25

rem

.px-2

padding-left

0.50

rem

padding-right

0.50

rem

.pl-2

padding-left

0.50

rem

.pr-2

padding-right

0.50

rem

.text-sky-700

color

rgb

.ring-sky-600

\/10

border

solid

rgb

0.1

.bg-sky-50

background-color

rgb

.ml-2

margin-left

0.5

rem

.bg-green-50

background-color

rgb

.text-green-700

color

rgb

.ring-green-600

\/10

border

solid

rgb

0.1

style

class

deals-container

{{#result}}

class

deal-container

div

class

deal-header

img

src

https://{{omni_dbt__product_images.image.value_static}}?size=512

class

deal-logo

section

class

deal-name flex flex-col

style

justify-content

start

div

class

flex flex-row

style

align-items

center

{{omni_dbt__products.name.value}}

div

div

section

div

class

-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6

div

class

deal-details-inner

style

border-bottom

none

class

text-gray-500

Revenue

class

flex items-start gap-x-2

section

class

rounded-md ml-2 font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/10

style

padding

{{omni_dbt__order_items.total_sale_price.value}}

section

div

div

class

deal-details-inner

class

text-gray-500

Brand

class

flex items-start gap-x-2

div

class

font-medium text-gray-900

{{omni_dbt__products.brand.value}}

div

div

div

class

deal-details-inner

class

text-gray-500

Category

class

flex items-start gap-x-2

div

class

font-medium text-gray-900

{{omni_dbt__products.category.value}}

div

div

div

class

deal-details-inner

class

text-gray-500

Total Items Sold

class

flex items-start gap-x-2

div

class

font-medium text-gray-900

{{omni_dbt__order_items.count.value}}

div

div

div

class

deal-details-inner

class

text-gray-500

Retail Price

class

flex items-start gap-x-2

div

class

font-medium text-gray-900

{{omni_dbt__products.retail_price.value}}

div

div

div

{{/result}}

Example dataset

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-grid](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-grid) on 2025-07-23.*
