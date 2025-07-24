# Card with criteria checklist Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-criteria-checklist](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-criteria-checklist)  
**Extracted:** 2025-07-23 21:45:04  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create a card with a list of criteria:

Example query

Example code

style

/* Base styling */

body

font-family

Inter

sans-serif

margin

padding

background-color

#f5f5f5

/* Report card table styling */

.report-card-table

width

border-collapse

separate

border-spacing

margin-bottom

/* Opportunity row styling */

.opportunity-row

background-color

white

box-shadow

rgba

0.1

.opportunity-row

padding

/* Remove default padding */

.opportunity-row

:first-child

border-top-left-radius

border-bottom-left-radius

border-left

solid

#191970

.opportunity-row

:last-child

border-top-right-radius

border-bottom-right-radius

/* Priority indicators */

.high-priority

:first-child

border-left-color

#907EFE

.medium-priority

:first-child

border-left-color

#3943B7

.low-priority

:first-child

border-left-color

#57A773

/* Company info column styling */

.company-info

width

padding

vertical-align

top

.company-header

display

flex

align-items

center

margin-bottom

.company-title

font-weight

bold

font-size

color

#191970

margin-right

.company-logo

width

height

border-radius

box-shadow

rgba

0.1

background-color

#f0f0f0

display

flex

justify-content

center

align-items

center

color

#999

font-size

margin-left

auto

.company-logo

img

width

height

object-fit

cover

border-radius

.company-meta

margin-bottom

display

grid

grid-template-columns

repeat

gap

.meta-item

font-size

color

#555

background-color

#f8f8f8

padding

border-radius

.meta-value

display

block

font-weight

bold

color

#333

font-size

margin-top

.company-tags

display

flex

flex-wrap

wrap

gap

margin-bottom

.tag

display

inline-block

background-color

#E6E6FA

color

#191970

font-size

padding

border-radius

font-weight

/* Assessment column styling */

.assessment-info

width

padding

vertical-align

top

.criteria-section

background-color

#f9f9f9

border-radius

padding

height

.criteria-table-container

display

grid

grid-template-columns

gap

margin-top

.criteria-column

width

.criteria-header

font-weight

bold

font-size

color

#191970

margin-bottom

display

flex

justify-content

space-between

align-items

center

.criteria-score

background-color

#191970

color

white

border-radius

width

height

display

flex

justify-content

center

align-items

center

font-size

font-weight

bold

.criteria-table

width

border-collapse

collapse

margin-top

.criteria-table

text-align

left

padding

font-size

font-weight

color

#444

border-bottom

solid

#e0e0e0

.criteria-table

padding

border-bottom

solid

#e8e8e8

vertical-align

middle

.criteria-table

:last-child

border-bottom

none

.status-indicator

display

inline-block

width

height

border-radius

position

relative

.status-true

background-color

#57A773

.status-true

:after

content

"✓"

color

white

position

absolute

font-size

font-weight

bold

top

left

transform

translate

-50

-50

.status-false

background-color

#E63946

.status-false

:after

content

"✗"

color

white

position

absolute

font-size

font-weight

bold

top

left

transform

translate

-50

-50

.criteria-label

font-size

color

#333

font-weight

/* Footer styling */

.company-footer

font-size

color

#666

border-top

solid

#eee

padding-top

margin-top

display

flex

flex-wrap

wrap

gap

justify-content

space-between

.company-footer

span

word-wrap

break-word

overflow-wrap

break-word

white-space

normal

justify-content

space-between

/* Tooltip styling */

.tooltip-container

position

relative

display

inline-flex

align-items

center

.tooltip-icon

display

inline-flex

justify-content

center

align-items

center

width

height

background-color

#ccc

color

white

border-radius

font-size

font-weight

bold

margin-left

cursor

help

.tooltip-content

visibility

hidden

position

absolute

z-index

bottom

left

transform

translateX

-50

width

background-color

#333

color

white

text-align

left

border-radius

padding

font-size

font-weight

normal

opacity

