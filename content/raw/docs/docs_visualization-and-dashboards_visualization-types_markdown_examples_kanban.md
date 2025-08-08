# Kanban Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kanban](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kanban)  
**Extracted:** 2025-07-23 21:45:12  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a Kanban-style project board. In this example, each card on the board represents a company in the dataset.

Example query

Example dataset

Example code

style

/* Base styling */

body

font-family

'Inter'

sans-serif

margin

padding

background-color

#F4F5F7

/* Kanban table styling */

.kanban-table

width

border-collapse

separate

border-spacing

margin-bottom

.kanban-table

background-color

#F4F5F7

color

#5D5FEF

font-size

padding

text-align

center

border-bottom

solid

#5D5FEF

border-radius

.kanban-table

padding

vertical-align

top

background-color

#FAFAFA

border-radius

/* Card styling */

.kanban-card

background-color

white

border-radius

border-left

solid

#5D5FEF

box-shadow

rgba

0.08

padding

margin-bottom

position

relative

.card-title

font-weight

bold

font-size

margin-bottom

color

#2C2F77

padding-right

/* Make room for the image */

.card-description

font-size

color

#333

margin-bottom

.card-metrics

display

flex

justify-content

space-between

font-size

color

#666

border-top

solid

#eee

padding-top

.card-image

position

absolute

top

right

width

height

border-radius

box-shadow

rgba

0.1

/* Tag styling */

.tag

display

inline-block

background-color

#5D5FEF25

color

#2C2F77

font-size

padding

border-radius

margin-right

margin-bottom

/* Priority indicators */

.priority-one

border-left-color

#ff4d4d

.priority-two

border-left-color

#ffb84d

.priority-three

border-left-color

#4da6ff

style

<!-- <h1 style="color: #191970; text-align: center;">Project Kanban Board</h1> -->

table

class

kanban-table

thead

Sales Ready

Trial

Closed Won

thead

tbody

{{#result}}

{{#Sales Ready.opptys.opportunity_name_list.value}}

<!-- Static examples representing how the template would render -->

div

class

kanban-card priority-high

div

class

card-title

{{Sales Ready.opptys.opportunity_name_list.value}}

div

div

class

card-description

{{Sales Ready.opptys.arr_sum.value}}

div

div

span

class

tag

{{Sales Ready.opptys.type_list.value}}

span

div

div

class

card-metrics

span

Owner: {{Sales Ready.opptys.account_owner_list.value}}

span

span

Close Date: {{Sales Ready.opptys.close_date_date_max.value_static}}

span

div

img

class

card-image

src

{{Sales Ready.opptys.logo_list.value_static}}

alt

Company logo

div

{{/Sales Ready.opptys.opportunity_name_list.value}}

{{/result}}

{{#result}}

{{#Trial.opptys.opportunity_name_list.value}}

<!-- Static examples representing how the template would render -->

div

class

kanban-card priority-high

div

class

card-title

{{Trial.opptys.opportunity_name_list.value}}

div

div

class

card-description

{{Trial.opptys.arr_sum.value}}

div

div

span

class

tag

{{Trial.opptys.type_list.value}}

span

div

div

class

card-metrics

span

Owner: {{Trial.opptys.account_owner_list.value}}

span

span

Close Date: {{Trial.opptys.close_date_date_max.value_static}}

span

div

img

class

card-image

src

{{Trial.opptys.logo_list.value_static}}

alt

Company logo

div

{{/Trial.opptys.opportunity_name_list.value}}

{{/result}}

{{#result}}

{{#Closed Won.opptys.opportunity_name_list.value}}

<!-- Static examples representing how the template would render -->

div

class

kanban-card priority-high

div

class

card-title

{{Closed Won.opptys.opportunity_name_list.value}}

div

div

class

card-description

{{Closed Won.opptys.arr_sum.value}}

div

div

span

class

tag

{{Closed Won.opptys.type_list.value}}

span

div

div

class

card-metrics

span

Owner: {{Closed Won.opptys.account_owner_list.value}}

span

span

Close Date: {{Closed Won.opptys.close_date_date_max.value_static}}

span

div

img

class

card-image

src

{{Closed Won.opptys.logo_list.value_static}}

alt

Company logo

div

{{/Closed Won.opptys.opportunity_name_list.value}}

{{/result}}

tbody

table

Example query

Example dataset

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kanban](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kanban) on 2025-07-23.*
