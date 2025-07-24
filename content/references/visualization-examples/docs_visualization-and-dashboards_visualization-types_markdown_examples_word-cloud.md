# Word cloud Markdown visualization

**Source URL:** [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/word-cloud](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/word-cloud)  
**Extracted:** 2025-07-23 21:45:20  
**Source:** Omni Analytics Documentation

---

On this page

The code for this example can be used in the

Markdown visualization

to create word cloud. In this example, text is horizontal and loosely spaced.

The presentation is more "festival poster lineup" when sorted by the sizing value, and more "cloudy" when sorted by a different value.

Sorted by sizing value

Sorted by a different value

Example code

Fonts are clamped between

--min-font-size

and

--max-font-size

. If you use container query units (cqw) for the max font size, the type will adjust to the width of the dashboard tile. Note that the max font size is a bit of a "magic number" meaning you'll have to adjust it based on the length of the words in your data set, the number of words in the results, and the desired size of the tile. The values in the example below were selected for this particular data set.

Example query showing calculation for percentage sizing and an example calculation for determining text color:

style

.sky

--min-font-size

/* smallest text size */

--max-font-size

cqw

/* biggest text sizes based on tile width */

container-type

size

container-name

sky

height

display

flex

flex-direction

column

justify-content

center

.clouds

text-align

center

display

flex

gap

flex-direction

row

align-items

center

justify-content

center

flex-wrap

wrap

font-size

var

--max-font-size

.cloud

display

inline-block

padding-inline

0.25

padding-block

margin

vertical-align

center

white-space

nowrap

.cloud

.yes

color

darkmagenta

.cloud

.no

color

magenta

style

article

class

sky

div

class

clouds

{{#result}}

class

cloud {{calc_2.value_static}}

style

font-size: clamp

var

--min-font-size

calc

1em *

calc_3.value_static

line-height

{{users.state.value}}

{{/result}}

div

article

Example code

---

*This content was automatically extracted from [https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/word-cloud](https://docs.omni.co/docs/visualization-and-dashboards/visualization-types/markdown/examples/word-cloud) on 2025-07-23.*