transition

opacity

0.3

box-shadow

rgba

0.2

line-height

1.4

word-wrap

break-word

white-space

normal

.tooltip-content

::after

content

position

absolute

top

left

margin-left

border-width

border-style

solid

border-color

#333

transparent

transparent

transparent

.tooltip-container

:hover

.tooltip-content

visibility

visible

opacity

style

table

class

report-card-table

tbody

{{#result}}

class

opportunity-row {{priorityClass}}

class

company-info

div

class

company-header

div

class

company-title

{{opptys.opportunity_name.value_static}}

div

div

class

company-logo

img

src

{{opptys.logo.value_static}}

alt

N/A

div

div

div

class

company-meta

div

class

meta-item

ARR

span

class

meta-value

{{opptys.arr.value_static}}

span

div

div

class

meta-item

Current Stage

span

class

meta-value

{{opptys.stage_name.value_static}}

span

div

div

class

meta-item

Close Date

span

class

meta-value

{{opptys.close_date.value_static}}

span

div

<!-- <div class="meta-item">Priority <span class="meta-value">{{priority}}</span></div> -->

div

div

class

company-tags

span

class

tag

{{opptys.type.value_static}}

span

<!-- <span class="tag">{{opportunities.product.value}}</span>

<span class="tag">{{opportunities.opportunity_type.value}}</span> -->

div

div

class

company-footer

span

Qualified At: {{opptys.qualified_at.value_static}}

span

div

div

class

company-footer

span

Next Steps: {{opptys.next_steps.value_static}}

span

div

div

class

company-footer

div

class

assessment-info

div

class

criteria-section

div

class

criteria-header

span

Assessment Criteria

span

span

class

criteria-score

{{opptys.score.value_static}}/10

span

div

table

class

criteria-table

thead

width

Status

Criteria

width

Status

Criteria

thead

tbody

span

class

status-indicator status-{{opptys.next_steps_populated.value_static}}

span

class

criteria-label

div

class

tooltip-container

Next Steps Populated

span

class

tooltip-icon

span

span

class

tooltip-content

Have next steps been set?

span

div

span

class

status-indicator  status-{{opptys.roadmap_call_scheduled.value_static}}

span

class

criteria-label

Roadmap Call Scheduled

span

class

status-indicator status-{{opptys.exec_sponsor_introduced.value_static}}

span

class

criteria-label

Exec Sponsor Introduced

span

class

status-indicator  status-{{opptys.poc_scoped.value_static}}

span

class

criteria-label

POC Scoped

span

class

status-indicator status-{{opptys.realistic_close_date_based_on_stage.value_static}}

span

class

criteria-label

div

class

tooltip-container

Realistic Close Date Based On Stage

span

class

tooltip-icon

span

span

class

tooltip-content

This flags if the opportunity is in "Qualifying" with a close date within 14 days, in "Scoping" with a close date within 7 days, or in "Evaluating" with a close date within 3 days

span

div

span

class

status-indicator status-{{opptys.economic_buyer_identified.value_static}}

span

class

criteria-label

div

class

tooltip-container

Economic Buyer Identified

span

class

tooltip-icon

span

span

class

tooltip-content

Have we identified who will be making the final buying decision?

span

div

span

class

status-indicator status-{{opptys.decision_criteria_identified.value_static}}

span

class

criteria-label

Decision Criteria Set

span

class

status-indicator status-{{opptys.pain_identified.value_static}}

span

class

criteria-label

Pain Identified

span

class

status-indicator status-{{opptys.champion_identified.value_static}}

span

class

criteria-label

Champion Identified

span

class

status-indicator status-{{opptys.security_sign_off.value_static}}

span

class

criteria-label

div

class

tooltip-container

Security Sign Off

span

class

tooltip-icon

span

span

class

tooltip-content

Have we completed the security signoff process?

span

div

tbody

table

div

{{/result}}

tbody

table

Example query

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-criteria-checklist](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/card-criteria-checklist) on 2025-07-23.*
