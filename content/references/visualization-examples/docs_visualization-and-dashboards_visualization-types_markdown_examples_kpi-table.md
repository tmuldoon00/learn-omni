# KPI table Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-table](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-table)  
**Extracted:** 2025-07-23 21:45:13  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a table of KPIs. In this example, each column is specific to a different source (ex:

email

Example code

table

thead

Display

Email

Facebook

Organic

thead

tbody

**{{result.0.Display.users.count.value}} Users**

ChangeArrow

current

{{result.0.Display.users.count.value_static}}

comparison

{{result.1.Display.users.count.value_static}}

ChangeArrow

(last month {{result.1.Display.users.count.value}})

**{{result.0.Email.users.count.value}} Users**

ChangeArrow

current

{{result.0.Email.users.count.value_static}}

comparison

{{result.1.Email.users.count.value_static}}

ChangeArrow

(last month {{result.1.Email.users.count.value_static}})

**{{result.0.Facebook.users.count.value}} Users**

ChangeArrow

current

{{result.0.Facebook.users.count.value_static}}

comparison

{{result.1.Facebook.users.count.value_static}}

ChangeArrow

(last month {{result.1.Facebook.users.count.value_static}})

**{{result.0.Organic.users.count.value}} Users**

ChangeArrow

current

{{result.0.Organic.users.count.value_static}}

comparison

{{result.1.Organic.users.count.value_static}}

ChangeArrow

(last month {{result.1.Organic.users.count.value}})

**{{result.0.Search.users.count.value}} Users**

ChangeArrow

current

{{result.0.Search.users.count.value_static}}

comparison

{{result.1.Search.users.count.value_static}}

changearrow

(last month {{result.1.Search.users.count.value}})

Sparkline

field

Display.users.count

color

cornflowerblue

reverse

true

height

80%

Sparkline

Sparkline

field

Email.users.count

color

MediumSeaGreen

reverse

true

height

80%

Sparkline

field

Facebook.users.count

color

gold

reverse

true

height

80%

Sparkline

field

Organic.users.count

color

darkorange

reverse

true

height

80%

Sparkline

field

Search.users.count

color

crimson

reverse

true

height

80%

tbody

table

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-table](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/kpi-table) on 2025-07-23.*
