# KPI with sparkline Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-with-sparkline](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-with-sparkline)  
**Extracted:** 2025-07-23 21:45:13  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a KPI-style visualization with a sparkline and change arrow.

Example code

div

style

display

flex

align-items

center

justify-content

center

flex-direction

column

div

style

display

flex

align-items

center

flex-direction

column

###**{{result._first.users.count.value}}** Users this Month

style

font-size

var

--font-sm

ChangeArrow

current

{{result.0.users.count.value_static}}

comparison

{{result.1.users.count.value_static}}

ChangeArrow

last month from {{result.1.users.count.value}}

div

Sparkline

field

users.count

color

#4889DE

height

50%

width

70%

reverse

true

Sparkline

div

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-with-sparkline](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-with-sparkline) on 2025-07-23.*
