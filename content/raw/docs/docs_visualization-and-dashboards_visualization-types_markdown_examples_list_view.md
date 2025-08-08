# Card List Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/list_view](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/list_view)  
**Extracted:** 2025-07-23 21:45:14  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to card list view:

Example query

Example code

style

.contact-entry

display

flex

align-items

flex-start

background

#f9f9f9

padding

margin-bottom

border-radius

gap

.contact-avatar

width

height

border-radius

object-fit

cover

flex-shrink

.contact-info

display

block

font-size

margin-bottom

.contact-info

.line

font-size

color

#333

margin-bottom

.contact-info

font-size

color

#007AFF

word-break

break-word

text-decoration

none

style

{{#result}}

div

class

contact-entry

img

class

contact-avatar

src

https://ui-avatars.com/api/?name={{people.full_name.value_static}}&background=random

alt

Avatar

div

class

contact-info

{{people.full_name.value}}

div

class

line

{{people.title.value_static}} - {{people.practice_group.value_static}}

div

div

class

line

href

mailto:{{people.email.value_static}}

{{people.email.value_static}}

div

div

class

line

href

tel:{{people.office_phone_number.value_static}}

{{people.office_phone_number.value_static}}

div

div

div

{{/result}}

Example query

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/list_view](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/list_view) on 2025-07-23.*
