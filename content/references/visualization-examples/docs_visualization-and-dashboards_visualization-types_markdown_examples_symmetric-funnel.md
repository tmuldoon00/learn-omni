# Symmetric funnel Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/symmetric-funnel](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/symmetric-funnel)  
**Extracted:** 2025-07-23 21:45:18  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a funnel with multiple sequential steps.

Setup

This visualization is built on having multiple measures which are then swapped rows and columns, with a calculation built to get stage by stage conversion metrics. For example, in cell

, enter the formula

=B2/B1

Example code

style

.parentView

display

flex

flex-direction

column

align-items

center

.trapezoid

background

#ff6666

width

display

flex

justify-content

center

clip-path

polygon

.trapezoid2

background

#ee6021

width

display

flex

justify-content

center

clip-path

polygon

.trapezoid3

background

#f6c62d

width

display

flex

justify-content

center

clip-path

polygon

.trapezoid4

background

#9de24f

width

display

flex

justify-content

center

clip-path

polygon

.text

color

white

display

flex

line-height

1.5

font-size

.conv

font-size

line-height

font-weight

bold

style

div

class

parentView

div

class

trapezoid

class

text

{{result.0.measure_value.value}} Stage 1

div

div

class

conv

↓ {{result.1.calc_1.value}}

div

div

class

trapezoid2

class

text

{{result.1.measure_value.value}} Stage 2

div

div

class

conv

↓ {{result.2.calc_1.value}}

div

div

class

trapezoid3

class

text

{{result.2.measure_value.value}} Stage 3

div

div

class

conv

↓ {{result.3.calc_1.value}}

div

div

class

trapezoid4

class

text

{{result.3.measure_value.value}} Stage 4

div

Setup

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/symmetric-funnel](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/symmetric-funnel) on 2025-07-23.*
