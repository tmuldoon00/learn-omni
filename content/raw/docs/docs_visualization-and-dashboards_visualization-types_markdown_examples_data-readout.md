# Data readout Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/data-readout](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/data-readout)  
**Extracted:** 2025-07-23 21:45:08  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a sparkline visualization with a description. The description uses

Mustache syntax

to reference values in the results set.

Example code

In the past 12 months, Acme Corp has had **{{result._totals._first.order_items.order_count.value}}** orders made by **{{result._totals._first.users.count.value}}** users, resulting in **{{result._totals._first.order_items.sale_price_sum.value}}** total revenue.

Sparkline

field

order_items.order_count

color

#ED6C91

height

70%

width

100%

reverse

true

Sparkline

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/data-readout](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/data-readout) on 2025-07-23.*
